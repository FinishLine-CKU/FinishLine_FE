import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* 추가적인 라우트는 여기에 설정 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;