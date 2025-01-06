import { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Template from "../components/template";
import Footer from "../components/footer";

function LoginPage() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (studentId && password) {
            navigate("/dashboard");
        } else {
            alert("학번과 비밀번호를 모두 입력해주세요.");
        }
    };

    return (
        <div className={css(styles.pageContainer)}>
            <Header />
            <Template title="Welcome to Finish Line!" subtitle="" />
            <main className={css(styles.loginContainer)}>
                <div className={css(styles.loginContent)}>
                    <h1 className={css(styles.loginTitle)}>로그인</h1>
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
                        <a href="/signupPage1" className={css(styles.registerLink)}>회원가입</a>
                        <div className={css(styles.line)}></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        minHeight: '122vh',
        display: 'flex',
        flexDirection: 'column',
    },
    loginContainer: {
        flex: '1',
        fontFamily: 'Lato',
        color: '#333',
        backgroundColor: '#FFFEFB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
    },
    loginContent: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px 20px',
    },
    loginTitle: {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    loginDescription: {
        fontSize: '15px',
        color: '#888888',
        marginBottom: '50px',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    formLabel: {
        width: '112%',
        textAlign: 'left',
        fontSize: '14px',
        marginBottom: '15px',
    },
    formInput: {
        width: '100%',
        padding: '14px',
        marginTop: '7px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '7px',
        boxSizing: 'border-box',
        ':focus': {
            outline: '1px solid #2B2A28',
        }
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
        width: '112%',
        padding: '12px',
        backgroundColor: '#2B2A28',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '30px',
        boxSizing: 'border-box',
        ':active': {
            backgroundColor: '#595650',
        }
    },
    registerSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '35px',
        width: '117%',
        flexWrap: 'nowrap',
        marginLeft: '-34px',
    },
    line: {
        flexGrow: '1',
        height: '1px',
        backgroundColor: '#cccccc',
        margin: '0 10px',
    },
    registerText: {
        color: '#888888',
        fontSize: '12px',
        whiteSpace: 'nowrap',
    },
    registerLink: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#006277',
        marginLeft: '10px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ':hover': {
            textDecoration: 'none',
        },
    },
});

export default LoginPage;
