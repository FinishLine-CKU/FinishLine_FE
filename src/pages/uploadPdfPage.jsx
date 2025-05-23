import { useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from '../components/header';
import Footer from '../components/footer';
import UploadPdfPageComponents from '../components/uploadPdfComponents';

function UploadPdfPage() {

    useEffect(() => {
        alert('기이수과목 등록은 꼭 PC환경에서 진행해주세요!');
    }, []);

    return (
        <div className={css(styles.container)}>
            <Header />
            <Template title="기이수 과목 관리" />
            <div className={css(styles.columnContainer)}>
                <UploadPdfPageComponents />
            </div>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    columnContainer: {
        marginBottom: '350px',
    },
});

export default UploadPdfPage;