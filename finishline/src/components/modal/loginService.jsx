import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo2 from '../../assets/images/logo2.png';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className={css(styles.overlay)}>
            <div className={css(styles.modal)}>
                <button className={css(styles.closeButton)} onClick={onClose}>×</button>
                <p className={css(styles.title)}>로그인 안내</p>
                <img src={logo2} className={css(styles.image)} alt="Finish Line Icon" />
                <p className={css(styles.message)}>로그인이 필요한 서비스 입니다.</p>
                <p className={css(styles.subtitle)}>
                    <span className={css(styles.bold)}>학생 인증을 완료한 회원</span>만 이용 가능합니다.<br />
                    서비스 이용을 위해 로그인 해주세요.
                </p>
                <button className={css(styles.loginButton)} onClick={onClose}>닫기</button>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        fontSize: '16px', // 제목의 글꼴 크기를 키움
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#2B2A28',
    },
    subtitle: {
        fontSize: '14px', // 서브 타이틀 글꼴 크기를 약간 키움
        fontWeight: 'normal',
        marginBottom: '20px',
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
    image: {
        width: '110px',
        height: '100px',
        marginBottom: '15px', // 이미지와 텍스트 간격 조정
    },
    message: {
        fontSize: '18px', // 메시지 글꼴 크기 줄임
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    loginButton: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 20px', // 버튼 크기 조정
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#333',
        },
    },
});

export default Modal;