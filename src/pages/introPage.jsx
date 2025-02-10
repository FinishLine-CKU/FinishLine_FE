import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import background from '../assets/images/backGround.png';
import introLogo from '../assets/images/introLogo.png';
import finishlineLogo from '../assets/images/finishlineLogo.png';
import Footer from '../components/footer';

function IntroPage() {
    const navigate = useNavigate();

    return (
        <div className={css(styles.introContainer)} style={{ backgroundImage: `url(${background})` }}>
            {/* 대학교 로고 */}
            <img src={introLogo} alt="University Logo" className={css(styles.universityLogo)} />

            {/* 중앙 콘텐츠 */}
            <div className={css(styles.centerContent)}>
                <p className={css(styles.subtitle)}>가톨릭관동대학교 졸업 요건 확인 사이트</p>
                <img src={finishlineLogo} alt="Finish Line Logo" className={css(styles.mainLogo)} />
                <div className={css(styles.buttonContainer)}>
                    <button
                        className={css(styles.checkButton)}
                        onClick={() => navigate('/loginPage')}
                    >
                        검사하기
                    </button>
                </div>
                
            </div>

            {/* Footer 컴포넌트 사용 */}
            <Footer footerType="transparent" />
        </div>
    );
}

const styles = StyleSheet.create({
    introContainer: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#ffffff',
    },
    universityLogo: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '155px',
    },
    centerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'absolute',
        top: '52%',
        right: '10%',
        width: '397px',
        transform: 'translateY(-50%)',
    },
    subtitle: {
        fontSize: '19px',
        fontFamily: 'Lato',
        fontWeight: '500',
        lineHeight: '1px',
        marginBottom: '20px',
    },
    mainLogo: {
        width: '100%',
        marginBottom: '20px',
    },
    buttonContainer: {
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
    },
    checkButton: {
        padding: '12px 32px',
        fontSize: '20px',
        fontFamily: 'Lato',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: 'transparent',
        border: '3px solid #ffffff',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '13px',
        ':hover': {
            backgroundColor: '#000000',
            border: '3px solid #000000',
            color: '#FFFEFB',
            transitionDuration: '0.2s',
        },
    }
});

export default IntroPage;
