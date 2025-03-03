import { useState, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { IoClose } from 'react-icons/io5';
import { ModalContext } from '../utils/hooks/modalContext';
import FeatureModal from '../components/featureModal';
import Modal from '../components/modal'; 
import axios from 'axios';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';
import loading from '../assets/images/loading.gif';
import Symbol from '../assets/images/symbol.png'

function PasswordResetModal() {
    // 모달 단계 1 = 학생인증, 2 = 처리중, 3 = 비밀번호변경입력, 4 = 변경완료
    const [step, setStep] = useState(1);
    
    const [studentId, setStudentId] = useState('');
    const [studentPW, setStudentPW] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const { 
        setFeatButtonState, 
        openFeatModal, 
        closeFeatModal,
        setFeatCloseButton 
    } = useContext(ModalContext);

    const closeAuthModal = () => {
        if (typeof window.closePasswordResetModal === 'function') {
            window.closePasswordResetModal();
        }
    };

    const requestStudentAuth = async () => {
        if (studentId === '' || studentPW === '') {
            alert("가톨릭관동대 포털 아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }
    
        setStep(2);  
        
        setFeatButtonState(false); 
        setFeatCloseButton(false);  
        openFeatModal();  
    
        try {

            const authResponse = await axios.post('http://127.0.0.1:8000/user/student_auth/', {
                studentId: studentId,
                studentPW: studentPW,
                isPasswordReset: true  
            });
    
            if (authResponse.data.student_id && authResponse.data.name) {
                try {

                    const userCheckResponse = await axios.post('http://127.0.0.1:8000/user/change_pw/', {
                        studentId: studentId,
                        password: 'temporary_check_password'
                    });
                    
                    if (userCheckResponse.data.success) {
                        closeFeatModal();
                        setStep(3); 
                    } else {
                        closeFeatModal();
                        setStep(1);
                        alert("회원가입된 유저가 아닙니다. 회원가입을 해주세요.");
                    }
                } catch (error) {
                    closeFeatModal();
                    setStep(1);
                    alert("회원가입된 유저가 아닙니다. 회원가입을 해주세요.");
                    console.error("User check error:", error);
                }
            } else {
                closeFeatModal();
                setStep(1); 
                alert(authResponse.data.error || "학생 인증에 실패했습니다.");
            }
        } catch (error) {
            closeFeatModal();
            setStep(1);  
            alert("인증과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            console.error("Student auth error:", error);
        }
    };

    const isValidPassword = (password) => {
        if (password.length < 8 || password.length > 20) {
            return false;
        }
        
        if (!/[a-z]/.test(password)) {
            return false;
        }
        
        if (!/[0-9]/.test(password)) {
            return false;
        }
        
        if (!/[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return false;
        }
        
        return true;
    }

    const resetPassword = async () => {
        if (newPassword === '' || confirmPassword === '') {
            alert("새 비밀번호와 확인을 모두 입력해주세요.");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호와 확인이 일치하지 않습니다.");
            return;
        }
    
        if (!isValidPassword(newPassword)) {
            alert("비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함한 8~20자로 입력해주세요.");
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/user/change_pw/', {
                studentId: studentId,
                password: newPassword
            });
    
            if (response.data.success) {
                setStep(4);
            } else {
                alert(response.data.error || "비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            alert("비밀번호 변경 과정에서 오류가 발생했습니다.");
            console.error("Password reset error:", error);
        }
    };

    if (step === 1) {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.modalContent)}>
                        <div className={css(styles.modalHeader)}>
                            <span className={css(styles.modalTitle)}>학생 인증</span>
                            <button className={css(styles.close)} onClick={closeAuthModal}>
                                <IoClose className={css(styles.closeIcon)}/>
                            </button>
                        </div>
                        
                        <div className={css(styles.logoContainer)}>
                            <img src={whiteCKULogo} className={css(styles.univLogo)} alt="CKU Logo" />
                        </div>
                        
                        <div className={css(styles.instructionContainer)}>
                            <span className={css(styles.instruction)}>
                                가톨릭관동대학교 포털 아이디와 비밀번호를 입력해주세요.
                            </span>
                        </div>
                        
                        <form 
                            className={css(styles.inputContainer)} 
                            onSubmit={(e) => {
                                e.preventDefault(); 
                                requestStudentAuth();
                            }}
                        >
                            <label className={css(styles.inputLabel)}>아이디</label>
                            <input 
                                className={css(styles.inputField)} 
                                value={studentId} 
                                onChange={(e) => setStudentId(e.target.value)} 
                                type="text" 
                                placeholder="아이디를 입력하세요."
                            />
                            
                            <label className={css(styles.inputLabel)}>비밀번호</label>
                            <input 
                                className={css(styles.inputField)} 
                                value={studentPW} 
                                onChange={(e) => setStudentPW(e.target.value)} 
                                type="password" 
                                placeholder="비밀번호를 입력하세요."
                            />
                            
                            <button 
                                type="submit" 
                                className={css(styles.authButton)}
                            >
                                재학생 인증
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
    if (step === 2) {
        return (
            <div className={css(styles.container)}>
                <FeatureModal closeAction={closeFeatModal} mainContents={
                    <div className={css(styles.featureModalContent)}>
                        <div className={css(styles.icons)}>
                            <img src={whiteCKULogo} className={css(styles.ckuLogo)}/>
                            <img src={loading} className={css(styles.loadingGIF)}/>
                        </div>
                        <div className={css(styles.modalTitleContainer)}>
                            <span className={css(styles.featureModalTitle)}>재학생 확인 중...</span>
                        </div>
                        <div className={css(styles.infoMessageContainer)}>
                            <span className={css(styles.infoMessage)}>5초 정도 소요됩니다. 잠시만 기다려주세요.</span>
                        </div>
                    </div>
                }/>
            </div>
        );
    }
    
    if (step === 3) {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.changePasswordModalContainer)}>
                    <div className={css(styles.changePasswordContent)}>
                        <div className={css(styles.modalHeader)}>
                            <span className={css(styles.modalTitle)}>비밀번호 변경</span>
                            <button className={css(styles.close)} onClick={closeAuthModal}>
                                <IoClose className={css(styles.closeIcon)}/>
                            </button>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault(); 
                            resetPassword();
                        }}>
                            <div className={css(styles.changePasswordInputGroup)}>
                                <label className={css(styles.changePasswordLabel)}>변경할 비밀번호 입력</label>
                                <input 
                                    className={css(styles.changePasswordInput)} 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="영문 대/소문자, 숫자, 특수문자 포함(8~20자)"
                                />
                            </div>
                            
                            <div className={css(styles.changePasswordInputGroup)}>
                                <label className={css(styles.changePasswordLabel)}>비밀번호 확인</label>
                                <input 
                                    className={css(styles.changePasswordInput)} 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="영문 대/소문자, 숫자, 특수문자 포함(8~20자)"
                                />
                            </div>
                            
                            <div className={css(styles.changePasswordButtonContainer)}>
                                <button 
                                    type="submit"
                                    className={css(styles.changePasswordSubmitButton)}
                                >
                                    저장
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 4) {
        setTimeout(() => {
            const handleEnter = (e) => {
                if (e.key === 'Enter') {
                    closeAuthModal();
                    window.removeEventListener('keydown', handleEnter);
                }
            };
            window.addEventListener('keydown', handleEnter);
        }, 100);
        
        return (
            <Modal
                infoMessage="비밀번호 변경"
                infoSymbol={Symbol} 
                mainMessage="비밀번호가 재설정 되었습니다."
                mainButton="확인"
                mainButtonAction={closeAuthModal}
                closeButton={closeAuthModal}
            />
        );
    }  

    return null;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: '999',
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '530px',
        backgroundColor: '#FFFEFB',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid #7A828A',
        borderRadius: '6px',
        zIndex: '1000',
    },
    closeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '35px'
    },
    close: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeIcon: {
        width: '30px',
        height: '30px',
        ':hover': {
            cursor: 'pointer'
        }
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 56px 55px 56px',
        maxWidth: '500px', 
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px',
        marginBottom: '-20px',
    },
    modalTitle: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '700',
        color: '#2B2A28',
    },
    logoContainer: {
        marginBottom: '20px',
    },
    univLogo: {
        width: '134px',
        height: '134px',
        marginBottom: '-30px',
    },
    instructionContainer: {
        width: '95%',
        textAlign: 'center',
        marginBottom: '28px',
        marginTop: '15px',
        maxWidth: '380px',
    },
    instruction: {
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        color: '#3f8998',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        padding: '0 10px',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: '-18px',
    },
    inputLabel: {
        margin: '0 0 8px 0',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#2B2A28',
    },
    inputField: {
        margin: '0 0 24px 0',
        padding: '0 0 0 15px',
        width: '100%',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        boxSizing: 'border-box',
        ':focus': {
            outline: '1px solid #2B2A28',
        }
    },
    authButton: {
        width: '100%',
        height: '48px',
        border: '2px solid #2B2A28',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
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
    featureModalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        width: '100%'
    },
    ckuLogo: {
        width: '168px'
    },
    loadingGIF: {
        position: 'absolute',
        zIndex: '1001',
        width: '177px',
        marginTop: '40px',
        marginLeft: '90px'
    },
    modalTitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '30px 0 20px 0'
    },
    featureModalTitle: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '30px',
        color: '#2B2A28'
    },
    infoMessageContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '80px'
    },
    infoMessage: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#006277'
    },
    changePasswordModalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '550px',
        height: '365px',
        backgroundColor: '#FFFEFB',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: '1000',
        overflow: 'hidden',
    },
    changePasswordModalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #EEEEEE',
    },
    changePasswordModalTitle: {
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '600',
        color: '#000000',
    },
    changePasswordContent: {
        padding: '20px 60px',
    },
    changePasswordInputGroup: {
        marginBottom: '20px',
    },
    changePasswordLabel: {
        display: 'block',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: '8px',
        marginTop: '30px',
 
    },
    changePasswordInput: {
        width: '100%',
        height: '40px',
        padding: '0 12px',
        border: '1px solid #DDDDDD',
        borderRadius: '4px',
        fontFamily: 'Lato',
        fontSize: '14px',
        boxSizing: 'border-box',
        ':focus': {
            outline: 'none',
            border: '1px solid #999999',
        },
        '::placeholder': {
            color: '#AAAAAA',
            fontSize: '12px',
        }
    },
    changePasswordButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
    },
    changePasswordSubmitButton: {
        width: '75px',
        height: '36px',
        backgroundColor: '#333333',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: '500',
        marginTop: '10px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#555555',
        },
        ':active': {
            backgroundColor: '#222222',
        }
    }
});

export default PasswordResetModal;