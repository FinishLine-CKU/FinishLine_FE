import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';

function UploadPdf() {
    return (
      <div>
        <Header />
        <Template title="기이수 과목 관리" />
        <div className={css(styles.container)}>
          <h2>기이수 과목 등록</h2>
        </div>
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  }
});

export default UploadPdf;