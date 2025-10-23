import { StyleSheet, css } from 'aphrodite';
import { IoClose } from 'react-icons/io5';

function DetailModal({ closeButton, detailModalTitle, detailMainContents }) {

    return (
        <>
            <div className={css(styles.container)}>
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.closeButtonContainer)}>
                        <span className={css(styles.modalTitle)}>{detailModalTitle}</span>
                        <button className={css(styles.close)} onClick={closeButton}><IoClose className={css(styles.closeIcon)} /></button>
                    </div>
                    <div className={css(styles.mainContents)}>
                        {detailMainContents}
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
        zIndex: '999'
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '1076px',
        backgroundColor: '#FFFEFB',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        border: '1px solid #7A828A',
        borderRadius: '6px',
        zIndex: '1000',
    },
    closeButtonContainer: {
        display: 'flex',
        padding: '25px 40px 25px 40px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E0E0E0'
    },
    modalTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '26px',
        color: '#2B2A28'
    },
    close: {
        display: 'flex',
        border: 'none',
        backgroundColor: 'transparent'
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
        padding: '25px 40px 30px 40px'
    },
});

export default DetailModal;