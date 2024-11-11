import React, { useState, useEffect, useRef } from 'react';
import '../styles/LoginPage.css';

function LoginPage() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  return (
    <div className="login-container">
      <header className="login-header">
        <img src="/logo1.png" alt="Finish Line Logo" className="logo" />
        <div className="header-links">
          <nav className="nav-links">
            <a href="#">이용 가이드</a>
            <a href="#">졸업 요건 검사</a>
            <a href="#">기이수 과목 관리</a>
          </nav>
          <button className="login-button">로그인</button>
        </div>
      </header>

      <main className="login-main">
        <img src="/logo2.png" alt="Finish Line Icon" className="welcome-icon" />
        <h1 className="welcome-text">Welcome to Finish Line!</h1>
        <h2 className="login-title">로그인</h2>
        <p className="login-description">Finish Line에 등록한 학번과 비밀번호를 입력해주세요.</p>
        
        <form className="login-form">
          <label>
            학번
            <input type="text" placeholder="학번을 입력하세요." />
          </label>
          <label className="password-label">
            비밀번호
            <input type="password" placeholder="비밀번호를 입력하세요." />
            <a href="#" className="forgot-password">비밀번호를 잊으셨나요?</a>
          </label>
          <button type="submit" className="submit-button">로그인</button>
        </form>
        
        <div className="register">
          <span className="register-text">아직 회원이 아니신가요?</span>
          <a href="#" className="register-link">회원가입</a>
        </div>
      </main>

      <footer className="login-footer">
        <div className="footer-left">
          <div className="footer-logo-section">
            <img src="/logo3.png" alt="Finish Line Logo" className="footer-logo" />
            <p className="footer-text">의 사용 후기를 알려주세요!</p>
          </div>
          <p>더 나은 서비스를 만들어갑니다.</p>
          <div className="contact-circle">CONTACT</div>
          <p>softwareTeam@cku.ac.kr</p>
          <p>www.softwareTeam.github.com</p>
        </div>

        <div className="footer-right">
          <div className="footer-buttons" ref={languageRef}>
            <button className="footer-button" onClick={toggleLanguageDropdown}>
              <i className="fas fa-globe"></i> 한국어 <span className="arrow">▼</span>
            </button>
            {isLanguageOpen && (
              <div className="dropdown-menu">
                <a href="#">English</a>
                <a href="#">한국어</a>
              </div>
            )}
          </div>
          <div className="footer-links">
            <a href="#">개인정보 처리방침</a>
            <a href="#">이용약관</a>
          </div>
          <p>&copy; 2024 CKU Software Engineering student All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
