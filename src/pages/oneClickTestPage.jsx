import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';

function OneClickTestPage() {
    const [agree, setAgree] = useState(true);
    const [studentId, setStudentId] = useState('');
    const [studentPW, setStudentPW] = useState('');
    const navigate = useNavigate();

    const oneClickTest = async () => {
        if (studentId === '' || studentPW === '') {
            alert("가톨릭관동대 포털 아이디와 비밀번호를 모두 입력해주세요.");
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/graduation/oneclick_test/', {
                    studentId: studentId,
                    studentPW: studentPW,
                });
                if (response.data.success) {
                    localStorage.setItem('idToken', studentId);
                    navigate('/graduTestPage');
                    window.scrollTo(0, 0);
                } else {
                    const { error } = response.data;
                    alert(error);
                };
            } catch {
                alert("인증과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            };
        };
    };
    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            if (agree) {
                oneClickTest();
            } else {
                alert("이용약관 및 개인정보처리방침에 동의해주세요.");
            };
        }
    };
    
    return (
        <div className={css(styles.container)}>
            <Header />
            <Template title="원클릭 검사" />
            <div className={css(styles.certificationArea)}>
                <div className={css(styles.certificationContainer)}>
                    <img src={whiteCKULogo} className={css(styles.univLogo)} />
                    <span className={css(styles.guideCertification)}><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" className={css(styles.ckuLoginLink)} target="_blank">가톨릭관동대학교 포털</a> 아이디와 비밀번호를 입력해주세요.</span>
                    <div className={css(styles.inputContainer)} onKeyDown={enterSubmit}>
                        <label className={css(styles.inputLabel)}>아이디</label>
                        <input className={css(styles.certificationInput)} value={studentId} onChange={(e) => setStudentId(e.target.value)} type="text" placeholder="아이디를 입력하세요."></input>
                        <label className={css(styles.inputLabel)}>비밀번호</label>
                        <input className={css(styles.certificationInput)} value={studentPW} onChange={(e) => setStudentPW(e.target.value)} type="password" placeholder="비밀번호를 입력하세요."></input>
                    </div>
                    <button className={css(styles.certificationButton)} onClick={oneClickTest} disabled={!agree}>재학생 인증</button>
                    <span className={css(styles.exception)}>가톨릭관동대 통합 로그인을 통해 학생인증이 진행됩니다. 약관 동의 후 인증을 진행해주세요.</span>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    certificationArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 0 0 0',
        gap: '65px',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
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
    ckuLoginLink: {
        textDecoration: 'none',
        color: '#7A828A',
        ':hover': {
            textDecoration: 'underline'
        },
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
        ':hover:not(:disabled)': {
            cursor: 'pointer',
            backgroundColor: '#2B2A28',
            color: '#FFFEFB',
            transitionDuration: '0.2s',
        },
        ':active:not(:disabled)': {
            backgroundColor: '#595650',
            border: '2px solid #595650',
            color: '#FFFEFB',
        },
        ':disabled': {
            color: '#CACACA',
            border: '2px solid #CACACA',
        },
    },
    exception: {
        margin: '0 0 118px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#006277',
    },
});

export default OneClickTestPage;