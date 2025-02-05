import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import GraduChartComponets from "../components/graduChartComponents";
import notgood from "../assets/images/notgood.png";
import sogood from "../assets/images/sogood.png";
import { useState } from 'react';
import axios from 'axios';

function GraduTestPage() {

  const [error, setError] = useState(null);
  const [myMajor, setMyMajor] = useState("");
  const [major, setMajor] = useState("");
  const [myliber, setMyliber] = useState("");
  const [liber, setliber] = useState("");
  const [nomal, setNomal] = useState("");
  const [myNomal, setMyNomal] = useState("");

  const myMajorCal = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/graduation/api/졸업요건`);
      const data = response.data
      setMajor(data.전공);
      setliber(data.교양);
      setNomal(data.일반선택);
    } catch {
      console.error('Error fetching data: ', error);
      alert(`정보를 가져오는데 실패하였습니다`);
    }
  };

  const myInfoCal = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/graduation/api/내정보`);
      const data = response.data
      setMyMajor(data.전공);
      setMyliber(data.교양);
      setMyNomal(data.일반선택);
    } catch {
      console.error('Error fetching data: ', error);
      alert(`정보를 가져오는데 실패하였습니다`);
    }
  };

    return (
      <div>
        <Header />
        <Template title="졸업요건 검사 결과" />
        <div className={css(styles.columnContainer)}>
        <div className={css(styles.hrContainer)}>
          <p className={css(styles.custom_h)}>전체</p>
          <hr className={css(styles.custom_hr)}/>
          <p className={css(styles.custom_result_hr)}>소프트웨어학과 황선빈님의 결과입니다</p>
        </div>
        <GraduChartComponets earned={103} total={130} />
        <div className={css(styles.textContainer)}>
          <p className={css(styles.custom_result_text)}>졸업까지 28학점 남았습니다!</p>
          <p className={css(styles.custom_smalltext)}>아래에서 부족한 영역을 확인하세요</p>
        </div>
        </div>
        <div className={css(styles.rowContainer)}>
          <div className={css(styles.leftContainer)}>
            <div className={css(styles.majorContainer)}>
              <div className={css(styles.majortitleContainer)}>
                <p className={css(styles.custom_h)}>전공</p>
                <p className={css(styles.custom_h_react)}>{myMajor}</p>
                <p className={css(styles.custom_hr_react)}>/</p>
                <p className={css(styles.custom_h_focus)}>{major}</p>
                <p className={css(styles.custom_h_focus)}>학점</p>
              </div>
              <hr className={css(styles.custom_major_hr)}/>
              <div className={css(styles.majorContentsContainer)}>
                <img src={notgood}></img>
                <p className={css(styles.custom_result_text)}>전공 학점 10학점 부족합니다</p>
              </div>
            </div>
            <div className={css(styles.majorContainer)}>
              <div className={css(styles.majortitleContainer)}>
                <p className={css(styles.custom_h)}>일반선택</p>
                <p className={css(styles.custom_h_react)}>{myNomal}</p>
                <p className={css(styles.custom_hr_react)}>/</p>
                <p className={css(styles.custom_h_focus)}>{nomal}</p>
                <p className={css(styles.custom_h_focus)}>학점</p>
              </div>
              <hr className={css(styles.custom_major_hr)}/>
              <div className={css(styles.majorContentsContainer)}>
                <img src={notgood}></img>
                <p className={css(styles.custom_result_text)}>일반선택 6학점 부족합니다</p>
              </div>
            </div>
          </div>
          <div className={css(styles.rightContainer)}>
            <div className={css(styles.majorContainer)}>
                <div className={css(styles.majortitleContainer)}>
                  <p className={css(styles.custom_h)}>교양</p>
                  <p className={css(styles.custom_h_react)}>{myliber}</p>
                  <p className={css(styles.custom_hr_react)}>/</p>
                  <p className={css(styles.custom_h_focus)}>{liber}</p>
                  <p className={css(styles.custom_h_focus)}>학점</p>
                </div>
                <hr className={css(styles.custom_major_hr)}/>
                <div className={css(styles.majorContentsContainer)}>
                  <img src={sogood}></img>
                <div className={css(styles.majortextContainer)}>
                    <p className={css(styles.custom_verysmall_text)}>축하합니다🎉</p>
                    <p className={css(styles.custom_result_text_ness)}>교양필수 이수완료 하였습니다!</p>
                </div>
                </div>
                <div className={css(styles.subContentsContainer)}>
                <div className={css(styles.imgcontainer)}>
                  <img src={notgood}></img>
                </div>
                  <div className={css(styles.majortextContainer)}>
                    <div className={css(styles.majortextsecondContainer)}>
                      <p className={css(styles.custom_verysmall_text)}>추가로 수강해야하는 영역을 확인하세요</p>
                      <p className={css(styles.custom_result_text_last)}>교양선택 12학점 부족합니다</p>
                      <p className={css(styles.custom_verysmall_content)}>정보와기술, 자연과환경, 수리와과학 중 1과목 (2학점)</p>
                      <p className={css(styles.custom_verysmall_content)}>인간과문학, 역사와사회, 철학과예술 중 4과목 (8학점)</p>
                      <p className={css(styles.custom_verysmall_content)}>인간과문학, 언어와문화 중 1과목 (2학점)</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className={css(styles.bottomContainer)}>
          <button className={css(styles.gradubutton)}>기이수 과목 추가하기</button>
        </div>
        <Footer />
      </div>
    );
}

const styles = StyleSheet.create({
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '60px',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'flex-start',
    marginBottom: '80px',
    justifyContent: 'center', 
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: '200px',
  },
  majorContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '50px',
    marginRight: '70px',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '50px',
  },
  hrContainer: {
    width: '520px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  majortitleContainer: {
    width: '466px',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
  },
  majorContentsContainer: {
    width: '466px',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '30px',
  },
  majortextContainer: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  majortextsecondContainer: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
  },
  subContentsContainer: {
    width: '466px',
    display: 'flex',
    flexDirection: 'row', 
    //alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    width: '520px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custom_hr: {
    width: '520px',
    border: '1px solid #E4E4E4',
    marginBottom: '40px',
  },
  custom_major_hr: {
    marginTop: '0px',
    width: '466px',
    border: '1px solid #E4E4E4',
  },
  custom_result_hr: {
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#3D5286',
  },
  custom_result_text: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '600',
    color: 'black',
  },
  custom_result_text_last: {
    marginTop: '0px',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '600',
    color: 'black',
  },
  custom_result_text_ness: {
    marginTop: '0px',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '600',
    color: 'black',
  },
  custom_smalltext: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  custom_verysmall_text: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    marginBottom: '-5px',
    textAlign: 'left',
    paddingLeft: '5px',
  },
  custom_verysmall_content: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#3D5286',
    textAlign: 'left',
    paddingLeft: '5px',
    marginTop: '0px',
    marginBottom: '10px',
  },
  custom_h: {
    fontFamily: 'Lato',
    fontSize: '25px',
    fontWeight: '600',
    color: 'black',
    marginRight: '29px',
    marginBottom: '15px',
  },
  custom_h_react: {
    fontFamily: 'Lato',
    fontSize: '25px',
    fontWeight: '600',
    color: '#3D5286',
    marginRight: '8px',
    marginBottom: '15px',
  },
  custom_hr_react: {
    fontFamily: 'Lato',
    fontSize: '25px',
    fontWeight: '600',
    color: 'black',
    marginRight: '8px',
    marginBottom: '15px',
  },
  custom_h_focus: {
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: '600',
    color: 'black',
    marginTop: '30px',
    marginRight: '5px',
  },
  gradubutton: {
    width: '165px',
    height: '49px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: '#3D5286',
    color: '#FFFFFF',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#2C4061',
    },
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '0px',
  },
  imgcontainer: {
    marginTop: '18px',
  },
});

export default GraduTestPage;