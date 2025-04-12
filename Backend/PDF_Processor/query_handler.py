import requests
import os
import re
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'MCQ_Generator', '.env')
print("Looking for .env in:", dotenv_path)

load_dotenv(dotenv_path)

api_key = os.getenv("GEMINI_API_KEY")
print("✅ Loaded API key:", api_key)

def get_context_from_results(results):
    context = ""
    for result in results:
        context += result.page_content + "\n"
    return context

def strip_markdown(text):
    return re.sub(r"(\*\*|__|\*|_)", "", text)

def generate_answer(context, query):
    prompt = f"Context: {context}\n\nQuestion: {query}\n\nAnswer:"
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json()
            answer = data["candidates"][0]["content"]["parts"][0]["text"]
            clean_answer = strip_markdown(answer)
            return clean_answer.strip()
        except (KeyError, IndexError):
            return "No valid answer found in response."
    
    return f"Error: {response.status_code} - {response.text}"
