import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage1 from './pages/signupPage1';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 경로를 loginPage로 리다이렉트 */}
          <Route path="/" element={<Navigate to="/loginPage" />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage1 />} />
          <Route path="/userGuidePage" element={<userGuidePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;