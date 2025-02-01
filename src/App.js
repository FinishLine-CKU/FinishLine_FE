import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModalContext } from './utils/hooks/modalContext';
import DoneLecturePage from './pages/doneLecturePage';
import UploadPdfPage from './pages/uploadPdfPage';
import SignupPage1 from './pages/signupPage1';
import SignupPage2 from './pages/signupPage2';
import LoginPage from './pages/loginPage';
import UserGuidePage from './pages/userGuidePage';
import IntroPage from './pages/introPage';
import MyPage from './pages/myPage';
import ManageGraduPage from './pages/manageGraduPage';
import Modal from './components/modal'

function App() {
  const [modalState, setModalState] = useState(false);
  const [subButtonState, setSubButtonState] = useState(false);
  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalState(true);
};
  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setModalState(false);
};
  
  return (
    <ModalContext.Provider value={{modalState, setModalState, subButtonState, setSubButtonState, openModal, closeModal}}>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/modal" element={<Modal />} />
            <Route path="/signupPage1" element={<SignupPage1 />} />
            <Route path="/uploadpdf" element={<UploadPdfPage />} />
            <Route path="/donelecture" element={<DoneLecturePage />} />
            <Route path="/signupPage2" element={<SignupPage2 />} />
            <Route path="/loginPage" element={<LoginPage />} /> 
            <Route path="/userGuidePage" element={<UserGuidePage />} />
            <Route path="/introPage" element={<IntroPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/manageGraduPage" element={<ManageGraduPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
