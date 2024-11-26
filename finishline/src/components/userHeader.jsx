// src/components/userHeader.js

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 import
import logo1 from '../assets/images/logo1.png'; // 로고 이미지

// UserHeader 컴포넌트
function UserHeader({ additionalBoldLink }) {
    return (
        <header className={css(styles.userHeader)}> 

           {/* 로고 홈 버튼 임시로 로그인페이지 이지만 마이페이지로 설정해두면 될거 같음.*/}
           <Link to="/loginPage"> 
                <img src={logo1} alt="Logo" className={css(styles.logo)} />
            </Link>

            {/* 네비게이션 및 로그인 버튼 */}
            <div className={css(styles.headerLinks)}>
                <nav className={css(styles.navLinks)}>
                    
                    {/* additionalBoldLink를 사용해서 필요한 페이지에서만 bold가 가능하게 */}
                    <Link to="/userGuide" className={css(styles.navLink, additionalBoldLink === '/userGuide' && styles.bold)}>이용 가이드</Link>
                    <Link to="/graduateCheck" className={css(styles.navLink, additionalBoldLink === '/graduateCheck' && styles.bold)}>졸업 요건 검사</Link>
                    <Link to="/completedCourses" className={css(styles.navLink, additionalBoldLink === '/completedCourses' && styles.bold)}>기이수 과목 관리</Link>  

                    {/* 사용자 인사말 */}
                    <div className={css(styles.helloContainer)}>
                        <span className={css(styles.hello)}>반갑습니다</span>
                        <Link to="/myPage" className={css(styles.userPage)}>홍길동님</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    userHeader: {
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

     // 헤더 이용가이드, 졸업요건 검사, 기이수 과목관리, 사용자 이름
    navLink: {
        textDecoration: 'none',
        color: '#333',
        fontFamily: 'Lato, sans-serif',
    },

    // 헤더 볼드가 필요한 헤더에 볼드체 해주기
    bold: {
        fontWeight: 'bold',
    },

    // 반갑습니다, 홍길동 컨테이너
    helloContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },

    // 반갑습니다
    hello: {
        fontWeight: 'bold',
    },

    // 사용자 이름(마이페이지 이동)    
    userPage: {
        color: '#006277',
        fontWeight: 'bold',
        fontSize: '18px',
    },
});

export default UserHeader;
