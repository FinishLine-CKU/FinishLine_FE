// src/components/footer.js

import React, { useState, useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next'; // useTranslation 추가
import { StyleSheet, css } from 'aphrodite';
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

                <a
                    href="팀 이메일 링크"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css(styles.footerTeam)}
                >
                    softwareTeam@cku.ac.kr
                </a>

                {/* 깃허브 링크 */}
                <a
                    href="깃허브 링크"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css(styles.footerGitLink)}
                >
                    www.softwareTeam.github.com
                </a>

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


                    <a
                        href="개인정보 처리 방침 링크"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css(styles.footerLinks)}
                    >
                        개인정보 처리방침
                    </a>

                    {/* 깃허브 링크 */}
                    <a
                        href="이용약관 링크"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css(styles.footerLink)}
                    >
                        이용약관
                    </a>

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
        marginRight: '2px',
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
        marginLeft: '4px', // 오른쪽으로 이동

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
        marginBottom: '5px',
    },

    // 팀 이메일
    footerTeam: {
        margin: '0',
        padding: '0',
        fontSize: '11px',
        marginTop: '2px',
        textDecoration: 'none', // 밑줄 제거
        color: '#ffffff',       // 흰색으로 설정

    },


    // 깃허브 링크
    footerGitLink: {
        margin: '0',
        padding: '0',
        fontSize: '11px',
        marginTop: '2px',
        textDecoration: 'none', // 밑줄 제거
        color: '#ffffff',       // 흰색으로 설정

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
        position: 'relative', // 드롭다운의 위치 기준을 이 컨테이너로 설정
        marginRight: '20px',
        marginBottom: '12px',
    },

    // 버튼 안에 화살표
    arrow: {
        fontSize: '8px',
    },

    // 드롭다운 클릭시 나오는 창 스타일
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        backgroundColor: '#2B2A28',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '64px',
        maxHeight: '100px',
        overflowY: 'auto',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        zIndex: 1000,
        transform: 'none', // 다른 페이지의 transform 영향을 제거
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
        display: 'flex',          // 수평 정렬
        gap: '10px',              // 링크 간 간격
        textDecoration: 'none',
        color: '#ffffff',
        marginLeft: 'auto',       // 자동으로 오른쪽 정렬
        marginRight: '20px',      // 오른쪽으로 추가 간격
        justifyContent: 'flex-end', // 링크를 오른쪽 끝으로 정렬


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
        marginRight: '20px',
    },
});

export default Footer;
