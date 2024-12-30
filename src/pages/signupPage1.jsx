import { StyleSheet, css } from 'aphrodite';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import whiteCKULogo from '../assets/images/whiteCKULogo.png'

function SignupPage1() {
    return (
        <>
            <Header />
            <Template title="회원가입" subtitle="졸업요건 검사 서비스 이용을 위해 약관 동의와 학생 인증 절차가 필요합니다."/>
            <div className={css(styles.container)}>
                <div className={css(styles.policyArea)}>
                    <span className={css(styles.containerTitle)}>이용약관 및 개인정보처리방침</span>
                    <div className={css(styles.policyContainer)}>
                        <span className={css(styles.contentTitle)}>이용약관</span>
                        <p className={css(styles.policyContent)}>
                            1. 학생 인증시 입력한 비밀번호는  학생 인증 시에만 사용되며 저장되지 않습니다.<br/>
                            2. 기이수 과목 등록시 첨부한 PDF는 평점을 제외한 강의에 대한 텍스트 정보만을 추출하여 저장됩니다.
                        </p>
                        <span className={css(styles.contentTitle)}>개인정보처리방침</span>
                        <p className={css(styles.policyContent)}>
                            제 1조 (수집하는 개인정보 항목)<br/>
                            본 사이트는 회원가입 및 학생 인증을 위해 다음과 같은 개인정보를 수집합니다.<br/>
                            - 이름, 학과, 학번<br/>
                            - 가톨릭관동대학교 포털 아이디 및 비밀번호 (인증 후 저장되지 않음)<br/>
                            - 
                        </p>
                    </div>
                    <div className={css(styles.agreementContainer)}>
                        <input type="checkbox" className={css(styles.agreementCheckbox)}></input>
                        <span className={css(styles.agreementDiscription)}>이용약관 및 개인정보처리방침에 동의합니다.</span>
                    </div>
                </div>
                <div className={css(styles.certificationArea)}>
                    <span className={css(styles.containerTitle)}>학생인증</span>
                    <div className={css(styles.certificationContainer)}>
                        <img src={whiteCKULogo} className={css(styles.univLogo)} />
                        <span className={css(styles.guideCertification)}>가톨릭관동대학교 포털 아이디와 비밀번호를 입력해주세요.</span>
                        <div className={css(styles.inputContainer)}>
                            <label className={css(styles.inputLabel)}>아이디</label>
                            <input className={css(styles.certificationInput)} type="text" placeholder="아이디를 입력하세요."></input>
                            <label className={css(styles.inputLabel)}>비밀번호</label>
                            <input className={css(styles.certificationInput)} type="password" placeholder="비밀번호를 입력하세요."></input>
                        </div>
                        <button className={css(styles.certificationButton)}>재학생 인증</button>
                        <span className={css(styles.exception)}><b>교직, 편입학 대상자</b>의 졸업요건은 반영되지 않아 서비스 이용이 불가합니다.</span>
                    </div>
                    
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
        margin: '50px 0 0 0',
        gap: '70px',
    },
    policyArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        width: '736px',
    },
    containerTitle: {
        display: 'flex',
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '18px',
    },
    policyContainer: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        margin: '20px 0 12px 0',
        padding: '30px 15px 30px 15px',
    },
    contentTitle: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '15px',
    },
    policyContent: {
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '13px',
        color: '#2B2A28',
    },
    agreementContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    agreementCheckbox: {
        zoom: '1.3',
    },
    agreementDiscription: {
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
    },
    certificationArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        width: '736px',
        gap: '10px',
    },
    certificationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    univLogo: {
        width: '182px',
    },
    guideCertification: {
        margin: '25px 0 25px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#7A828A',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    inputLabel: {
        margin: '0 0 8px 0',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: '500',
        color: '#2B2A28',
    },
    certificationInput: {
        margin: '0 0 24px 0',
        padding: '0 0 0 15px',
        width: '415px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        ':focus': {
            outline: '1px solid #2B2A28',
        }
    },
    certificationButton: {
        margin: '16px 0 10px 0',
        width: '430px',
        height: '48px',
        border: '2px solid #2B2A28',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
    },
    exception: {
        margin: '0 0 118px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#006277',
    },
})

export default SignupPage1;