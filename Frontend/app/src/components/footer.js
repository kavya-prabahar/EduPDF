import React from 'react';
import imagesrc1 from '../images/download.png';
import imagesrc2 from '../images/instagram.png';
import imagesrc3 from '../images/linkedin.png';
import imagesrc4 from '../images/twitter.png';
import Homepage from '../pages/homepage';
import Mcqpage from '../pages/mcqpage';
import Pdfpage from '../pages/pdfpage';
import '../styles/footer.css'


const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section logo">
                    <h2>EduPDF</h2>
                    <br></br>
                    <p><i>Instantly Generate MCQs & Get Answers from Your PDFs! </i></p>
                </div>
                <div className="footer-section quick-links">
                    <h3 className='quick-links'>Quick Links</h3>
                    <br></br>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Mcqpage">MCQ Generator</a></li>
                        <li><a href="/Pdfpage">PDF Processor</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3 className='contact-us-heading'>Contact Us</h3>
                    <br>
                    </br>
                    <p className='p-footer'>Email: <a href="mailto:inventrack01@gmail.com">edupdf@gmail.com</a></p>
                    <p className='p-footer'>Phone: +91 1234567905</p>
                    <p className='p-footer'>Address: Coimbatore, Tamil Nadu</p>
                </div>
                <div className="footer-section social">
                    <h3  className='follow-us-heading'>Follow Us</h3>
                    <br>
                     </br>
                    <div className="social-icons">
                        <a href="#" className="facebook-icon"><img className='img-footer' src={imagesrc1} alt="Facebook" /></a>
                        <a href="#" className="twitter-icon"><img className='img-footer' src={imagesrc4} alt="Twitter" /></a>
                        <a href="#" className="instagram-icon"><img className='img-footer' src={imagesrc2} alt="Instagram" /></a>
                        <a href="#" className="linkedin-icon"><img className='img-footer' src={imagesrc3} alt="LinkedIn" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
