import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { MAJOR, SUBMAJORTYPE } from '../pages/signupPage2';
import Template from '../components/template';
import Header from  '../components/header';
import Footer from '../components/footer';
import GraduChartComponets from "../components/graduChartComponents";
import notgood from "../assets/images/notgood.png";
import sogood from "../assets/images/sogood.png";
import axios from 'axios';

function GraduTestPage() {
  const [needEsseCredit, setNeedEsseCredit] = useState(0);
  const [needChoiceCredit, setNeedChoiceCredit] = useState(0);
  const [completeEsseCredit, setCompleteEsseCredit] = useState(0);
  const [completeChoiceCredit, setCompleteChoiceCredit] = useState(0);
  const [needNessArea, setNeedNessArea] = useState({});
  const [needChoiceArea, setNeedChoiceArea] = useState({});
  const [completeNormalCredit, setCompleteNormalCredit] = useState(0);
  const [needNormalCredit, setNeedNormalCredit] = useState(0);

  const [major_info, setMajor_info] = useState();
  const [need_major, setNeed_major] = useState();
  const [user_major, setUser_major] = useState();
  const [total_credit, setTotal_credit] = useState();
  const [major_credit, setMajor_credit] = useState();
  const [general_essential_credit, setGeneral_essential_credit] = useState();
  const [general_selection_credit, setGeneral_selection_credit] = useState();
  const [rest_credit, setRest_credit] = useState();
  const [need_sub_major, setNeed_sub_major] = useState();
  const [user_sub_major, setUser_sub_major] = useState();
  const [sub_major_credit, setSub_major_credit] = useState();
  const [sub_major_type, setSub_major_type] = useState();
  const [done_major_rest, setDone_major_rest] = useState();
  const [done_micro_degree, setDone_micro_degree] = useState();
  const navigate = useNavigate();

  const testing = async () => {
    const response = await axios.post('https://finishline-cku.com/graduation/test_major/', {
      student_id : localStorage.getItem('idToken')
    });
    if (response.data) {
      if (response.data.sub_major_type) { // 추가 전공 시
        if (response.data.rest_credit === 0) { // 의학과 or 간호 : 일선 학점 보이면 안됨
          const { major_info, need_major, user_major, total_credit, major_credit, general_essential_credit, general_selection_credit, rest_credit, need_sub_major, user_sub_major, sub_major_credit, sub_major_type, done_major_rest } = response.data;
          setMajor_info(major_info);
          setNeed_major(need_major)
          setUser_major(user_major)
          setTotal_credit(total_credit)
          setMajor_credit(major_credit)
          setGeneral_essential_credit(general_essential_credit)
          setGeneral_selection_credit(general_selection_credit)
          setRest_credit(0)
          setNeed_sub_major(need_sub_major)
          setUser_sub_major(user_sub_major)
          setSub_major_credit(sub_major_credit)
          setSub_major_type(sub_major_type)
          setDone_major_rest(done_major_rest)
        } else {
          const { major_info, need_major, user_major, total_credit, major_credit, general_essential_credit, general_selection_credit, rest_credit, need_sub_major, user_sub_major, sub_major_credit, sub_major_type, done_major_rest } = response.data;
          setMajor_info(major_info);
          setNeed_major(need_major)
          setUser_major(user_major)
          setTotal_credit(total_credit)
          setMajor_credit(major_credit)
          setGeneral_essential_credit(general_essential_credit)
          setGeneral_selection_credit(general_selection_credit)
          setRest_credit(rest_credit)
          setNeed_sub_major(need_sub_major)
          setUser_sub_major(user_sub_major)
          setSub_major_credit(sub_major_credit)
          setSub_major_type(sub_major_type)
          setDone_major_rest(done_major_rest)
        };
      } else { // 추가 전공 해당 없을 시
        if (response.data.rest_credit === 0) { // 의학과 or 간호 : 일선 학점 보이면 안됨
          const { major_info, need_major, user_major, total_credit, major_credit, general_essential_credit, general_selection_credit, rest_credit, done_major_rest, need_sub_major } = response.data;
          setMajor_info(major_info);
          setNeed_major(need_major)
          setUser_major(user_major)
          setTotal_credit(total_credit)
          setMajor_credit(major_credit)
          setGeneral_essential_credit(general_essential_credit)
          setGeneral_selection_credit(general_selection_credit)
          setRest_credit(0)
          setDone_major_rest(done_major_rest)
          setNeed_sub_major(need_sub_major)
          {localStorage.setItem('need_sub_major', need_sub_major)}
          setUser_sub_major(0)
        } else {
          const { major_info, need_major, user_major, total_credit, major_credit, general_essential_credit, general_selection_credit, rest_credit, done_major_rest, need_sub_major } = response.data;
          setMajor_info(major_info);
          setNeed_major(need_major)
          setUser_major(user_major)
          setTotal_credit(total_credit)
          setMajor_credit(major_credit)
          setGeneral_essential_credit(general_essential_credit)
          setGeneral_selection_credit(general_selection_credit)
          setRest_credit(rest_credit)
          setDone_major_rest(done_major_rest)
          setNeed_sub_major(need_sub_major)
          {localStorage.setItem('need_sub_major', need_sub_major)}
          setUser_sub_major(0)
        };
      }
    } else {
      alert('서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.');
    };
  };

  const goGraduationCheck = async () => {
    try {
      const userId = localStorage.getItem('idToken');
  
      if (userId) {
        const response = await axios.post('https://finishline-cku.com/graduation/general_check/', {
          user_id: userId
        });
  
        const generalData = response.data.general_data;
  
        setNeedEsseCredit(generalData['교양필수_부족_학점']);
        setNeedChoiceCredit(generalData['교양선택_부족_학점']);
        setCompleteEsseCredit(generalData['교양필수_이수_학점']);
        setCompleteChoiceCredit(generalData['교양선택_이수_학점']);
        setNeedNessArea(generalData['교양필수_부족_영역']);
        setNeedChoiceArea(generalData['교양선택_부족_영역']);
        setCompleteNormalCredit(generalData['일반선택_이수_학점']);
      } else {
        console.error('user_id가 로컬스토리지에 없습니다.');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  const microDegreeCheck = async () => {
    const response = await axios.post('https://finishline-cku.com/graduation/test_micro_degree/', {
      student_id : localStorage.getItem('idToken')
    });
    const { done_micro_degree } = response.data
    if (done_micro_degree) {
      setDone_micro_degree(done_micro_degree);
    }
    else {
      setDone_micro_degree(0);
    };
  };

  const goToDoneLecture = () => {
    navigate("/donelecture");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    testing();
    localStorage.setItem('testing', true);
    goGraduationCheck();
    localStorage.removeItem('tryAgainTest');
    microDegreeCheck();
  }, []);

  return (
    <>
      <Header />
      <Template title="졸업요건 검사 결과" />
      <div className={css(styles.columnContainer)}>
        <div className={css(styles.hrContainer)}>
          <p className={css(styles.custom_h)}>전체</p>
          <hr className={css(styles.custom_hr)}/>
          <p className={css(styles.custom_result_hr)}> {MAJOR.find(item => item.value === major_info)?.label || major_info} {localStorage.getItem('name')}님의 결과입니다</p>
        </div>
        <GraduChartComponets earned={
          sub_major_type ? user_major + completeEsseCredit + completeChoiceCredit + done_micro_degree + user_sub_major : user_major + completeEsseCredit + completeChoiceCredit + done_micro_degree + user_sub_major + done_major_rest} total={total_credit} />
        <div className={css(styles.textContainer)}>
          <div>
            {need_major + needEsseCredit + needChoiceCredit + need_sub_major <= 0 ? 
            <>
              <span className={css(styles.cheer)}>졸업을 축하합니다!</span>
              {localStorage.removeItem('needTotalCredit')}
            </>
            :
            <>
            <span className={css(styles.custom_title_result_text)}>졸업까지</span>
            {sub_major_type ?
            <>
              <span className={css(styles.restCredit)}>{rest_credit > (completeNormalCredit + done_major_rest + done_micro_degree) ? need_major + needEsseCredit + needChoiceCredit + (rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree)) + need_sub_major : need_major + needEsseCredit + needChoiceCredit + need_sub_major}학점</span>
              {localStorage.setItem('needTotalCredit', rest_credit > (completeNormalCredit + done_major_rest + done_micro_degree) ? need_major + needEsseCredit + needChoiceCredit + (rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree)) + need_sub_major : need_major + needEsseCredit + needChoiceCredit + need_sub_major)}
              <span className={css(styles.custom_title_result_text)}>남았습니다!</span>
            </>
            : <>
              <span className={css(styles.restCredit)}>{rest_credit > (completeNormalCredit + done_major_rest + done_micro_degree) ? need_major + needEsseCredit + needChoiceCredit + (rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree)) : need_major + needEsseCredit + needChoiceCredit}학점</span>
              {localStorage.setItem('needTotalCredit', rest_credit > (completeNormalCredit + done_major_rest+ done_micro_degree) ? need_major + needEsseCredit + needChoiceCredit + (rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree)) : need_major + needEsseCredit + needChoiceCredit)}
              <span className={css(styles.custom_title_result_text)}>남았습니다!</span>
            </>}
            </>
            }
          </div>
          <span className={css(styles.custom_smalltext)}>아래에서 부족한 영역을 확인하세요</span>
        </div>
      </div>
      <div className={css(styles.rowContainer)}>
        <div className={css(styles.leftContainer)}>
          <div className={css(styles.majorContainer)}>
            <div className={css(styles.majortitleContainer)}>
              <span className={css(styles.custom_h)}>전공</span>
              <span className={css(styles.userCredit)}>{user_major}</span>
              <span className={css(styles.custom_hr_react)}> / </span>
              <span className={css(styles.custom_h_focus)}>{major_credit} 학점</span>
            </div>
            <hr className={css(styles.custom_major_hr)}/>
            {user_major >= major_credit ?
            <div className={css(styles.majorContentsContainer)}>
              <img src={sogood}/>
              <div className={css(styles.successContainer)}>
                <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                <div>
                  <span className={css(styles.contentAlertText)}>전공 학점</span>
                  <span className={css(styles.contextSuccess)}>이수완료</span>
                  <span className={css(styles.contentAlertText)}>했습니다!</span>
                </div>
              </div>
            </div> :
            <div className={css(styles.majorContentsContainer)}>
              <img src={notgood}/>
              <span className={css(styles.contentAlertText)}>전공 학점</span>
              <span className={css(styles.lackCredit)}>{need_major}학점</span>
              <span className={css(styles.contentAlertText)}>부족합니다.</span>
            </div>
            }
          </div>
          { sub_major_type ?
          <div className={css(styles.majorContainer)}>
            <div className={css(styles.majortitleContainer)}>
              <span className={css(styles.custom_h)}>{SUBMAJORTYPE.find(item => item.value === sub_major_type).label}</span>
              <span className={css(styles.userCredit)}>{user_sub_major}</span>
              <span className={css(styles.custom_hr_react)}> / </span>
              <span className={css(styles.custom_h_focus)}>{sub_major_credit} 학점</span>
            </div>
            <hr className={css(styles.custom_major_hr)}/>
            {user_sub_major >= sub_major_credit ?
            <div className={css(styles.majorContentsContainer)}>
              <img src={sogood}/>
              <div className={css(styles.successContainer)}>
                <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                <div>
                  <span className={css(styles.contentAlertText)}>{SUBMAJORTYPE.find(item => item.value === sub_major_type).label}</span>
                  <span className={css(styles.contextSuccess)}>이수완료</span>
                  <span className={css(styles.contentAlertText)}>했습니다!</span>
                </div>
              </div>
            </div> :
            <div className={css(styles.majorContentsContainer)}>
              <img src={notgood}/>
              <span className={css(styles.contentAlertText)}>{SUBMAJORTYPE.find(item => item.value === sub_major_type).label}</span>
              <span className={css(styles.lackCredit)}>{need_sub_major}학점</span>
              <span className={css(styles.contentAlertText)}>부족합니다.</span>
              {localStorage.setItem('need_sub_major', need_sub_major)}
            </div>
            }
          </div> :
          null }
          <div className={css(styles.majorContainer)}>
            <div className={css(styles.majortitleContainer)}>
              <span className={css(styles.custom_h)}>일반선택</span>
              <span className={css(styles.userCredit)}>{completeNormalCredit + done_major_rest + done_micro_degree}</span>
              <span className={css(styles.custom_hr_react)}> / </span>
              <span className={css(styles.custom_h_focus)}>{rest_credit} 학점</span>
            </div>
            <hr className={css(styles.custom_major_hr)}/>
            {/* 일반선택 로직 추가 */}
            {(completeNormalCredit + done_major_rest + done_micro_degree) >= rest_credit ?
            <div className={css(styles.majorContentsContainer)}>
              <img src={sogood}/>
              <div className={css(styles.successContainer)}>
                <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                <div>
                  <span className={css(styles.contentAlertText)}>일반 선택</span>
                  <span className={css(styles.contextSuccess)}>이수완료</span>
                  <span className={css(styles.contentAlertText)}>했습니다!</span>
                </div>
              </div>
            </div> :
            <div className={css(styles.majorContentsContainer)}>
              <img src={notgood}/>
              <span className={css(styles.contentAlertText)}>일반 선택</span>
              <span className={css(styles.lackCredit)}>{rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree)}학점</span>
              {localStorage.setItem('needNormalTotalCredit',  rest_credit > (completeNormalCredit + done_major_rest + done_micro_degree) ? rest_credit - (completeNormalCredit + done_major_rest + done_micro_degree) : 0)}
              {}
              <span className={css(styles.contentAlertText)}>부족합니다.</span>
            </div>
            }
          </div>
        </div>
        <div className={css(styles.rightContainer)}>
          <div className={css(styles.majorContainer)}>
              <div className={css(styles.majortitleContainer)}>
                <span className={css(styles.custom_h)}>교양</span>
                <span className={css(styles.userCredit)}>{completeEsseCredit + completeChoiceCredit}</span>
                <span className={css(styles.custom_hr_react)}> / </span>
                <span className={css(styles.custom_h_focus)}>{general_essential_credit + general_selection_credit} 학점</span>
              </div>
              <hr className={css(styles.custom_major_hr)}/>
              <div className={css(styles.generalContainer)}>
                {/* 교양 필수 로직 추가 */}
                {!needEsseCredit ? 
                <div className={css(styles.majorContentsContainer)}>
                  <img src={sogood}/>
                  <div className={css(styles.successContainer)}>
                    <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                    <div>
                      <span className={css(styles.contentAlertText)}>교양 필수</span>
                      <span className={css(styles.contextSuccess)}>이수완료</span>
                      <span className={css(styles.contentAlertText)}>했습니다!</span>
                      {localStorage.removeItem('needEsseCredit')}
                    </div>
                  </div>
                </div> :
                <>
                  <div className={css(styles.majorContentsContainer)}>
                    <img src={notgood}/>
                    <div className={css(styles.successContainer)}>
                      <span className={css(styles.congratulation)}>추가로 수강해야하는 영역을 확인하세요.</span>
                      <div>
                        <span className={css(styles.contentAlertText)}>교양 필수</span>
                        <span className={css(styles.lackCredit)}>{needEsseCredit}학점</span>
                        <span className={css(styles.contentAlertText)}>부족합니다.</span>
                        {localStorage.setItem('needEsseCredit', needEsseCredit)}
                      </div>
                    </div>
                  </div>
                  <div className={css(styles.generalLacks)}>
                    <span className={css(styles.generalLecture)}>
                      {needNessArea && Object.entries(needNessArea).map(([key, value]) => {
                        const divisor = (key === '봉사활동' || key === 'VERUM캠프') ? 1 : 2;
                        return (
                          <div key={key}>
                            {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                          </div>
                        );
                      })}
                    </span>
                  </div>
                </> }
                {/* 교양 선택 로직 추가 */}
                {!needChoiceCredit ?
                <div className={css(styles.majorContentsContainer)}>
                  <img src={sogood}/>
                  <div className={css(styles.successContainer)}>
                    <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                    <div>
                      <span className={css(styles.contentAlertText)}>교양 선택</span>
                      <span className={css(styles.contextSuccess)}>이수완료</span>
                      <span className={css(styles.contentAlertText)}>했습니다!</span>
                      {localStorage.removeItem('needChoiceCredit')}
                    </div>
                  </div>
                </div> :
                <>
                  <div className={css(styles.majorContentsContainer)}>
                    <img src={notgood}/>
                    <div className={css(styles.successContainer)}>
                      <span className={css(styles.congratulation)}>추가로 수강해야하는 영역을 확인하세요.</span>
                      <div>
                        <span className={css(styles.contentAlertText)}>교양 선택</span>
                        <span className={css(styles.lackCredit)}>{needChoiceCredit}학점</span>
                        <span className={css(styles.contentAlertText)}>부족합니다.</span>
                        {localStorage.setItem('needChoiceCredit', needChoiceCredit)}
                      </div>
                    </div>
                  </div>
                  <div className={css(styles.generalLacks)}>
                    <span className={css(styles.generalLecture)}>
                        {needChoiceArea && Object.entries(needChoiceArea).map(([key, value]) => {
                          const divisor = (key === '봉사활동' || key === 'VERUM캠프') ? 1 : 2;
                          return (
                            <div key={key}>
                              {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                            </div>
                          );
                        })}
                      </span>
                  </div>
                </> }
              </div>
          </div>
        </div>
      </div>
      <div className={css(styles.bottomContainer)}>
        <button className={css(styles.gradubutton)} onClick={goToDoneLecture}>기이수 과목 추가하기</button>
      </div>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '66px',
    backgroundColor: '#FFFEFB'
  },
  rowContainer: {
    display: 'flex',
    paddingBottom: '100px',
    justifyContent: 'center',
    gap: '100px',
    backgroundColor: '#FFFEFB'
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center', 
    paddingBottom: '200px',
    backgroundColor: '#FFFEFB'
  },
  majorContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: '35px'
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '35px'
  },
  hrContainer: {
    width: '520px',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },
  majortitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  majorContentsContainer: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  generalLacks: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '30px',
    gap: '10px',
    margin: '-20px 0 0 40px',
    whiteSpace: 'nowrap',
  },
  generalLecture: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '600',
    color: '#3D5286'
  },
  generalLectureSub: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '400',
    color: '#3D5286'
  },
  congratulation: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '500'
  },
  contentAlertText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: '30px'
  },
  contextSuccess: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: '30px',
    color: '#86C46D',
    padding: '0 10px'
  },
  lackCredit: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: '30px',
    color: '#FF4921',
    padding: '0 10px'
  },
  majortextContainer: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    marginBottom: '30px',
  },
  textContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '520px',
    alignItems: 'center',
  },
  custom_hr: {
    width: '520px',
    border: '1px solid #E4E4E4',
    marginBottom: '40px',
  },
  custom_major_hr: {
    marginTop: '10px',
    marginBottom: '20px',
    width: '105%',
    border: '1px solid #E4E4E4',
  },
  generalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: '25px'
  },
  custom_result_hr: {
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#3D5286',
  },
  custom_title_result_text: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '700',
    color: 'black',
  },
  cheer: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '700',
    color: '#FF8EA8',
  },
  restCredit: {
    fontFamily: 'Lato',
    fontSize: '30px',
    color: '#FF4921',
    fontWeight: '800',
    padding: '0 10px'
  },
  custom_result_text: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '30px',
    fontWeight: '600',
    color: 'black',
    marginTop: '7px',
    marginBottom: '7px',
  },
  custom_result_text_last: {
    marginTop: '7px',
    marginBottom: '7px',
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
    fontSize: '18px',
    fontWeight: '500',
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
    fontWeight: '700',
    color: 'black',
    marginRight: '30px',
  },
  userCredit: {
    color: '#3D5286',
    fontSize: '30px',
    fontFamily: 'Lato',
    fontWeight: '800'
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
    fontSize: '30px',
    fontWeight: '700',
    color: 'black',
    margin: '0 5px'
  },
  custom_h_focus: {
    fontFamily: 'Lato',
    fontSize: '20px',
    fontWeight: '700',
    color: 'black',
    paddingBottom: '2px'
  },
  gradubutton: {
    width: '165px',
    height: '49px',
    borderRadius: '5px',
    border: '1px solid transparent',
    backgroundColor: '#3D5286',
    color: '#FFFEFB',
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