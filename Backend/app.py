from flask import Flask, request, jsonify
import logging
from flask_cors import CORS
from MCQ_Generator.pdf_processing import extract_text_from_file
from MCQ_Generator.mcq_generation import generate_mcq
from PDF_Processor.query_handler import generate_answer
from PDF_Processor.query_handler import get_context_from_results
from PDF_Processor.pdf_processor import pdf_loader, split_text_into_chunks
from PDF_Processor.faiss_index import create_faiss_index, search_faiss_index

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

CORS(app)

faiss_db = None

def get_faiss_db():
    global faiss_db
    if faiss_db is None:
        raise Exception("FAISS index is not available")
    return faiss_db

@app.route('/generate-mcqs', methods=['OPTIONS'])
def handle_options():
    logging.debug("Handling OPTIONS request for /generate-mcqs")
    response = app.make_response('')
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    logging.debug("OPTIONS response headers set")
    return response

@app.route('/generate-mcqs', methods=['POST'])
def generate_mcqs():
    logging.debug("Received POST request for /generate-mcqs")
    try:
        # Get JSON data from the request
        data = request.get_json()
        logging.debug(f"Received data: {data}")
        
        text = data.get("text", "")
        difficulty = data.get("difficulty", "easy")
        num_questions = data.get("num_questions", 10)

        logging.debug(f"Text: {text}")
        logging.debug(f"Difficulty: {difficulty}")
        logging.debug(f"Number of questions: {num_questions}")

        # Generate MCQs
        mcqs = generate_mcq(text, difficulty, num_questions)
        logging.debug(f"Generated MCQs: {mcqs}")
        
        return jsonify({"mcqs": mcqs}), 200
    except Exception as e:
        logging.error(f"Error generating MCQs: {str(e)}")
        return jsonify({"error": str(e)}), 400


@app.route('/extract-text', methods=['POST'])
def extract_text():
    logging.debug("Received POST request for /extract-text")
    try:
        # Get file from the request
        file = request.files['file']
        logging.debug(f"Received file: {file.filename}")

        # Extract text from the file
        text = extract_text_from_file(file)
        logging.debug(f"Extracted text: {text[:100]}...")  # Logging first 100 characters for brevity

        return jsonify({"text": text}), 200
    except Exception as e:
        logging.error(f"Error extracting text: {str(e)}")
        return jsonify({"error": str(e)}), 400
    
@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    logging.debug("Received POST request for /upload-pdf")
    try:
        # Get the uploaded file
        file = request.files['file']
        logging.debug(f"Received file: {file.filename}")

        # Process PDF and extract text
        documents = pdf_loader(file)
        text_chunks = split_text_into_chunks(documents)
        
        # Create a FAISS index with the extracted text
        global faiss_db
        faiss_db = create_faiss_index(text_chunks)
        logging.debug("FAISS index created successfully")

        return jsonify({"message": "PDF processed and index created"}), 200
    except Exception as e:
        logging.error(f"Error uploading PDF: {str(e)}")
        return jsonify({"error": str(e)}), 400


@app.route('/query-pdf', methods=['POST'])
def query_pdf():
    logging.debug("Received POST request for /query-pdf")
    try:
        # Get query from the request
        data = request.get_json()
        query = data.get("query", "")
        logging.debug(f"Received query: {query}")
        
        # Perform search using FAISS
        faiss_db = get_faiss_db()
        results = search_faiss_index(faiss_db, query)
        logging.debug(f"FAISS search results: {results}")
        
        # Generate context from the search results
        context = get_context_from_results(results)
        logging.debug(f"Context generated: {context[:100]}...")  # Log first 100 characters of the context

        answer = generate_answer(context, query)
        logging.debug(f"Generated answer: {answer}")
        
        return jsonify({"answer": answer}), 200
    except Exception as e:
        logging.error(f"Error querying PDF: {str(e)}")
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    logging.debug("Starting Flask application")
    app.run(debug=True)
