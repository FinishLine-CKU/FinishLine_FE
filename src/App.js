import { useState, useEffect } from 'react';
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
import GraduTestPage from './pages/graduTestPage';
import OneClickTestPage from './pages/oneClickTestPage';
import ChannelTalk from './utils/channelTalk';

function App() {
    const [modalState, setModalState] = useState(false);
    const [subButtonState, setSubButtonState] = useState(false);
    const [featModalState, setFeatModalState] = useState(false);
    const [featButtonState, setFeatButtonState] = useState(true);
    const [featCloseButton, setFeatCloseButton] = useState(true);
    const [detailModalState, setDetailModalState] = useState(false);
    const [addSubject, setAddSubject] = useState(0);    // 추가 Context 필요
    const openModal = () => {
        document.body.style.overflow = 'hidden';
        setModalState(true);
    };
    const closeModal = () => {
        document.body.style.overflow = 'auto';
        setModalState(false);
    };
    const openFeatModal = () => {
        document.body.style.overflow = 'hidden';
        setFeatModalState(true);
    };
    const closeFeatModal = () => {
        document.body.style.overflow = 'auto';
        setFeatModalState(false);
    };
    const openDetailModal = () => {
        document.body.style.overflow = 'hidden';
        setDetailModalState(true);
    };
    const closeDetailModal = () => {
        document.body.style.overflow = 'auto';
        setDetailModalState(false);
    };

    useEffect(() => {
        ChannelTalk();
        if (new Date().getTime() > localStorage.getItem('expire')) {
            localStorage.clear();
        };
    })

    return (
        <ModalContext.Provider value={{ modalState, setModalState, featModalState, setFeatModalState, detailModalState, setDetailModalState, subButtonState, setSubButtonState, featButtonState, setFeatButtonState, openModal, closeModal, openFeatModal, closeFeatModal, openDetailModal, closeDetailModal, featCloseButton, setFeatCloseButton, addSubject, setAddSubject }}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/signupPage1" element={<SignupPage1 />} />
                        <Route path="/uploadpdf" element={<UploadPdfPage />} />
                        <Route path="/donelecture" element={<DoneLecturePage />} />
                        <Route path="/signupPage2" element={<SignupPage2 />} />
                        <Route path="/loginPage" element={<LoginPage />} />
                        <Route path="/userGuidePage" element={<UserGuidePage />} />
                        <Route path="/" element={<IntroPage />} />
                        <Route path="/myPage" element={<MyPage />} />
                        <Route path="/manageGraduPage" element={<ManageGraduPage />} />
                        <Route path="/graduTestPage" element={<GraduTestPage />} />
                        <Route path="/oneClickTestPage" element={<OneClickTestPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ModalContext.Provider>
    );
}

export default App;
