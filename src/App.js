import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoneLecturePage from './pages/doneLecturePage';
import UploadPdfPage from './pages/uploadPdfPage';
import SignupPage1 from './pages/signupPage1';
import SignupPage2 from './pages/signupPage2';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signupPage1" element={<SignupPage1 />} />
          <Route path="/uploadpdf" element={<UploadPdfPage />} />
          <Route path="/donelecture" element={<DoneLecturePage />} />
          <Route path="/signupPage2" element={<SignupPage2 />} />
          <Route path="/loginPage" element={<LoginPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;