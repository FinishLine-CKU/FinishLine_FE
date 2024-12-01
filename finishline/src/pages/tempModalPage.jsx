// src/pages/ModalTestPage.js

import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Modal from '../components/modal/signUp'; // 모달 컴포넌트 import

const ModalTestPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={css(styles.container)}>
            <h1 className={css(styles.pageTitle)}>모달 테스트</h1>
            <button className={css(styles.openButton)} onClick={openModal}>
                모달 열기
            </button>
            {/* 모달 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    pageTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    openButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#0056b3',
        },
    },
});

export default ModalTestPage;
