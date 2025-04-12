import React from 'react';
import '../styles/header.css';
import mcqpage from '../pages/mcqpage';
import pdfpage from '../pages/pdfpage';
import clipart from '../images/clipart.png';
import { Link} from 'react-router-dom';


const Header = () => {
    return (
        <div className='header-div'>
            <div className = "enclosure">
            <div className='content-1'>
                <h2 className='heading'>
                    Hey there!
                    <br></br>
                    Welcome to EduPDF!
                </h2>
                <p className='introduction'>
                EduPDF is an innovative web application designed 
                to streamline the learning and assessment process 
                by combining two powerful tools:
                <b> MCQ Generation</b> and <b>PDF Processing</b>.
                This tool is designed to cater to students, 
                educators, and professionals who want to enhance 
                their educational experience.
                </p>
            </div>

            <div className ='image'>
                <img className = 'clipart' src = {clipart}></img>
            </div>
            </div>

                <div className='content-2'>
                    <h3 className='mcq-heading'>
                    <Link className ="link" to = "/mcqpage"> MCQ Generator</Link>
                    </h3>
                    <p className='mcq'>
                    EduPDF’s MCQ Generation feature allows users to 
                    generate multiple-choice questions (MCQs) either 
                    for a specific topic or directly from an uploaded 
                    PDF document. By analyzing the provided content, 
                    it automatically identifies key concepts and 
                    transforms them into relevant MCQs. The MCQs 
                    generated can be customized in terms of difficulty 
                    level making it a versatile solution for various subjects.
                    </p>
                    <br>
                    </br>
                </div>

                <div className='content-3'>
                    <h3 className='pdf-heading'>
                    <Link className ="link" to = "/Pdfpage">PDF Processor</Link>
                    </h3>
                    <p className='pdf'>
                    EduPDF's PDF Processing tool helps you answer 
                    questions directly from PDF documents. 
                    Whether you're working with textbooks, 
                    lecture notes, research papers, or any 
                    other educational content in PDF 
                    format, EduPDF enables you to interact 
                    with the document and extract key information 
                    to answer specific queries. 
                    </p>
                    <br>
                    </br>

                </div>
            </div>
    );
};

export default Header;