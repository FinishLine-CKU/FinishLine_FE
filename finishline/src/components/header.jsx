// src/components/header.js

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import

// 이미지 파일 import
import logo1 from '../assets/images/logo1.png';

// Header 컴포넌트
function Header() {
    return (
        <header className={css(styles.header)}>
             {/* 로고 */}
                <img src={logo1} alt="Logo" className={css(styles.logo)} />


            {/* 네비게이션 및 로그인 버튼 */}
            <div className={css(styles.headerLinks)}>
                <nav className={css(styles.navLinks)}>
                    <Link to="/userGuide" className={css(styles.navLink)}>이용 가이드</Link>
                    <Link to="/graduateCheck" className={css(styles.navLink)}>졸업 요건 검사</Link>
                    <Link to="/기이수과목폴더 이름" className={css(styles.navLink)}>기이수 과목 관리</Link>  
                </nav>
                <button className={css(styles.loginButton)}>로그인</button>
            </div>
        </header>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    // 헤더 컨테이너 스타일
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // 로고 스타일
    logo: {
        height: '100px',
        width: 'auto',
        marginRight: 'auto',
        padding: '0 30px',
    },

    // 헤더 링크 섹션 스타일
    headerLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        padding: '0 90px',
    },

    // 네비게이션 링크 스타일
    navLinks: {
        display: 'flex',
        gap: '50px',
        alignItems: 'center',
    },

    // 헤더 이용가이드, 졸업요건 검사, 기이수 과목관리, 로그인버튼 
    navLink: {
        textDecoration: 'none',
        color: '#333',
        fontFamily: 'Lato, sans-serif',
    },

    // 로그인 버튼 스타일
    loginButton: {
        backgroundColor: '#2B2A28',
        color: '#ffffff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '5px',
    },
});

export default Header;
