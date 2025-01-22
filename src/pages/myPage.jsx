import { StyleSheet, css } from 'aphrodite';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';

function MyPage() {
    return (
        <>
            <Header />
            <Template title="마이페이지" />
            <div className={css(styles.container)}>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 정보</span>
                        <button className={css(styles.button)}>수정</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentContainer)}>
                        <span className={css(styles.contentTitle)}>이름</span>
                        <span className={css(styles.content)}>{localStorage.getItem('name')}</span>
                    </div>
                    <div className={css(styles.contentContainer)}>

                    </div>
                    <div className={css(styles.contentContainer)}>

                    </div>
                    <div className={css(styles.contentContainer)}>

                    </div>
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>

                    </div>
                    safas
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>

                    </div>
                    asdfas
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>

                    </div>
                    fasdfas
                </div>
            </div>
            
            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        marginTop: '60px',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
    },
    boundaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E4E4E4',
        borderRadius: '15px',
        width: '565px',
    },
    titleArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '35px 45px 15px 45px',
    },
    title: {
        fontSize: '25px',
        fontFamily: 'Lato',
        fontWeight: '600'
    },
    button: {
        width: '70px',
        height: '25px',
        fontSize: '12px',
        fontFamily: 'Lato',
        fontWeight: '600',
        border: '1px solid #2B2A28',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#2B2A28',
            color: '#FFFEFB',
            transitionDuration: '0.2s',
        },
        ':active': {
            backgroundColor: '#595650',
            border: '2px solid #595650',
            color: '#FFFEFB',
        },
    },
    horizontal: {
        width: '478px',
        border: '1px solid #E4E4E4',
        marginTop: '0px',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 48px 15px 45px',

    },
    contentTitle: {
        fontSize: '20px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: '#2B2A28'
    },
    content: {
        fontSize: '18px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: '#7A828A'
    },
});

export default MyPage;