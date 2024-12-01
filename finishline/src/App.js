// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/introPage';
import LoginPage from './pages/loginPage';
import UserGuide from './pages/userGuide';
import GraduateCheck from './pages/graduateCheck';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route
                        path="/loginPage"
                        element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
                    />
                    <Route
                        path="/userGuide"
                        element={<UserGuide isLoggedIn={isLoggedIn} />}
                    />
                    <Route path="/graduateCheck" element={<GraduateCheck />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;