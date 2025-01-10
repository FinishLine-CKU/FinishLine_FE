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

    // 테스트용 임시 로그인 (개발 완료 후 제거)
    const handleTestLogin = () => {
        localStorage.setItem('userToken', 'test-token');
        setIsLoggedIn(true);
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
                    {/* 테스트용 버튼 (개발 완료 후 제거) */}
                    {!isLoggedIn && (
                        <li>
                            <button 
                                onClick={handleTestLogin} 
                                className={css(styles.testButton)}
                            >
                                테스트 로그인
                            </button>
                        </li>
                    )}
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
    // 테스트용 버튼 
    testButton: {
        width: '110px',
        height: '40px',
        border: '0',
        borderRadius: '10px',
        backgroundColor: '#006277',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '600',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#004d5e',
        }
    }
});

export default Header;


// 기존 헤더코드


// import { StyleSheet, css } from 'aphrodite';
// import mainLogo from '../assets/images/mainLogo.png';

// function Header() {
//     return (
//         <header className={css(styles.headerContainer)}>
//             <a href="">
//                 <img src={mainLogo} className={css(styles.mainLogo)} alt="mainLogo"/>
//             </a>
//             <nav className={css(styles.navigationContainer)}>
//                 <ul className={css(styles.navigation)}>
//                     <li><a href="/userGuidePage" className={css(styles.menu)}>이용 가이드</a></li>
//                     <li><a href="" className={css(styles.menu)}>졸업요건 검사</a></li>
//                     <li><a href="" className={css(styles.menu)}>기이수과목 관리</a></li>
//                     <li>
//                         <a href="" className={css(styles.menu)}>
//                             <button className={css(styles.signIn)}>로그인</button>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     )
// }

// const styles = StyleSheet.create({
//     headerContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         padding: '30px 110px 20px 110px',
//         backgroundColor: '#FFFEFB',
//     },
//     mainLogo: {
//         width: '127px',
//     },
//     navigationContainer: {
//         display: 'flex',
//     },
//     navigation: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '65px',
//         listStyle: 'none',
//     },
//     menu: {
//         padding: '13px 0 13px 0',
//         textDecoration: 'none',
//         color: '#2B2A28',
//         fontFamily: 'Lato',
//         fontWeight: '600',
//         fontSize: '18px',
//         ':hover': {
//             color: '#006277',
//             fontWeight: 'bold',
//         },
//     },
//     signIn: {
//         width: '90px',
//         height: '40px',
//         border: '0',
//         borderRadius: '10px',
//         backgroundColor: '#2B2A28',
//         color: '#FFFEFB',
//         fontFamily: 'Lato',
//         fontSize: '17px',
//         fontWeight: '600',
//         ':hover': {
//             cursor: 'pointer',
//         },
//         ':active': {
//             backgroundColor: '#595650',
//         }
//     }
// });

// export default Header;