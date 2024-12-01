// 회원탈퇴 되었습니다.


import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo2 from '../../assets/images/logo2.png';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={css(styles.overlay)}>
            <div className={css(styles.modal)}>
                <button className={css(styles.closeButton)} onClick={onClose}>×</button>
                <p className={css(styles.title)}>회원 탈퇴</p>
                <img src={logo2} className={css(styles.image)} alt="Finish Line Icon" />
                <p className={css(styles.message)}>회원 탈퇴 되었습니다.</p>
                <p className={css(styles.title)}>FINISH LINE 을 이용해주셔서 감사합니다.</p>
                <button className={css(styles.loginButton)} onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 흐림 효과
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        padding: '30px 20px',
        position: 'relative',
        width: '350px',
        maxWidth: '90%',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    title: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#2B2A28',
    },
    image: {
        width: '110px',
        height: '100px',

    },
    message: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#fffff',
        marginBottom: '25px',
    },
    loginButton: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '7px 30px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        marginTop: '10px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#333',
        },
    },
});

export default Modal;