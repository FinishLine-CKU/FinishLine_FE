import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DonLecturePage from './pages/doneLecturePage';
import UploadPdfPage from './pages/uploadPdfPage';
import SignupPage1 from './pages/signupPage1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signupPage1" element={<SignupPage1 />} />
          <Route path="/uploadpdf" element={<UploadPdfPage />} />
          <Route path="/donelecture" element={<DonLecturePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
