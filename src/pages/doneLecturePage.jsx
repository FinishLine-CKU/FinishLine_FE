import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import { SubSearchComponents, DoneSubComponents } from '../components/doneLectureComponents';
import UploadPdfPageComponents from '../components/uploadPdfComponents';
import axios from 'axios';

function DoneLecturePage() {

  const initialLectureInfo =
    [{ year: 2025, semester: 1, sub_code: '402807-001', sub_name: '임상실습전교육(ICM)II(CPX+OSCE+CPX/OSCE시험)', sub_area: '전필', sub_sub: '', credit: 3 }];
    
  const initialMyLectureList = [
    { year: 2018, semester: 1, sub_code: '010064-024', sub_name: '대학영어I', sub_area: '교필', sub_sub: '대학외국어1', credit: 2 },
    { year: 2024, semester: 1, sub_code: '020217-001', sub_name: '생활속의교통', sub_area: '교선', sub_sub: '인간과문학', credit: 2 },
    { year: 2024, semester: 1, sub_code: '408140-001', sub_name: '안경조제가공학및실습Ⅲ', sub_area: '전선', sub_sub: '', credit: 3 },
    { year: 2018, semester: 1, sub_code: '010119-003', sub_name: '논리적사고와글쓰기', sub_area: '교필', sub_sub: '논리적사고와글쓰기', credit: 2 },
    { year: 2024, semester: 1, sub_code: '024705-001', sub_name: '교양인을위한기초대학수학', sub_area: '교선', sub_sub: '균형3', credit: 2 },
    { year: 2024, semester: 1, sub_code: '742534-002', sub_name: '오라클중심의데이터베이스와실습', sub_area: '전선', sub_sub: '', credit: 3 }];

  const [lectureCode, setLectureCode] = useState('');
  const [lectureData, setLectureData] = useState(initialLectureInfo);
  const [error, setError] = useState(null);
  const [myLectureList, setMyLectureList] = useState(initialMyLectureList);

  const deleteButton = (sub_code, listType) => {
    if (listType === 'lectureData') {
      const updatedSubjects = lectureData.filter(subject => subject.sub_code !== sub_code);
      setLectureData(updatedSubjects);
    } else if (listType === 'myLectureList') {
      const updatedMyLectures = myLectureList.filter(subject => subject.sub_code !== sub_code);
      setMyLectureList(updatedMyLectures);
    }
  };

  const handleAddSubject = () => {
    setMyLectureList((prevSubjects) => {
      if (prevSubjects.some((subject) => subject.sub_code === lectureData[0].sub_code)) {
        alert('이미 추가된 과목입니다.');
        return prevSubjects;
      }
  
      const updatedSubjects = [...prevSubjects, { ...lectureData[0], isNew: true }];
  
      return updatedSubjects;
    });
  };

  const SubjectSearch = async () => {
    setError(null);
    try {
        const response = await axios.get(`http://127.0.0.1:8000/lectures?code=${lectureCode}`);
        setLectureData(response.data);
    } catch (error) {
      setError('과목 정보를 가져오는데 실패했습니다.');
      console.error('Error fetching data: ', error);
      alert('과목코드를 입력하고 다시 시도하세요.');
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
                value={lectureCode}
                onChange={(e) => setLectureCode(e.target.value)}
                placeholder="과목 코드를 입력하세요"
                className={css(styles.inputContainer)}/>
              <button className={css(styles.itemSearchButton)} onClick={SubjectSearch}>검색</button>
            </div>
            <div className={css(styles.tableContainer)}>
              {lectureData && lectureData.length > 0 ? (
              <SubSearchComponents subjects={lectureData}  onAdd={handleAddSubject} />
              ) : 
              (<div className={css(styles.tableEmptyContainer)}>
              </div>)}
            </div>
            <div className={css(styles.secondTitleContainer)}>
              <h2 className={css(styles.secondTitle)}>내 기이수 과목</h2>
              <button className={css(styles.itemSaveButton)}>저장하기</button>
            </div>
            <hr className={css(styles.second_custom_hr)}/>
            <div className={css(styles.tableContainerSecond)}>
                <DoneSubComponents subjects={myLectureList} onDelete={(sub_code) => deleteButton(sub_code, 'myLectureList')} />
            </div>
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
    marginBottom: '50px',
  },
  ColumnContainer: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',    
    alignItems: 'center',
  },
  tableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '424px',
    height: '27px', 
    padding: '10px',
    paddingLeft: '16px', 
    fontFamily: 'Lato',
    fontSize: '16px', 
    border: '1px solid #CACACA', 
    borderRadius: '4px', 
    outline: 'none',
    backgroundColor: 'transparent',
  },
  tableContainerSecond: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: '5px',
    fontFamily: 'Lato',
    fontSize: '23px',
    textAlign: 'left',
  },
  secondTitle: {
    fontFamily: 'Lato',
    fontSize: '23px',
  },
  titleContainer: {
    width: '520px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom_hr: {
    width: '520px',
    border: '1px solid #E4E4E4',
  },
  second_custom_hr: {
    marginTop: '1px',
    marginBottom: '32px',
    width: '520px',
    border: '1px solid #E4E4E4',
  },
  small_title: {
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#006277',
  },
  textboxContainer: {
    marginTop: '10px',
    marginBottom: '40px',
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
    width: '81px',
    height: '46px',
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    marginLeft: '15px',
    cursor: 'pointer',
  },
  itemAddButton: {
    marginTop: '30px',
    marginBottom: '70px',
    width: '70px',
    height: '25px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: 'black',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':active': {
        backgroundColor: '#595650',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '600',
  },
  secondTitleContainer: {
    width: '520px',
    height: '54px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSaveButton: {
    width: '70px',
    height: '25px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: 'black',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#595650',
    },
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '600',
  },
  itemGraduButton: {
    width: '165px',
    height: '49px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: '#006277',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#004c56',
    },
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '32px',
  },
});

export default DoneLecturePage;