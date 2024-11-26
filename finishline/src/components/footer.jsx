// src/components/footer.js

import React, { useState, useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next'; // useTranslation 추가
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

// 이미지 파일 import
import logo3 from '../assets/images/logo3.png';

// Footer 컴포넌트
function Footer() {
    // const { t, i18n } = useTranslation(); // useTranslation 초기화, 다국어기능 
    const [isLanguageOpen, setIsLanguageOpen] = useState(false); // 언어 드롭다운 상태 관리
    const languageRef = useRef(null); // 드롭다운 메뉴 참조 생성

    // 언어 드롭다운 토글
    const toggleLanguageDropdown = () => {
        setIsLanguageOpen((prev) => !prev);
    };

    // 언어 선택 시 드롭다운 닫기
    const handleLanguageSelect = () => {
        setIsLanguageOpen(false);
    };

    // 메뉴 외부 클릭 시 드롭다운 닫기 설정
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
        <footer className={css(styles.footer)}>

            {/* 푸터 왼쪽 영역 */}
            <div className={css(styles.footerLeft)}>
                <div className={css(styles.footerLogoSection)}>

                    {/* 로고 이미지 클릭 시 네이버 폼 링크로 연결 */}
                    <a
                        href="네이버 폼링크 넣기, 홈페이지에서 바로연결x 새창이 떠서 들어가기"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={logo3} alt="Finish Line Logo" className={css(styles.footerLogo)} />
                    </a>


                    <p className={css(styles.footerLeftText)}>의 사용 후기를 알려주세요!</p>
                </div>
                <p className={css(styles.footerService)}>더 나은 서비스로 보답하겠습니다.</p>
                <div className={css(styles.contactCircle)}>CONTACT</div>
                <Link to="/팀 이메일 링크" className={css(styles.footerTeam)}>softwareTeam@cku.ac.kr</Link>
                <Link to="/깃허브링크" className={css(styles.footerGitLink)}>www.softwareTeam.github.com</Link>
            </div>

            {/* 푸터 오른쪽 영역 */}
            <div className={css(styles.footerRight)}>
                <div className={css(styles.footerButtons)} ref={languageRef}>
                    <button className={css(styles.footerButton)} onClick={toggleLanguageDropdown}>
                        <i className=""></i> 한국어 <span className={css(styles.arrow)}>▼</span>
                    </button>
                    {isLanguageOpen && (
                        <div className={css(styles.dropdownMenu)}>

                            {/* a href="" 안에 맞는 링크를 넣기 */}
                            <a href="" className={css(styles.dropdownLink)} onClick={handleLanguageSelect}>English</a>
                            <a href="" className={css(styles.dropdownLink)} onClick={handleLanguageSelect}>한국어</a>
                        </div>
                    )}
                </div>

                <div className={css(styles.footerLinks)}>

                    {/* a href="" 안에 맞는 링크를 넣기 */}
                    <a href="/누르면 처리방침 이동" className={css(styles.footerLink)}>개인정보 처리방침</a>
                    <a href="/누르면 약관 이동" className={css(styles.footerLink)}>이용약관</a>
                </div>
                <p className={css(styles.footerRightText)}>
                    &copy; 2024 CKU Software Engineering student All rights reserved.
                </p>
            </div>
        </footer>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    // 푸터 전체 스타일
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#2B2A28',
        color: '#ffffff',
        fontFamily: 'Lato',
        fontSize: '10px',
        marginTop: '50px',
        height: '180px',
    },

    // 푸터 왼쪽 영역 스타일
    footerLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '40px',
        marginTop: '10px',
    },

    // 푸터 로고 위치
    footerLogoSection: {
        display: 'flex',
        alignItems: 'center',
    },

    // 푸터 왼쪽 로고
    footerLogo: {
        height: '20px',
        marginTop: '20px',
        marginRight: '3px',
        marginBottom: '0px',
    },

    // 사용후기 텍스트
    footerLeftText: {
        fontSize: '10px',
        marginTop: '24px',
        marginBottom: '0px',
    },

    // 서비스 텍스트
    footerService: {
        margin: '0px',
    },

    // contact 원
    contactCircle: {
        backgroundColor: '#ffffff',
        color: '#2B2A28',
        padding: '3px 7px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '8px',
        border: '1px solid #2B2A28',
        display: 'inline-block',
        marginTop: '25px',
    },

    // 팀 이메일
    footerTeam: {
        margin: '0',
        padding: '0',
        fontSize: '11px',
        marginTop: '8px',
        textDecoration: 'none', // 밑줄 제거
        color: 'inherit', // 부모 요소의 색상 상속
        ':hover': {
            textDecoration: 'none', // 호버 상태에서도 밑줄 제거
        },
    },

    // 깃허브 링크
    footerGitLink: {
        margin: '0',
        padding: '0',
        fontSize: '11px',
        marginTop: '2px',
        textDecoration: 'none', // 밑줄 제거
        color: 'inherit', // 부모 요소의 색상 상속
        ':hover': {
            textDecoration: 'none', // 호버 상태에서도 밑줄 제거
        },
    },

    // 푸터 오른쪽 영역 스타일
    footerRight: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '30px',
        marginTop: '-20px',
    },

    // 버튼 안의 한국어
    footerButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '100px',
        position: 'relative',
        marginLeft: '400px',
    },

    // 한국어 버튼 스타일
    footerButton: {
        backgroundColor: 'transparent',
        border: '1px solid #ffffff',
        color: '#ffffff',
        padding: '3px 10px',
        borderRadius: '15px',
        fontSize: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
    },

    // 버튼 안에 화살표
    arrow: {
        fontSize: '8px',
    },

    // 드롭다운 클릭시 나오는 창 스타일
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#2B2A28',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '80px',
        maxHeight: '100px',
        overflowY: 'auto',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        zIndex: 1000,
    },

    // 드롭다운 클릭시 나오는 한국어, English 스타일
    dropdownLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '10px',
        padding: '5px',
        borderRadius: '3px',
        ':hover': {
            backgroundColor: '#444444',
        },
    },

    // 개인정보 처리방침
    footerLinks: {
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
        marginLeft: 'auto',
    },

    // 이용약관
    footerLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '10px',
    },

    // 카피레프트
    footerRightText: {
        color: '#ffffff',
        textAlign: 'center',
        marginLeft: 'auto',
    },
});

export default Footer;
