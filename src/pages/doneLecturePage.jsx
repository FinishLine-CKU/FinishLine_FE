import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import { SubSearchComponents, DoneSubComponents } from '../components/doneLectureComponents';
import UploadPdfPageComponents from '../components/uploadPdfComponents';
import axios from 'axios';

function DoneLecturePage() {

  const [lectureCode, setLectureCode] = useState('');
  const [lectureData, setLectureData] = useState([]);
  const [error, setError] = useState(null);
  const [myLectureList, setMyLectureList] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const deleteButton = (lecture_code, listType) => {
    if (listType === 'lectureData') {
      const updatedSubjects = lectureData.filter(subject => subject.lecture_code !== lecture_code);
      setLectureData(updatedSubjects);
    } else if (listType === 'myLectureList') {
      const updatedMyLectures = myLectureList.filter(subject => subject.lecture_code !== lecture_code);
      setMyLectureList(updatedMyLectures);
    }
  };

  const handleAddSubject = () => {
    const isDuplicate = myLectureList.some((subject) => subject.lecture_code === lectureData[0].lecture_code);
  
    if (isDuplicate) {
      alert(`${lectureData[0].lecture_name} 과목은 이미 추가되었습니다.`);
      return;
    }
  
    setMyLectureList((prevSubjects) => [...prevSubjects, { ...lectureData[0], isNew: true }]);
    setFilteredSubjects([0]);
  };

  const SubjectSearch = async () => {
    setError(null);
    setLectureData([]);

    try {
        const response = await axios.get(`http://127.0.0.1:8000/graduation/api/nowLectureData/filter-by-code/${lectureCode}/`);
        setLectureData(response.data);
    } catch (error) {
        setError('과목 정보를 가져오는데 실패했습니다.');
        console.error('Error fetching data: ', error);
        alert('과목코드를 입력하고 다시 시도하세요.');
    }
};

  const myLectureUpdate = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/graduation/api/mydonelecture`);
      setMyLectureList(response.data);
    } catch (error) {
      setError('과목 정보를 가져오는데 실패했습니다.');
      console.error('Error fetching data: ', error);
    }
  }

  const handleSaveAllSubjects = async () => {
    try {
      const newSubjects = myLectureList.filter(subject => subject.isNew);
  
      if (newSubjects.length === 0) {
        alert("새로운 과목이 없습니다.");
        return;
      }

      const subjectsToSave = newSubjects.map(subject => ({
        year: subject.year,
        semester: subject.semester,
        lecture_code: subject.lecture_code,
        lecture_type: subject.lecture_type,
        lecture_topic: subject.lecture_topic,
        lecture_name: subject.lecture_name,
        credit: subject.credit,
        grade: subject.grade,
      }));
  
      const response = await fetch("http://127.0.0.1:8000/graduation/api/mydonelecture/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subjectsToSave),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("서버 응답:", errorText);
        throw new Error("과목 저장에 실패했습니다.");
      }
  
      alert("새로운 과목이 성공적으로 저장되었습니다.");
  
      setMyLectureList(prev => 
        prev.map(subject => ({ ...subject, isNew: false }))
      );
  
    } catch (error) {
      console.error("Error:", error);
      alert("과목 저장 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    myLectureUpdate();
  }, []);

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
              <button className={css(styles.itemSaveButton)} onClick={handleSaveAllSubjects}>저장하기</button>
            </div>
            <hr className={css(styles.second_custom_hr)}/>
            <div className={css(styles.tableContainerSecond)}>
                <DoneSubComponents subjects={myLectureList} onDelete={(lecture_code) => deleteButton(lecture_code, 'myLectureList')} />
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