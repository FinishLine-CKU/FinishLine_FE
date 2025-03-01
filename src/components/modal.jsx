import { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { IoClose } from 'react-icons/io5';
import { ModalContext } from '../utils/hooks/modalContext';

function Modal({ infoMessage, infoSymbol, mainMessage, contentMessage, mainButton, mainButtonAction, subButton, closeButton }) {
    const { subButtonState } = useContext(ModalContext);

    return (
        <>
            <div className={css(styles.container)}>
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.closeButtonContainer)}>
                        <button className={css(styles.close)} onClick={closeButton}><IoClose className={css(styles.closeIcon)} /></button>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.infoMessage)}>{infoMessage}</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <img src={infoSymbol} className={css(styles.contentImage)}></img>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.mainMessage)}>{mainMessage}</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        <span className={css(styles.contentMessage)}>{contentMessage}</span>
                    </div>
                    <div className={css(styles.arrayContainer)}>
                        {subButtonState ?
                            <button className={css(styles.subButton)}>{subButton}</button>
                            : null}
                        <button className={css(styles.mainButton)} onClick={mainButtonAction}>{mainButton}</button>
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
        width: '500px',
        paddingBottom: '50px',
        backgroundColor: '#FFFEFB',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid #7A828A',
        borderRadius: '6px',
        zIndex: '1000',
    },
    closeButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    close: {
        border: 'none',
        backgroundColor: 'transparent',
        paddingTop: '15px',
        paddingRight: '15px',
    },
    closeIcon: {
        width: '30px',
        height: '30px',
        ':hover': {
            cursor: 'pointer'
        }
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    arrayContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
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
        ':hover': {
            cursor: 'pointer'
        },
        ':active': {
            backgroundColor: '#595650',
            borderColor: '#595650'
        }
    },
    subButton: {
        width: '115px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#FFFEFB',
        border: '1.5px solid #000',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
        ':hover': {
            cursor: 'pointer'
        },
    }
});

export default Modal;