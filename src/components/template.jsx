import { StyleSheet, css } from 'aphrodite';
import Symbol from '../assets/images/symbol.png';

function Template({title, subtitle}) {
    return (
        <div className={css(styles.templateContainer)}>
            <img src={Symbol} className={css(styles.symbolIcon)} alt="FinishLine Symbol Icon"></img>
            <span className={css(styles.pageTitle)}>{title}</span>
            <span className={css(styles.subTitle)}>{subtitle}</span>
        </div>
    )
};

const styles = StyleSheet.create({
    templateContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFEFB',
    },
    symbolIcon: {
        width: '90px',
        margin: '10px 0 5px 0',
    },
    pageTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '30px',
        color: '#2B2A28',
    },
    subTitle: {
        margin: '15px 0 0 0',
        color: '#7A828A',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
    },
});

export default Template;