import { StyleSheet } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';

function DoneLecture() {
    return (
      <div>
        <Header />
        <Template title="기이수 과목 관리" />
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({
    
});

export default DoneLecture;