import React, { useState } from 'react';
import '../styles/pdf_processor.css';

const PdfProcessor = () => {
    const [file, setFile] = useState(null); // To store the selected PDF file
    const [query, setQuery] = useState(''); // To store the query input
    const [answer, setAnswer] = useState(''); // To store the answer from the backend
    const [loading, setLoading] = useState(false); // To show loading state

    // Handle PDF file upload
    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    // Handle query input
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle form submission (upload and query)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !query) {
            alert("Please upload a PDF and enter a query.");
            return;
        }

        setLoading(true); // Set loading to true when request is in progress

        // Step 1: Upload PDF to the backend
        const formData = new FormData();
        formData.append("file", file);

        try {
            const uploadResponse = await fetch('http://localhost:5000/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload PDF');
            }

            // Step 2: Send query to the backend to get the answer
            const queryResponse = await fetch('http://localhost:5000/query-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!queryResponse.ok) {
                throw new Error('Failed to get an answer');
            }

            const data = await queryResponse.json();
            setAnswer(data.answer || 'No answer found.');
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='pdf-page'>
            <h1 className='pdf-heading'>PDF Processor</h1>
            <div className='content-pdf'>
                <div className='pdf-upload'>
                    <label>
                        Upload the PDF file
                        <input 
                            type='file' 
                            className='pdf-file' 
                            onChange={handleFileChange}
                        />
                    </label>

                    <label>
                        Enter the query
                        <input 
                            type='text' 
                            className='text-box' 
                            value={query}
                            onChange={handleQueryChange}
                        />
                    </label>

                    <form onSubmit={handleSubmit}>
                    <button 
                        type="submit" 
                        className={`submit-pdf ${loading ? 'loading' : ''}`} 
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    </form>

                    {answer &&  !loading &&(
                        <div className="answer" style={{ textAlign: "justify" }}>
                            <h2>Answer:</h2>
                            <p>{answer}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PdfProcessor;
