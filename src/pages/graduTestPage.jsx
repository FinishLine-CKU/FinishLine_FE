import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { MAJOR_NEW, SUBMAJORTYPE } from '../pages/signupPage2';
import Template from '../components/template';
import Header from '../components/header';
import Footer from '../components/footer';
import GraduChartComponets from "../components/graduChartComponents";
import notgood from "../assets/images/notgood.png";
import sogood from "../assets/images/sogood.png";
import ChillGuy from "../assets/images/chillGuy.png";
import axios from 'axios';

function GraduTestPage() { 
    const [lackEssentialGE, setLackEssentialGE] = useState(0);  // needEsseCredit => lackEssentialGE
    const [lackChoiceGE, setLackChoiceGE] = useState(0);  // needChoiceCredit => lackChoiceGE
    const [doneEssentialGE, setDoneEssentialGE] = useState(0);  // completeEsseCredit => doneEssentialGE
    const [doneChoiceGE, setDoneChoiceGE] = useState(0);  // completeChoiceCredit => doneChoiceGE
    const [lackEssentialGETopic, setLackEssentialGETopic] = useState({});  // needNessArea => lackEssentialGETopic
    const [lackChoiceGETopic, setLackChoiceGETopic] = useState({});  // needChoiceArea => lackChoiceGETopic
    const [doneGERest, setDoneGERest] = useState(0);  // completeNormalCredit => doneGERest

    const [major_info, setMajor_info] = useState();
    const [lackMajor, setLackMajor] = useState(); // need_major => lackMajor
    const [doneMajor, setDoneMajor] = useState();  // user_major => doneMajor
    const [totalStandard, setTotalStandard] = useState();  // total_credit => totalStandard
    const [major_credit, setMajor_credit] = useState();
    const [general_essential_credit, setGeneral_essential_credit] = useState();
    const [general_selection_credit, setGeneral_selection_credit] = useState();
    const [rest_credit, setRest_credit] = useState();
    const [need_sub_major, setNeed_sub_major] = useState();
    const [user_sub_major, setUser_sub_major] = useState();
    const [sub_major_credit, setSub_major_credit] = useState();
    const [sub_major_type, setSub_major_type] = useState();
    const [done_major_rest, setDone_major_rest] = useState();
    const [done_rest, setDone_rest] = useState();
    const [done_micro_degree, setDone_micro_degree] = useState();
    const navigate = useNavigate();

    const testing = async () => {
        const response = await axios.post('http://127.0.0.1:8000/graduation/test_major/', {
          student_id : localStorage.getItem('idToken')
        });
        if (response.data) {
            if (response.data.sub_major_type) { // 추가 전공 시
              if (response.data.rest_credit === 0) { // 의학과 or 간호 : 일선 학점 보이면 안됨
                  const { major_info, lackMajor, doneMajor, totalStandard, major_credit, general_essential_credit, general_selection_credit, rest_credit, need_sub_major, user_sub_major, sub_major_credit, sub_major_type, done_major_rest, done_rest } = response.data;
                  setMajor_info(major_info);
                  setLackMajor(lackMajor)
                  setDoneMajor(doneMajor)
                  setTotalStandard(totalStandard)
                  setMajor_credit(major_credit)
                  setGeneral_essential_credit(general_essential_credit)
                  setGeneral_selection_credit(general_selection_credit)
                  setRest_credit(0)
                  setNeed_sub_major(need_sub_major)
                  setUser_sub_major(user_sub_major)
                  setSub_major_credit(sub_major_credit)
                  setSub_major_type(sub_major_type)
                  setDone_major_rest(done_major_rest)
                  setDone_rest(done_rest)
              } else {
                  const { major_info, lackMajor, doneMajor, totalStandard, major_credit, general_essential_credit, general_selection_credit, rest_credit, need_sub_major, user_sub_major, sub_major_credit, sub_major_type, done_major_rest, done_rest } = response.data;
                  setMajor_info(major_info);
                  setLackMajor(lackMajor)
                  setDoneMajor(doneMajor)
                  setTotalStandard(totalStandard)
                  setMajor_credit(major_credit)
                  setGeneral_essential_credit(general_essential_credit)
                  setGeneral_selection_credit(general_selection_credit)
                  setRest_credit(rest_credit)
                  setNeed_sub_major(need_sub_major)
                  setUser_sub_major(user_sub_major)
                  setSub_major_credit(sub_major_credit)
                  setSub_major_type(sub_major_type)
                  setDone_major_rest(done_major_rest)
                  setDone_rest(done_rest)
              };
            } else { // 추가 전공 해당 없을 시
                if (response.data.rest_credit === 0) { // 의학과 or 간호 : 일선 학점 보이면 안됨
                    const { major_info, lackMajor, doneMajor, totalStandard, major_credit, general_essential_credit, general_selection_credit, rest_credit, done_major_rest, need_sub_major, done_rest } = response.data;
                    setMajor_info(major_info);
                    setLackMajor(lackMajor)
                    setDoneMajor(doneMajor)
                    setTotalStandard(totalStandard)
                    setMajor_credit(major_credit)
                    setGeneral_essential_credit(general_essential_credit)
                    setGeneral_selection_credit(general_selection_credit)
                    setRest_credit(0)
                    setDone_major_rest(done_major_rest)
                    setNeed_sub_major(need_sub_major)
                    {localStorage.setItem('need_sub_major', need_sub_major)}
                    setUser_sub_major(0)
                    setDone_rest(done_rest)
                } else {
                    const { major_info, lackMajor, doneMajor, totalStandard, major_credit, general_essential_credit, general_selection_credit, rest_credit, done_major_rest, need_sub_major, done_rest } = response.data;
                    setMajor_info(major_info);
                    setLackMajor(lackMajor)
                    setDoneMajor(doneMajor)
                    setTotalStandard(totalStandard)
                    setMajor_credit(major_credit)
                    setGeneral_essential_credit(general_essential_credit)
                    setGeneral_selection_credit(general_selection_credit)
                    setRest_credit(rest_credit)
                    setDone_major_rest(done_major_rest)
                    setNeed_sub_major(need_sub_major)
                    {localStorage.setItem('need_sub_major', need_sub_major)}
                    setUser_sub_major(0)
                    setDone_rest(done_rest)
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
              const response = await axios.post('http://127.0.0.1:8000/graduation/general_check/', {
                user_id: userId
              });
        
              const generalData = response.data.general_data;
        
              setLackEssentialGE(generalData['lackEssentialGE']);
              setLackChoiceGE(generalData['lackChoiceGE']);
              setDoneEssentialGE(generalData['doneEssentialGE']);
              setDoneChoiceGE(generalData['doneChoiceGE']);
              setLackEssentialGETopic(generalData['lackEssentialGETopic']);
              setLackChoiceGETopic(generalData['lackChoiceGETopic']);
              setDoneGERest(generalData['doneGERest']);
          } else {
              console.error('user_id가 로컬스토리지에 없습니다.');
          }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
  
    const microDegreeCheck = async () => {
      const response = await axios.post('http://127.0.0.1:8000/graduation/test_micro_degree/', {
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
                    <p className={css(styles.custom_result_hr)}> {MAJOR_NEW.find(item => item.value === major_info)?.label || major_info} {localStorage.getItem('name')}님의 결과입니다</p>
                </div>
                <GraduChartComponets earned={
                    sub_major_type ? doneMajor + doneEssentialGE + doneChoiceGE + done_micro_degree + user_sub_major + done_rest : doneMajor + doneEssentialGE + doneChoiceGE + done_micro_degree + user_sub_major + done_major_rest + done_rest} total={totalStandard} />
                <div className={css(styles.textContainer)}>
                    <div>
                      {lackMajor + lackEssentialGE + lackChoiceGE + need_sub_major <= 0 ? 
                      <>
                        <span className={css(styles.cheer)}>졸업을 축하합니다!</span>
                        {localStorage.removeItem('needTotalCredit')}
                      </>
                      :
                      <>
                      <span className={css(styles.custom_title_result_text)}>졸업까지</span>
                      {sub_major_type ?
                      <>
                        <span className={css(styles.restCredit)}>{rest_credit > (doneGERest + done_major_rest + done_micro_degree + done_rest) ? lackMajor + lackEssentialGE + lackChoiceGE + (rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest)) + need_sub_major : lackMajor + lackEssentialGE + lackChoiceGE + need_sub_major}학점</span>
                        {localStorage.setItem('needTotalCredit', rest_credit > (doneGERest + done_major_rest + done_micro_degree + done_rest) ? lackMajor + lackEssentialGE + lackChoiceGE + (rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest)) + need_sub_major : lackMajor + lackEssentialGE + lackChoiceGE + need_sub_major)}
                        <span className={css(styles.custom_title_result_text)}>남았습니다!</span>
                      </>
                      : <>
                        <span className={css(styles.restCredit)}>{rest_credit > (doneGERest + done_major_rest + done_micro_degree + done_rest) ? lackMajor + lackEssentialGE + lackChoiceGE + (rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest)) : lackMajor + lackEssentialGE + lackChoiceGE}학점</span>
                        {localStorage.setItem('needTotalCredit', rest_credit > (doneGERest + done_major_rest+ done_micro_degree + done_rest) ? lackMajor + lackEssentialGE + lackChoiceGE + (rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest)) : lackMajor + lackEssentialGE + lackChoiceGE)}
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
                    <span className={css(styles.userCredit)}>{doneMajor}</span>
                    <span className={css(styles.custom_hr_react)}> / </span>
                    <span className={css(styles.custom_h_focus)}>{major_credit} 학점</span>
                  </div>
                  <hr className={css(styles.custom_major_hr)}/>
                  {doneMajor >= major_credit ?
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
                    <span className={css(styles.lackCredit)}>{lackMajor}학점</span>
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
                    <span className={css(styles.userCredit)}>{doneGERest + done_major_rest + done_micro_degree + done_rest}</span>
                    <span className={css(styles.custom_hr_react)}> / </span>
                    <span className={css(styles.custom_h_focus)}>{rest_credit} 학점</span>
                  </div>
                  <hr className={css(styles.custom_major_hr)}/>
                  {/* 일반선택 로직 추가 */}
                  {(doneGERest + done_major_rest + done_micro_degree + done_rest) >= rest_credit ?
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
                    <span className={css(styles.lackCredit)}>{rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest)}학점</span>
                    {localStorage.setItem('needNormalTotalCredit',  rest_credit > (doneGERest + done_major_rest + done_micro_degree + done_rest) ? rest_credit - (doneGERest + done_major_rest + done_micro_degree + done_rest) : 0)}
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
                          <span className={css(styles.userCredit)}>{doneEssentialGE + doneChoiceGE}</span>
                          <span className={css(styles.custom_hr_react)}> / </span>
                          <span className={css(styles.custom_h_focus)}>{general_essential_credit + general_selection_credit} 학점</span>
                      </div>
                      <hr className={css(styles.custom_major_hr)}/>
                      <div className={css(styles.generalContainer)}>
                          {/* 교양 필수 로직 추가 */}
                          {!lackEssentialGE ? 
                          <div className={css(styles.majorContentsContainer)}>
                              <img src={sogood}/>
                              <div className={css(styles.successContainer)}>
                                  <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                  <div>
                                      <span className={css(styles.contentAlertText)}>교양 필수</span>
                                      <span className={css(styles.contextSuccess)}>이수완료</span>
                                      <span className={css(styles.contentAlertText)}>했습니다!</span>
                                      {localStorage.removeItem('lackEssentialGE')}
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
                                        <span className={css(styles.lackCredit)}>{lackEssentialGE}학점</span>
                                        <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                        {localStorage.setItem('lackEssentialGE', lackEssentialGE)}
                                    </div>
                                </div>
                            </div>
                            <div className={css(styles.generalLacks)}>
                                <span className={css(styles.generalLecture)}>
                                    {lackEssentialGETopic && Object.entries(lackEssentialGETopic).map(([key, value]) => {
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
                        {!lackChoiceGE ?
                        <div className={css(styles.majorContentsContainer)}>
                            <img src={sogood}/>
                            <div className={css(styles.successContainer)}>
                                <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                <div>
                                    <span className={css(styles.contentAlertText)}>교양 선택</span>
                                    <span className={css(styles.contextSuccess)}>이수완료</span>
                                    <span className={css(styles.contentAlertText)}>했습니다!</span>
                                    {localStorage.removeItem('lackChoiceGE')}
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
                                      <span className={css(styles.lackCredit)}>{lackChoiceGE}학점</span>
                                      <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                      {localStorage.setItem('lackChoiceGE', lackChoiceGE)}
                                  </div>
                              </div>
                          </div>
                          <div className={css(styles.generalLacks)}>
                              <span className={css(styles.generalLecture)}>
                                    {lackChoiceGETopic && Object.entries(lackChoiceGETopic).map(([key, value]) => {
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
                <button className={css(styles.gradubutton)} onClick={goToDoneLecture}>
                    기이수 과목 추가하기
                </button>
                <div className={css(styles.feedbackContainer)}>
                    <img src={ChillGuy} className={css(styles.chillGuy)} />
                    <a href="https://naver.me/FHlQ2NqP" className={css(styles.feedbackLink)} target="_blank" title="FinishLine 설문 링크">
                      ✌️✋ chill초면 충분해요! 빠른 피드백 남기기 🙏
                    </a>
                </div>
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
        backgroundColor: '#FFFEFB',
        gap: '60px',
    },
    feedbackContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chillGuy: {
        width: '54px',
        height: '54px',
        position: 'absolute',
        top: '-52px',
        left: '24px'
    },
    feedbackLink: {
        fontFamily: 'Lato',
        fontSize: '15px',
        color: '#5EAEE0',
        cursor: 'pointer',
        textDecoration: 'none',
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
    custom_smalltext: {
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
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
});

export default GraduTestPage;