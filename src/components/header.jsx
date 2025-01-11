import { StyleSheet, css } from 'aphrodite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import mainLogo from '../assets/images/mainLogo.png';

function Header({ onLoginChange }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 상태 체크
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        }
        // 부모 컴포넌트에 로그인 상태 전달
        if (onLoginChange) {
            onLoginChange(isLoggedIn);
        }
    }, [isLoggedIn, onLoginChange]);

    const handleLogin = () => {
        if (isLoggedIn) {
            // 로그아웃 처리
            localStorage.removeItem('userToken');
            setIsLoggedIn(false);
        } else {
            // 로그인 페이지로 이동
            navigate('/loginPage');
        }
    };
    return (
        <header className={css(styles.headerContainer)}>
            <a href="/">
                <img src={mainLogo} className={css(styles.mainLogo)} alt="mainLogo"/>
            </a>
            <nav className={css(styles.navigationContainer)}>
                <ul className={css(styles.navigation)}>
                    <li><a href="/userGuidePage" className={css(styles.menu)}>이용 가이드</a></li>
                    <li>
                        <a 
                            href="/graduation-check" 
                            className={css(styles.menu)}
                            onClick={(e) => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    alert('로그인이 필요한 서비스입니다.');
                                }
                            }}
                        >
                            졸업요건 검사
                        </a>
                    </li>
                    <li>
                        <a 
                            href="/subject-management" 
                            className={css(styles.menu)}
                            onClick={(e) => {
                                if (!isLoggedIn) {
                                    e.preventDefault();
                                    alert('로그인이 필요한 서비스입니다.');
                                }
                            }}
                        >
                            기이수과목 관리
                        </a>
                    </li>
                    <li>
                        <button 
                            onClick={handleLogin} 
                            className={css(styles.signIn)}
                        >
                            {isLoggedIn ? '로그아웃' : '로그인'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

Header.propTypes = {
    onLoginChange: PropTypes.func,
};

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px 110px 20px 110px',
        backgroundColor: '#FFFEFB',
    },
    mainLogo: {
        width: '127px',
    },
    navigationContainer: {
        display: 'flex',
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
        gap: '65px',
        listStyle: 'none',
    },
    menu: {
        padding: '13px 0 13px 0',
        textDecoration: 'none',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '18px',
        ':hover': {
            color: '#006277',
            fontWeight: 'bold',
        },
    },
    signIn: {
        width: '90px',
        height: '40px',
        border: '0',
        borderRadius: '10px',
        backgroundColor: '#2B2A28',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        fontSize: '17px',
        fontWeight: '600',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#595650',
        }
    },
  
});

export default Header;


