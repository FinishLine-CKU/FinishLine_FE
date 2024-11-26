// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/introPage';
import LoginPage from './pages/loginPage';
import UserGuide from './pages/userGuide';
import GraduateCheck from './pages/graduateCheck';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/loginPage" element={<LoginPage />} />
                    <Route path="/userGuide" element={<UserGuide />} />
                    <Route path="/graduateCheck" element={<GraduateCheck />} />
                    {/* <Route path="/completed-courses" element={<div>기이수 과목 관리 페이지 준비 중...</div>} /> */}
                </Routes>
            </div>
        </Router>   
    );
}

export default App; 
