import { StyleSheet, css } from 'aphrodite';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';

function SignupPage2() {
    return (
        <>
            <Header />
            <Template title="회원가입" subtitle="졸업요건 검사 서비스 이용을 위해 약관 동의와 학생 인증 절차가 필요합니다."/>
            <div className={css(styles.container)}>
                <div className={css(styles.defaultInfoArea)}>
                    <span className={css(styles.containerTitle)}>기본 정보 확인</span>
                    <div className={css(styles.infoContainer)}>
                        <label className={css(styles.infoLable)}>이름</label>
                        <input className={css(styles.defaultInfo)} disabled="true" placeholder="홍길동"></input>
                        <label className={css(styles.infoLable)}>학과</label>
                        <input className={css(styles.defaultInfo)} disabled="true" placeholder="소프트웨어학과"></input>
                        <label className={css(styles.infoLable)}>학번</label>
                        <input className={css(styles.defaultInfo)} disabled="true" placeholder="20240000"></input>
                    </div>
                </div>
                <div className={css(styles.additionalInfoArea)}>
                    <span className={css(styles.containerTitle)}>추가 정보 설정</span>
                    <div className={css(styles.infoContainer)}>
                        <label className={css(styles.infoLable)}>복수/부/연계 전공</label>
                        <select className={css(styles.majorStatus)}>
                            <option value="">해당 없음</option>
                            <option value="double">복수전공</option>
                            <option value="minor">부전공</option>
                            <option value="linked">연계전공</option>
                        </select>
                        <select className={css(styles.majorSelect)}>
                            <option></option>
                        </select>
                        <label className={css(styles.infoLable)}>소단위전공</label>
                        <select className={css(styles.majorSelect)}>
                            <option value="">해당 없음</option>
                        </select>
                        <label className={css(styles.infoLable)}>비밀번호 설정</label>
                        <input className={css(styles.additionalInfo)} type="password" placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                        <label className={css(styles.infoLable)}>비밀번호 확인</label>
                        <input className={css(styles.additionalInfo)} type="password" placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                    </div>
                </div>
                <button className={css(styles.signUpButton)}>가입하기</button>
            </div>
            <Footer />
        </>
    )

};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '60px 0 0 0',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
        gap: '65px',
    },
    defaultInfoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '424px',
    },
    containerTitle: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '18px',
        marginBottom: '25px',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '424px',
    },
    infoLable: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '8px',
    },
    defaultInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '410px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        backgroundColor: '#F6F6F6'
    },
    additionalInfoArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '424px',
    },
    majorStatus: {
        marginBottom: '10px',
        padding: '0 0 0 15px',
        width: '425px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus':{
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    majorSelect: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '425px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus':{
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    additionalInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        width: '410px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        ':focus': {
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    signUpButton: {
        margin: '-30px 0 130px 0',
        width: '117px',
        height: '40px',
        border: '0px',
        borderRadius: '10px',
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '17px',
        color: '#FFFEFB',
        backgroundColor: '#2B2A28',
        ':active': {
            backgroundColor: '#595650',
            color: '#FFFEFB',
        },
    },
});

export default SignupPage2;