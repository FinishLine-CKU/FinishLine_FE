import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import { ModalContext } from '../utils/hooks/modalContext';
import mainLogo from '../assets/images/mainLogo.png';

function Header() {
    const [optionState, setOptionState] = useState(false);
    const navigate = useNavigate();
    const { openModal } = useContext(ModalContext);
    const logOut = () => {
        if (localStorage.getItem('idToken')) {
            localStorage.removeItem('name');
            localStorage.removeItem('idToken');
            navigate("/loginPage");
        }
    };
    const myPage = () => {
        if (localStorage.getItem('idToken')) {
            navigate("/myPage");
        }
    };
    
    return (
        <header className={css(styles.headerContainer)}>
            <a href="/userGuidePage">
                <img src={mainLogo} className={css(styles.mainLogo)} alt="mainLogo"/>
            </a>
            <nav className={css(styles.navigationContainer)}>
                <ul className={css(styles.navigation)}>
                    <li><a href="/userGuidePage" className={css(styles.menu)}>이용 가이드</a></li>
                    <li>
                        { localStorage.getItem('idToken') ? 
                        <a href="" className={css(styles.menu)}>졸업요건 검사</a>
                        : <span className={css(styles.menu)} onClick={openModal}>졸업요건 검사</span> }
                    </li>
                    <li>
                        { localStorage.getItem('idToken') ? 
                        <a href="/uploadpdf" className={css(styles.menu)}>기이수과목 관리</a>
                        : <span className={css(styles.menu)} onClick={openModal}>기이수과목 관리</span> }
                    </li>
                    <li>
                        { localStorage.getItem('idToken') ? 
                        optionState ?
                        <>
                            <div className={css(styles.userInfo)} onClick={() => setOptionState(!optionState)}>
                                <span className={css(styles.hello)}>반갑습니다</span>
                                <span className={css(styles.userName)}>{localStorage.getItem('name')}님</span>
                            </div>
                            <div className={css(styles.optionContainer)}>
                                <span className={css(styles.optionButton)} onClick={myPage}>마이페이지</span>
                                <span className={css(styles.optionButton)} onClick={logOut}>로그아웃</span>
                            </div>
                        </> :
                        <div className={css(styles.userInfo)} onClick={() => setOptionState(!optionState)}>
                            <span className={css(styles.hello)}>반갑습니다</span>
                            <span className={css(styles.userName)}>{localStorage.getItem('name')}님</span>
                        </div> :
                        <a href="/loginPage" className={css(styles.menu)}>
                            <button className={css(styles.signIn)}>로그인</button>
                        </a> }
                    </li> 
                </ul>
            </nav>
        </header>
    )
}

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
    userInfo: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        padding: '11px 0 13px 0',
        ':hover': {
            cursor: 'pointer',
        },
    },
    hello: {
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '700',
    },
    userName: {
        fontFamily: 'Lato',
        fontSize: '20px',
        fontWeight: '800',
        color: '#006277',
        textDecoration : 'underline',
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
            cursor: 'pointer',
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
    optionContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        width: '70px',
        height: '70px',
        position: 'absolute',
        backgroundColor: '#2B2A28',
        borderRadius: '8px',
    },
    optionButton: {
        padding: '5px 0',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '700',
        color: '#FFFEFB',
        ':hover': {
            cursor: 'pointer'
        }
    }
});

export default Header;
