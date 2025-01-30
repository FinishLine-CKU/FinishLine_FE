import { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { IoClose } from "react-icons/io5";
import Symbol from '../assets/images/symbol.png';

function Modal() {
    const [modalState, setModalState] = useState(true);
    const openModal = () => {
        setModalState(true);
    };
    const closeModal = () => {
        setModalState(false);
    };

    return (
        <>
            <div className={css(styles.container)}>
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.closeButtonContainer)}>
                        <button className={css(styles.close)} onClick={closeModal}><IoClose className={css(styles.closeIcon)}/></button>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.infoMessage)}>로그인 안내</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <img src={Symbol} className={css(styles.contentImage)}></img>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.mainMessage)}>로그인이 필요한 서비스입니다.</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.contentMessage)}>학생 인증을 완료한 회원만 이용 가능합니다.<br />서비스 이용을 위해 로그인 해주세요.</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <button className={css(styles.mainButton)}>로그인</button>
                    </div>
                </div>
            </div>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        paddingBottom: '50px',
        backgroundColor: '#FFFEFB',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid #7A828A',
        borderRadius: '6px'
    },
    closeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    close: {
        border: 'none',
        backgroundColor: 'transparent',
        paddingTop: '15px',
        paddingRight: '15px'
    },
    closeIcon: {
        width: '30px',
        height: '30px',
        
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    arrayContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    infoMessage: {
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '800',
        color: '#2B2A28'
    },
    contentImage: {
        marginTop: '25px',
        marginBottom: '15px',
        width: '90px',
    },
    mainMessage: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '700',
        color: '#000'
    },
    contentMessage: {
        marginTop: '20px',
        marginBottom: '40px',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        color: '#2B2A28'
    },
    mainButton: {
        width: '115px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#2B2A28',
        border: '1px solid #2B2A28',
        color: '#fff',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
    }
});

export default Modal;