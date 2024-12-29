import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import DonLecture from './pages/doneLecturePage';
import UploadPdf from './pages/uploadPdfPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/uploadpdf" element={<UploadPdf />} />
          <Route path="/donelecture" element={<DonLecture />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
