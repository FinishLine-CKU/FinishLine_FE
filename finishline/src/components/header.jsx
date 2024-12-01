import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import Modal from '../components/modal/loginService'; // 모달 컴포넌트 import
import { useLocation } from 'react-router-dom';

// 이미지 파일 import
import logo1 from '../assets/images/logo1.png';

function Header() {
    const location = useLocation(); // 현재 경로를 가져옴
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    const openModal = () => {
        console.log('openModal 호출'); // 디버깅용 로그
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('closeModal 호출'); // 디버깅용 로그
        setIsModalOpen(false);
    };

    console.log('isModalOpen:', isModalOpen); // 현재 상태 확인

    return (
        <header className={css(styles.header)}>

            {/* 로고 홈 버튼. */}
            <Link to="/loginPage">
                <img src={logo1} alt="Logo" className={css(styles.logo)} />
            </Link>


            {/* 네비게이션 및 로그인 버튼 */}
            <div className={css(styles.headerLinks)}>
                <nav className={css(styles.navLinks)}>
                    <Link
                        to="/userGuide"
                        className={css(
                            styles.navLink,
                            location.pathname === '/userGuide' && styles.activeNavLink // 현재 경로가 '/userGuide'일 때 스타일 추가
                        )}
                    >
                        이용 가이드
                    </Link>
                    <span
                        className={css(styles.navLink)}
                        onClick={openModal} // 모달 열기
                    >
                        졸업 요건 검사
                    </span>
                    <span
                        className={css(styles.navLink)}
                        onClick={openModal} // 모달 열기
                    >
                        기이수 과목 관리
                    </span>
                </nav>
                <button
                    className={css(styles.loginButton)}
                    onClick={() => alert('학번과 비밀번호를 모두 입력해주세요.')} // 간단한 메시지 출력
                >
                    로그인
                </button>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
}

// 스타일 정의
const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '50px',
    },
    logo: {
        height: '110px',
        width: 'auto',
        marginTop: '3%',
        marginRight: 'auto',
        padding: '0 60px',
    },
    headerLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '65px',
        marginTop: '2%',
        padding: '0 90px',
    },

    activeNavLink: {
        fontWeight: 'bold', // 볼드 효과
    },

    navLinks: {
        display: 'flex',
        gap: '50px',
        alignItems: 'center',
    },
    navLink: {
        textDecoration: 'none',
        color: '#2B2A28',
        fontFamily: 'Lato, sans-serif',
        cursor: 'pointer', // 클릭 가능 스타일
    },
    loginButton: {
        backgroundColor: '#2B2A28',
        color: '#ffffff',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        borderRadius: '10px',
    },

});

export default Header;
