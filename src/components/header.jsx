import { StyleSheet, css } from 'aphrodite';
import mainLogo from '../assets/images/mainLogo.png';

function Header() {
    return (
        <header className={css(styles.headerContainer)}>
            <a href="">
                <img src={mainLogo} className={css(styles.mainLogo)} alt="mainLogo"/>
            </a>
            <nav className={css(styles.navigationContainer)}>
                <ul className={css(styles.navigation)}>
                    <li><a href="/userGuidePage" className={css(styles.menu)}>이용 가이드</a></li>
                    <li><a href="" className={css(styles.menu)}>졸업요건 검사</a></li>
                    <li><a href="" className={css(styles.menu)}>기이수과목 관리</a></li>
                    <li>
                        <a href="" className={css(styles.menu)}>
                            <button className={css(styles.signIn)}>로그인</button>
                        </a>
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
