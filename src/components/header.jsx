import { useNavigate } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import mainLogo from '../assets/images/mainLogo.png';

function Header() {
    const navigate = useNavigate();
    const logOut = () => {
        if (localStorage.getItem('name')) {
            localStorage.removeItem('name')
            navigate("/loginPage");
        }
    };
    const myPage = () => {
        if (localStorage.getItem('name')) {
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
                    <li><a href="" className={css(styles.menu)}>졸업요건 검사</a></li>
                    <li><a href="/uploadpdf" className={css(styles.menu)}>기이수과목 관리</a></li>
                    <li>
                        { localStorage.getItem('name') ? 
                        <div className={css(styles.userInfo)}>
                            <span className={css(styles.hello)} onClick={logOut}>반갑습니다</span>
                            <span className={css(styles.userName)} onClick={myPage}>{localStorage.getItem('name')}님</span>
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
    }
});

export default Header;
