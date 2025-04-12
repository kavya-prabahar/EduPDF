# mcq_generation.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

def generate_mcq(text, difficulty, num_questions):
    prompt = f"""
You are an expert MCQ generator. Your task is to generate {num_questions} multiple-choice questions based on the following content:

--- 
{text}
---

Each question should be:

- Relevant to the topic.
- At a '{difficulty}' difficulty level.
- Presented in the following **exact format**:

Question <number>: <question text>
A. <Option A>
B. <Option B>
C. <Option C>
D. <Option D>
Answer: <Correct Option Letter>

Example:
Question 1: What is the capital of France?
A. Berlin
B. Madrid
C. Paris
D. Rome

Question 2: What is the capital of India?
A. Tamil Nadu
B. New Delhi
C. Kolkata
D. Mumbai

Answer Key: 1. C) 2. B

Ensure:
- Only one correct answer per question.
- No explanations or extra information.
- Return only the MCQs in the format above.
"""


    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": prompt}]}]}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        
        try:
            mcq_text = data["candidates"][0]["content"]["parts"][0]["text"]
            mcqs = mcq_text.split("\n")  # Splitting into a list
            return [mcq.strip() for mcq in mcqs if mcq.strip()]  # Remove empty lines
        except (KeyError, IndexError):
            return ["No MCQs generated."]
    
    return [f"Error: {response.status_code} - {response.text}"]
