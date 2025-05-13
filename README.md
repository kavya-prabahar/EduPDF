# EduPDF - MCQ Generator and PDF Processor

EduPDF is a full-stack web application that allows users to generate multiple-choice questions (MCQs) and get answers instantly from PDF content or specified topics. It combines a React frontend and a Flask backend, leveraging APIs for question generation and PDF Q&A. The app utilizes FAISS indexing and `all-MiniLM-L6-v2` for embedding creation, offering a seamless experience for generating and answering MCQs.

---

##  Getting Started

Follow these instructions to set up and run the project locally.

---

### 1️. Start the Backend

1. Open a terminal and navigate to the backend directory:

```bash
cd Backend
```

2. Install the dependencies

```bash
pip install -r requirements.txt
```

3. Run the backend server:

```bash
python app.py
```
---

### 2️. Start the Frontend

1. Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend/app
```

2. Start the React app:

```bash
npm install  # Run only once to install dependencies
npm start
```

---

###  API Keys

Add your API keys (if any) in a `.env` file.

You can place the `.env` file in any of the following locations:
- Inside the `MCQ_Generator` folder
- Inside the `PDF_Processor` folder
- Inside the root `Backend` folder

Format of `.env` file:

```env
API_KEY=your_api_key_here
```

Make sure to **not** commit the `.env` file to GitHub if it contains sensitive information.


## 📌 Notes

- React runs on `http://localhost:3000`
- Flask backend runs on `http://localhost:5000`
- Ensure CORS is handled correctly if you're connecting frontend and backend

