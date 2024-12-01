import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, useNavigate } from 'react-router-dom'; // React Router의 Link 컴포넌트 및 useNavigate import
import logo1 from '../assets/images/logo1.png'; // 로고 이미지

// UserHeader 컴포넌트
function UserHeader({ additionalBoldLink }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
    const dropdownRef = useRef(null); // 드롭다운 참조 생성
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    // 드롭다운 토글
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // 메뉴 외부 클릭 시 드롭다운 닫기 설정
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className={css(styles.userHeader)}>

            {/* 로고 홈 버튼 임시로 로그인페이지 이지만 마이페이지로 설정해두면 될거 같음. */}
            <Link to="/loginPage">
                <img src={logo1} alt="Logo" className={css(styles.logo)} />
            </Link>

            {/* 네비게이션 및 로그인 버튼 */}
            <div className={css(styles.headerLinks)}>
                <nav className={css(styles.navLinks)}>

                    {/* additionalBoldLink를 사용해서 필요한 페이지에서만 bold가 가능하게 */}
                    <Link to="/userGuide" className={css(styles.navLink, additionalBoldLink === '/userGuide' && styles.bold)}>이용 가이드</Link>
                    <Link to="/graduateCheck" className={css(styles.navLink, additionalBoldLink === '/graduateCheck' && styles.bold)}>졸업 요건 검사</Link>

                    {/* 기이수 과목 링크 점검 */}
                    <Link to="/임시" className={css(styles.navLink, additionalBoldLink === '/임시' && styles.bold)}>기이수 과목 관리</Link>

                    {/* 사용자 인사말 */}
                    <div className={css(styles.helloContainer)} ref={dropdownRef}>
                        <span className={css(styles.hello)}>반갑습니다</span>
                        <span
                            className={css(styles.user)}
                            onClick={toggleDropdown} // 드롭다운 토글
                        >
                            홍길동님
                        </span>
                        {isDropdownOpen && (
                            <div className={css(styles.dropdownMenu)}>
                                <div
                                    className={css(styles.dropdownLink)}
                                    onClick={() => navigate('/myPage')} // 마이페이지로 이동
                                >
                                    마이페이지
                                </div>
                                <div
                                    className={css(styles.dropdownLink)}
                                    onClick={() => navigate('/loginPage')} // 로그인 페이지로 이동
                                >
                                    로그아웃
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    // 헤더 컨테이너 스타일 (수평 정렬 보장)
    userHeader: {
        width: '100%',
        display: 'flex',
        alignItems: 'center', // 세로축 정렬 (중앙 정렬)
        justifyContent: 'space-between', // 양쪽 정렬
        padding: '10px 20px', // 위아래 여백 추가
        boxSizing: 'border-box', // 패딩 포함 크기 계산
    },

    // 로고 스타일
    logo: {
        height: '110px',
        width: 'auto',
        marginRight: 'auto',
    },

    // 헤더 링크 섹션 스타일
    headerLinks: {
        display: 'flex',
        alignItems: 'center', // 수직 정렬
        gap: '50px', // 링크 간격
    },

    // 네비게이션 링크 스타일
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px', // 각 네비게이션 간격
    },

    // 공통 링크 스타일
    navLink: {
        textDecoration: 'none',
        color: '#2B2A28',
        fontFamily: 'Lato, sans-serif',
        fontSize: '16px', // 텍스트 크기 조정
    },

    // 볼드 스타일
    bold: {
        fontWeight: 'bold',
    },

    // 사용자 정보 섹션
    helloContainer: {
        display: 'flex',
        alignItems: 'center', // 수직 정렬
        gap: '10px', // 텍스트와 아이콘 간격
    },

    hello: {
        fontWeight: 'bold',
        fontSize: '16px',
    },

    user: {
        color: '#006277',
        fontWeight: 'bold',
        fontSize: '16px',
        textDecoration: 'underline',
        cursor: 'pointer',
    },

    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: '80px',
        backgroundColor: '#2B2A28',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '120px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '10px',
    },

    dropdownLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '14px',
        padding: '10px 15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ':hover': {
            backgroundColor: '#444444',
        },
    },
});

export default UserHeader;