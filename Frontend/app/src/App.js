import logo from './logo.svg';
import Homepage from './pages/homepage';
import Navbar from './components/navbar';
import Mcqpage from './pages/mcqpage';
import Pdfpage from './pages/pdfpage';
import Footer from './components/footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Homepage/>} />
          <Route path="/Mcqpage" element={<Mcqpage />} />
          <Route path = "/Pdfpage" element={<Pdfpage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
