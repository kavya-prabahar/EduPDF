from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
import os

def pdf_loader(file):
    os.makedirs("uploaded_files", exist_ok=True)  
    file_path = os.path.join("uploaded_files", file.name)
    with open(file_path, "wb") as f:
        f.write(file.getvalue())
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    return documents

def split_text_into_chunks(documents, chunk_size = 1000, separator = "\n"):
    text_splitter = CharacterTextSplitter(chunk_size = chunk_size, separator=separator)
    text_chunks = []
    for document in documents:
        text_chunks.extend(text_splitter.split_text(document.page_content))
    return text_chunks
