import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContext } from './utils/hooks/loginContext';
import DoneLecturePage from './pages/doneLecturePage';
import UploadPdfPage from './pages/uploadPdfPage';
import SignupPage1 from './pages/signupPage1';
import SignupPage2 from './pages/signupPage2';
import LoginPage from './pages/loginPage';
import UserGuidePage from './pages/userGuidePage';
import IntroPage from './pages/introPage';

function App() {
  const [loginUserName, setLoginUserName] = useState('');

  return (
    <div className="App">
      <LoginContext.Provider value={{loginUserName, setLoginUserName}}>
        <BrowserRouter>
          <Routes>
            <Route path="/signupPage1" element={<SignupPage1 />} />
            <Route path="/uploadpdf" element={<UploadPdfPage />} />
            <Route path="/donelecture" element={<DoneLecturePage />} />
            <Route path="/signupPage2" element={<SignupPage2 />} />
            <Route path="/loginPage" element={<LoginPage />} /> 
            <Route path="/userGuidePage" element={<UserGuidePage />} />
            <Route path="/introPage" element={<IntroPage />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
