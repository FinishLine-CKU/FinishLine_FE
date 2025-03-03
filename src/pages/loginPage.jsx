import { useState, useEffect, useContext } from 'react';
import { StyleSheet, css } from "aphrodite";
import { useNavigate } from "react-router-dom";
import { ModalContext } from '../utils/hooks/modalContext';
import axios from 'axios';
import Header from "../components/header";
import Template from "../components/template";
import Footer from "../components/footer";
import Modal from '../components/modal';
import PasswordResetModal from '../components/passwordResetModal'; 
import Symbol from '../assets/images/symbol.png';

function LoginPage() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [showPasswordReset, setShowPasswordReset] = useState(false); 
    const navigate = useNavigate();
    const { 
        modalState, 
        closeModal, 
    } = useContext(ModalContext);

    const checkRegister = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/check_register/', {
                studentId : studentId,
                password : password
            });

            if (response.data.error) {
                alert(response.data.error);
                return;
            }

            if (response.data.idToken && response.data.name) {
                const { idToken, name, testing, uploadPDF, needEsseCredit, needChoiceCredit, need_sub_major, needNormalTotalCredit, needTotalCredit } = response.data;
                localStorage.setItem('idToken', idToken);
                localStorage.setItem('name', name);

                if (testing) {
                    localStorage.setItem('testing', true);
                };
                if (uploadPDF === true) {
                    localStorage.setItem('uploadPDF', true);
                };
                if (needEsseCredit) {
                    localStorage.setItem('needEsseCredit', needEsseCredit);
                };
                if (needChoiceCredit) {
                    localStorage.setItem('needChoiceCredit', needChoiceCredit);
                };
                if (need_sub_major) {
                    localStorage.setItem('need_sub_major', need_sub_major);
                };
                if (needNormalTotalCredit) {
                    localStorage.setItem('needNormalTotalCredit', needNormalTotalCredit);
                };
                if (needTotalCredit) {
                    localStorage.setItem('needTotalCredit', needTotalCredit);
                };
                navigate("/userGuidePage");
                window.scrollTo(0, 0);
            } 
        } 
        catch (error) {
            alert("로그인에 실패했습니다. 학번과 비밀번호를 확인해주세요.");
        };
    };

    const navigateLoginPage = () => {
        document.body.style.overflow = 'auto';
        navigate('/loginPage');
        closeModal();
    };

    const checkInput = (e) => {
        e.preventDefault();
        if (studentId && password) {
            checkRegister();
        } else {
            alert("학번과 비밀번호를 모두 입력해주세요.");
        };
    };

    const openPasswordResetModal = (e) => {
        e.preventDefault(); 
        setShowPasswordReset(true);
    };

    const closePasswordResetModal = () => {
        setShowPasswordReset(false);
    };

    useEffect(() => {
        window.closePasswordResetModal = closePasswordResetModal;
        
        return () => {
            delete window.closePasswordResetModal;
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('idToken')) {
            navigate("/userGuidePage");
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {modalState ? 
            <Modal 
                infoMessage="로그인 안내" 
                infoSymbol={Symbol} 
                mainMessage="로그인이 필요한 서비스입니다." 
                contentMessage={<><b>학생 인증을 완료한 회원</b>만 이용 가능합니다.<br />서비스 이용을 위해 로그인 해주세요.</>} 
                mainButton="로그인" 
                mainButtonAction={navigateLoginPage} 
                closeButton={closeModal} 
            />
            : null}

            {showPasswordReset && <PasswordResetModal onClose={closePasswordResetModal} />}
            
            <div className={css(styles.pageContainer)}>
                <Header />
                <Template title="Welcome to Finish Line!" subtitle="" />
                <main className={css(styles.loginContainer)}>
                    <div className={css(styles.loginContent)}>
                        <h1 className={css(styles.loginTitle)}>로그인</h1>
                        <p className={css(styles.loginDescription)}>
                            Finish Line에 등록한 학번과 비밀번호를 입력해주세요.
                        </p>
                        <form className={css(styles.loginForm)} onSubmit={checkInput}>
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
                                <button 
                                    onClick={openPasswordResetModal} 
                                    className={css(styles.forgotPassword)}
                                    type="button" // form 제출 방지
                                >
                                    비밀번호를 잊으셨나요?
                                </button>
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
        </>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        minHeight: '122px',
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
        marginBottom: '100px',
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
        fontWeight: '500',
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
        fontFamily: 'Lato',
        marginBottom: '15px',
    },
    formInput: {
        width: '100%',
        height: '46px',
        paddingLeft: '15px',
        marginTop: '7px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '7px',
        boxSizing: 'border-box',
        fontSize: '15px',
        fontWeight: '500',
        fontFamily: 'Lato',
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
        fontWeight: '600',
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
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
        fontSize: '13px',
        fontWeight: '500',
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