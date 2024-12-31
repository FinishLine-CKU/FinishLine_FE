import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DonLecturePage from './pages/doneLecturePage';
import UploadPdfPage from './pages/uploadPdfPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/uploadpdf" element={<UploadPdfPage />} />
          <Route path="/donelecture" element={<DonLecturePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
