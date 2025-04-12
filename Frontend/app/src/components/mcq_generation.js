import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/mcq_generation.css';

const Mcq_generation = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [numQuestions, setNumQuestions] = useState(5);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setMcqs([]); // Clear previous MCQs on switch
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const processMCQs = () => {
    const questions = [];
    const options = [];
    const answers = [];

    let currentQuestion = "";
    let currentOptions = [];

    mcqs.forEach((item) => {
      if (item.startsWith("Question")) {
        if (currentQuestion) {
          questions.push(currentQuestion);
          options.push(currentOptions);
          currentOptions = [];
        }
        currentQuestion = item.replace(/\*\*/g, "").trim();
      } else if (/^[A-D]\./.test(item)) {
        currentOptions.push(item.trim());
      } else if (item.startsWith("Answer:")) {
        answers.push(item.split(":")[1].trim());
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
      options.push(currentOptions);
    }

    return { questions, options, answers };
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMcqs([]); // Clear previous output immediately

    let data = {};

    if (selectedOption === "file") {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post('http://localhost:5000/extract-text', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        data.text = response.data.text;
      } catch (error) {
        console.error("Error uploading file", error);
        setLoading(false);
        return;
      }
    } else if (selectedOption === "topic") {
      data.text = text;
    }

    try {
      const response = await axios.post('http://localhost:5000/generate-mcqs', {
        text: data.text,
        difficulty: difficulty,
        num_questions: parseInt(numQuestions),
      });

      if (Array.isArray(response.data.mcqs)) {
        setMcqs(response.data.mcqs);
      } else {
        console.error("Unexpected MCQs format:", response.data.mcqs);
      }
    } catch (error) {
      console.error("Error generating MCQs", error);
    }

    setLoading(false);
  };

  const { questions, options, answers } = processMCQs();

  return (
    <div className="mcq-page">
      <h1 className="mcq-heading">MCQ Generator</h1>
      <div className="content-mcq">
        <div className="inputs">
          <label>
            <input
              type="radio"
              className="Radio1"
              name="option"
              value="file"
              checked={selectedOption === "file"}
              onChange={handleOptionChange}
            />
            Upload a File
          </label>

          <label>
            <input
              type="radio"
              className="Radio2"
              name="option"
              value="topic"
              checked={selectedOption === "topic"}
              onChange={handleOptionChange}
            />
            Input a Topic
          </label>
        </div>

        {selectedOption === "file" && (
          <div className="file-upload">
            <label>
              Upload the PDF file
              <input type="file" className="input-file" onChange={handleFileChange} />
            </label>
            <label>
              Difficulty
              <select className="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>
            </label>
            <label>
              Number of questions
              <input
                type="number"
                className="No-of-questions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
              />
            </label>
            <button
              onClick={handleSubmit}
              className="submit-file"
              disabled={loading || !file}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}

        {selectedOption === "topic" && (
          <div className="topic-name">
            <label>
              Enter the topic
              <input type="text" className="input-topic" value={text} onChange={handleTextChange} />
            </label>
            <label>
              Difficulty
              <select className="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>
            </label>
            <label>
              Number of questions
              <input
                type="number"
                className="No-of-questions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
              />
            </label>
            <button
              onClick={handleSubmit}
              className="submit-topic"
              disabled={loading || text.trim() === ""}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}

        {questions.length > 0 && !loading && (
          <div className="mcqs-output">
            <h2>Generated MCQs:</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index} className="question-item">
                  <div className="question-text">
                    <strong>{question}</strong>
                  </div>
                  <div className="options">
                    {options[index]?.map((option, idx) => {
                      const isCorrect = answers[index]?.toLowerCase() === String.fromCharCode(65 + idx).toLowerCase();
                      return (
                        <div key={idx} className={`option ${isCorrect ? 'correct' : ''}`}>
                          {option}
                        </div>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mcq_generation;
