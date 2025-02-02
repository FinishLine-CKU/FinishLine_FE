import { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { IoClose } from 'react-icons/io5';
import { ModalContext } from '../utils/hooks/modalContext';

function FeatureModal({closeAction, title, mainContents, buttonText, buttonAction, disButton}) {
    const { featButtonState, featCloseButton } = useContext(ModalContext);

    return (
        <>
            <div className={css(styles.container)}>
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.closeButtonContainer)}>
                        <span className={css(styles.title)}>{title}</span>
                        {featCloseButton ?
                        <button className={css(styles.close)} onClick={closeAction}><IoClose className={css(styles.closeIcon)}/></button>
                        : <span></span>}
                    </div>
                    <div className={css(styles.mainContents)}>
                    {mainContents}
                    </div>
                    {featButtonState ? 
                    <div className={css(styles.ActionButtonContainer)}>
                        <button className={css(styles.actionButton)} disabled={disButton ? true : undefined} onClick={buttonAction}>{buttonText}</button>
                    </div>
                    : null}
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
        width: '420px',
        padding: '50px 70px 50px 70px',
        backgroundColor: '#FFFEFB',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid #7A828A',
        borderRadius: '6px',
        zIndex: '1000',
    },
    closeButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '800',
        color: '#2B2A28'
    },
    close: {
        border: 'none',
        backgroundColor: 'transparent',
        padding: '0px',
        marginRight: '-20px',
    },
    closeIcon: {
        width: '30px',
        height: '30px',
        ':hover': {
            cursor: 'pointer'
        }
    },
    mainContents: {
        display: 'flex',
        justifyContent: 'center',
    },
    ActionButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '10px'
    },
    actionButton: {
        width: '83px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: '#2B2A28',
        border: '1px solid #2B2A28',
        color: '#fff',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
        marginRight: '-20px',
        ':hover:not(:disabled)': {
            cursor: 'pointer'
        },
        ':active:not(:disabled)': {
            backgroundColor: '#595650',
            borderColor: '#595650'
        },
        ':disabled':{
            color: '#FFFEFB',
            backgroundColor: '#CACACA',
            borderColor: '#CACACA'
        },
    }
});

export default FeatureModal;