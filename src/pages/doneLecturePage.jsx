import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import DoneLectureComponents from '../components/doneLectureComponents';
import UploadPdfPageComponents from '../components/uploadPdfComponents';
import axios from 'axios';

function DoneLecturePage() {
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState(null);

  const SubjectSearch = async () => {
    setError(null);
    setSubjectData(null);
    try {
        const response = await axios.get('http://127.0.0.1:8000/');
        setSubjectData(response.data);
    } catch (error) {
      setError('과목 정보를 가져오는데 실패했습니다.');
      console.error('Error fetching data: ', error);
      alert('이건 백 만들고 해야할 것 같습니다.');
    }
  };

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
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                placeholder="과목 코드를 입력하세요"
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
              <button className={css(styles.itemSearchButton)} onClick={SubjectSearch}>검색</button>
            </div>
            <DoneLectureComponents/>
            <button className={css(styles.itemAddButton)}>추가하기</button>   
            <div className={css(styles.secondTitleContainer)}>
              <h2 className={css(styles.secondTitle)}>내 기이수 과목</h2>
              <button className={css(styles.itemSaveButton)}>저장하기</button>
            </div>
            <hr className={css(styles.second_custom_hr)}/>
            <button className={css(styles.itemGraduButton)}>졸업요건 검사</button>
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
  secondTitle: {
    //marginBottom: '5px',
    fontFamily: 'Lato',
    fontSize: '23px',
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
  second_custom_hr: {
    marginTop: '1px',
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
  itemAddButton: {
    marginTop: '30px',
    width: '70px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: 'black',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':hover': {
      outline: '1px solid black',
      backgroundColor: '#FFFFFF',
      color: 'black',
    }
  },
  secondTitleContainer: {
    width: '728px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSaveButton: {
    width: '70px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: 'black',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':hover': {
      outline: '1px solid black',
      backgroundColor: '#FFFFFF',
      color: 'black',
    }
  },
  itemGraduButton: {
    width: '10%',
    height: '50px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: '#006277',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':hover': {
      outline: '1px solid black',
      backgroundColor: '#FFFFFF',
      color: 'black',
    },
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600'
  },
});

export default DoneLecturePage;