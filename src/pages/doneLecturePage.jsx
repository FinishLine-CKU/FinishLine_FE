import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import UploadPdfPageComponents from '../components/uploadPdfComponents';

function DoneLecturePage() {
    return (
      <div>
        <Header />
        <Template title="기이수 과목 관리" />
        <div className={css(styles.container)}>
          <div className={css(styles.ColumnContainer)}>
          <div className={css(styles.titleContainer)}>
            <h2 className={css(styles.title)}>과목 직접 추가</h2>
            </div>
            <hr className={css(styles.custom_hr)}/>
            <p className={css(styles.small_title)}>과목코드로 검색</p>
            <div className={css(styles.textboxContainer)}>
              <input 
                type="text" 
                id="lectureCode" 
                name="Code" 
                style={{
                  width: '600px',
                  height: '30px', 
                  padding: '10px', 
                  fontFamily: 'Lato',
                  fontSize: '16px', 
                  border: '1px solid #CACACA', 
                  borderRadius: '4px', 
                  outline: 'none',
                  backgroundColor: 'transparent',
                }}/>
              <button className={css(styles.itemSearchButton)}>검색</button>
            </div>   
          </div>   
        </div>
        <UploadPdfPageComponents />
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '137px',
  },
  ColumnContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',    
    alignItems: 'center',
  },
  title: {
    marginBottom: '5px',
    fontFamily: 'Lato',
    fontSize: '23px',
    textAlign: 'left',
  },
  titleContainer: {
    width: '728px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom_hr: {
    width: '728px',
    border: '1px solid #E4E4E4',
  },
  small_title: {
    fontFamily: 'Lato',
    fontSize: '18px',
    textAlign: 'center',
    color: '#006277',
  },
  textboxContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',    
    justifyContent: 'center',
  },
  itemTextboxContainer: {
    width: '450px',
    height: '100px',
    border: '1px solid black',
    backgroundColor: 'transparent',
    borderRadius: '5px',
  },
  itemSearchButton: {
    border: '1px solid black',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'black',
    width: '70px',
    height: '50px',
    fontFamily: 'Lato',
    fontSize: '15px',
    marginLeft: '1%',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#444444',
      color: '#FFFEFB',
    }
  },
});

export default DoneLecturePage;