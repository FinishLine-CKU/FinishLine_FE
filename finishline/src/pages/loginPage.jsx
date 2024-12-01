import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import logo2 from '../assets/images/logo2.png';
import axios from 'axios';

function LoginPage() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!studentId || !password) {
            alert('학번과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('/api/login/', { studentId, password });
            if (response.status === 200) {
                alert('로그인 성공!');
                navigate('/userGuide');
            } else {
                alert('로그인 실패. 학번 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            alert('서버와의 통신에 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className={css(styles.loginContainer)}>
            <Header />
            <main className={css(styles.loginMain)}>
                <img src={logo2} alt="Finish Line Icon" className={css(styles.welcomeIcon)} />
                <h1 className={css(styles.welcomeText)}>Welcome to Finish Line!</h1>
                <h2 className={css(styles.loginTitle)}>로그인</h2>
                <p className={css(styles.loginDescription)}>
                    Finish Line에 등록한 학번과 비밀번호를 입력해주세요.
                </p>
                <form className={css(styles.loginForm)} onSubmit={handleLogin}>
                    <label className={css(styles.formLabel)}>
                        학번
                        <input
                            type="text"
                            placeholder="학번을 입력하세요."
                            className={css(styles.formInput)}
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </label>
                    <label className={css(styles.formLabel, styles.passwordLabel)}>
                        비밀번호
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            className={css(styles.formInput)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* 비밀번호를 잊으셨나요? */}
                        <a href="/password-reset" className={css(styles.forgotPassword)}>
                            비밀번호를 잊으셨나요?
                        </a>
                    </label>
                    <button type="submit" className={css(styles.submitButton)}>
                        로그인
                    </button>
                </form>
                <div className={css(styles.registerSection)}>
                    <div className={css(styles.line)}></div>
                    <span className={css(styles.registerText)}>아직 회원이 아니신가요?</span>
                    <a href="회원가입" className={css(styles.registerLink)}>회원가입</a>
                    <div className={css(styles.line)}></div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        minHeight: '100vh',
        fontFamily: 'Lato',
        color: '#333',
        backgroundColor: '#FFFEFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
    },
    loginMain: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
    },
    welcomeIcon: {
        display: 'block',
        margin: '0 auto 0px',
        height: '130px',
    },
    welcomeText: {
        fontSize: '32px',
        marginBottom: '45px',
        marginTop: '0px',
    },
    loginTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    loginDescription: {
        fontSize: '13px',
        color: '#888888',
        marginBottom: '30px',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formLabel: {
        width: '100%',
        maxWidth: '400px',
        textAlign: 'left',
        fontWeight: 'normal',
        fontSize: '14px',
        marginBottom: '15px',
    },
    formInput: {
        width: '100%',
        padding: '12px',
        marginTop: '7px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '7px',
        boxSizing: 'border-box',
    },
    passwordLabel: {
        position: 'relative',
    },
    forgotPassword: {
        position: 'absolute',
        right: '0px',
        bottom: '-10px',
        color: '#006277',
        fontSize: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline',
        },
    },
    submitButton: {
        width: '100%',
        maxWidth: '400px',
        padding: '10px',
        backgroundColor: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '7px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '30px',
        boxSizing: 'border-box',
    },
    registerSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '35px',
        width: '100%',
    },
    line: {
        width: '90px',
        height: '1px',
        backgroundColor: '#cccccc',
        margin: '0 10px',
    },
    registerText: {
        color: '#888888',
        fontSize: '12px',
    },
    registerLink: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#006277',
        marginLeft: '10px',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'none',
        },
    },
});

export default LoginPage;
