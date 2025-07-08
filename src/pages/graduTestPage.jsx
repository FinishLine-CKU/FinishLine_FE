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
import light from "../assets/images/light.png";
import axios from 'axios';

function GraduTestPage() {
    const [major, setMajor] = useState();
    const [subMajorType, setSubMajorType] = useState();

    const [doneMajor, setDoneMajor] = useState();  // user_major => doneMajor
    const [doneSubMajor, setDoneSubMajor] = useState(0);  // user_sub_major => doneSubMajor
    const [doneEssentialGE, setDoneEssentialGE] = useState(0);  // completeEsseCredit => doneEssentialGE
    const [doneChoiceGE, setDoneChoiceGE] = useState(0);  // completeChoiceCredit => doneChoiceGE
    const [doneMD, setDoneMD] = useState(0);  // done_micro_degree => doneMD
    const [doneMajorRest, setDoneMajorRest] = useState(0);  // done_major_rest => doneMajorRest
    const [doneSubMajorRest, setDoneSubMajorRest] = useState(0);  // done_major_rest => doneMajorRest
    const [doneGERest, setDoneGERest] = useState(0);  // completeNormalCredit => doneGERest
    const [doneMDRest, setDoneMDRest] = useState(0);
    const [doneEducationRest, setDoneEducationRest] = useState(0);
    const [doneRest, setDoneRest] = useState(0);  // done_rest => doneRest

    const [totalStandard, setTotalStandard] = useState();  // total_credit => totalStandard
    const [majorStandard, setMajorStandard] = useState();  // major_credit => majorStandard
    const [subMajorStandard, setSubMajorStandard] = useState();  // sub_major_credit => subMajorStandard
    const [essentialGEStandard, setEssentialGEStandard] = useState();  // general_essential_credit => essentialGEStandard
    const [choiceGEStandard, setChoiceGEStandard] = useState();  // general_selection_credit => choiceGEStandard
    const [MDStandard, setMDStandard] = useState(0);
    const [restStandard, setRestStandard] = useState(0);  // rest_credit => restStandard

    const [lackMajor, setLackMajor] = useState(); // need_major => lackMajor
    const [lackSubMajor, setLackSubMajor] = useState();  // need_sub_major => lackSubMajor
    const [lackEssentialGE, setLackEssentialGE] = useState(0);  // needEsseCredit => lackEssentialGE
    const [lackEssentialGETopic, setLackEssentialGETopic] = useState({});  // needNessArea => lackEssentialGETopic
    const [lackChoiceGE, setLackChoiceGE] = useState(0);  // needChoiceCredit => lackChoiceGE
    const [lackChoiceGETopic, setLackChoiceGETopic] = useState({});  // needChoiceArea => lackChoiceGETopic
    const [lackMD, setLackMD] = useState(0);
    const [lackEducation, setLackEducation] = useState(0);

    const year = parseInt(localStorage.getItem('idToken').substr(0, 4));
    const navigate = useNavigate();

    const testing = async () => {
        const response = await axios.post('https://finishline-cku.com/graduation/test_major/', {
            student_id : localStorage.getItem('idToken')
        });
        if (response.data) {
            const { major, subMajorType, doneMajor, doneSubMajor, doneMajorRest, doneSubMajorRest, doneRest, totalStandard, majorStandard, subMajorStandard, essentialGEStandard, choiceGEStandard, lackMajor, lackSubMajor } = response.data;
            setMajor(major)
            setSubMajorType(subMajorType)  // subMajorType / doneSubMajor / subMajorStandard
            setDoneMajor(doneMajor)
            setDoneSubMajor(doneSubMajor)
            setDoneMajorRest(doneMajorRest)
            setDoneSubMajorRest(doneSubMajorRest)
            setDoneRest(doneRest)
            setTotalStandard(totalStandard)
            setMajorStandard(majorStandard)
            setSubMajorStandard(subMajorStandard)
            setEssentialGEStandard(essentialGEStandard)
            setChoiceGEStandard(choiceGEStandard)
            setLackMajor(lackMajor)
            setLackSubMajor(lackSubMajor)
            { localStorage.setItem('lackSubMajor', lackSubMajor) }
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
        const response = await axios.post('https://finishline-cku.com/graduation/test_micro_degree/', {
            student_id : localStorage.getItem('idToken')
        });
        if (response.data) {
            const { doneMD, doneMDRest, MDStandard, restStandard, lackMD } = response.data
            setDoneMD(doneMD)
            setDoneMDRest(doneMDRest)
            setMDStandard(MDStandard)
            setRestStandard(restStandard)
            setLackMD(lackMD)
        } else {
            alert('서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.');
        };
    };

    const educationCheck = async () => {
        const response = await axios.post('https://finishline-cku.com/graduation/test_education/', {
            student_id: localStorage.getItem('idToken')
        });
        if (response.data) {
            const { doneEducationRest, lackEducation } = response.data
            setDoneEducationRest(doneEducationRest)
            setLackEducation(lackEducation)
        } else {
            alert('서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.');
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
        educationCheck();
    }, []);

    return (
        <>
            <Header />
            <Template title="졸업요건 검사 결과" />
            <div className={css(styles.columnContainer)}>
                <div className={css(styles.hrContainer)}>
                    <p className={css(styles.whole)}>전체</p>
                    <hr className={css(styles.custom_hr)} />
                </div>
                <span className={css(styles.custom_result_hr)}> {MAJOR_NEW.find(item => item.value === major)?.label || major} {localStorage.getItem('name')}님의 결과입니다</span>
                <GraduChartComponets earned={doneMajor + doneSubMajor + doneEssentialGE + doneChoiceGE + doneMD + doneSubMajorRest + doneEducationRest + doneRest} total={totalStandard} />
                <div className={css(styles.textContainer)}>
                    <div>
                        {lackMajor + lackSubMajor + lackEssentialGE + lackChoiceGE + lackMD <= 0 ?
                            <>
                                <span className={css(styles.cheer)}>졸업을 축하합니다!</span>
                                {localStorage.removeItem('lackTotal')}
                            </>
                            :
                            <>
                                <span className={css(styles.custom_title_result_text)}>졸업까지</span>
                                {subMajorType ?
                                    <>
                                        <span className={css(styles.restCredit)}>{restStandard > (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) ? lackMajor + lackSubMajor + lackEssentialGE + lackChoiceGE + lackMD + (restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest)) : lackMajor + lackSubMajor + lackEssentialGE + lackChoiceGE + lackMD}학점</span>
                                        {localStorage.setItem('lackTotal', restStandard > (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) ? lackMajor + lackSubMajor + lackEssentialGE + lackChoiceGE + lackMD + (restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest)) : lackMajor + lackSubMajor + lackEssentialGE + lackChoiceGE + lackMD)}
                                        <span className={css(styles.custom_title_result_text)}>남았습니다!</span>
                                    </>
                                    : <>
                                        <span className={css(styles.restCredit)}>{restStandard > (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) ? lackMajor + lackEssentialGE + lackChoiceGE + lackMD + (restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest)) : lackMajor + lackEssentialGE + lackChoiceGE + lackMD}학점</span>
                                        {localStorage.setItem('lackTotal', restStandard > (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) ? lackMajor + lackEssentialGE + lackChoiceGE + lackMD + (restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest)) : lackMajor + lackEssentialGE + lackChoiceGE + lackMD)}
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
                            <span className={css(styles.custom_h_focus)}>{majorStandard} 학점</span>
                        </div>
                        <hr className={css(styles.custom_major_hr)} />
                        {doneMajor >= majorStandard ?
                            <div className={css(styles.majorContentsContainer)}>
                                <img src={sogood} />
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
                                <img src={notgood} />
                                <span className={css(styles.contentAlertText)}>전공 학점</span>
                                <span className={css(styles.lackCredit)}>{lackMajor}학점</span>
                                <span className={css(styles.contentAlertText)}>부족합니다.</span>
                            </div>
                        }
                    </div>
                    {subMajorType ?
                        <div className={css(styles.majorContainer)}>
                            <div className={css(styles.majortitleContainer)}>
                                <span className={css(styles.custom_h)}>{SUBMAJORTYPE.find(item => item.value === subMajorType).label}</span>
                                <span className={css(styles.userCredit)}>{doneSubMajor}</span>
                                <span className={css(styles.custom_hr_react)}> / </span>
                                <span className={css(styles.custom_h_focus)}>{subMajorStandard} 학점</span>
                            </div>
                            <hr className={css(styles.custom_major_hr)} />
                            {doneSubMajor >= subMajorStandard ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
                                    <div className={css(styles.successContainer)}>
                                        <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                        <div>
                                            <span className={css(styles.contentAlertText)}>{SUBMAJORTYPE.find(item => item.value === subMajorType).label}</span>
                                            <span className={css(styles.contextSuccess)}>이수완료</span>
                                            <span className={css(styles.contentAlertText)}>했습니다!</span>
                                            {localStorage.removeItem('lackSubMajor', lackSubMajor)}
                                        </div>
                                    </div>
                                </div> :
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={notgood} />
                                    <span className={css(styles.contentAlertText)}>{SUBMAJORTYPE.find(item => item.value === subMajorType).label}</span>
                                    <span className={css(styles.lackCredit)}>{lackSubMajor}학점</span>
                                    <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                    {localStorage.setItem('lackSubMajor', lackSubMajor)}
                                </div>
                            }
                        </div> : null}
                    {!MDStandard ? null :
                        <div className={css(styles.majorContainer)}>
                            <div className={css(styles.majortitleContainer)}>
                                <span className={css(styles.custom_h)}>소단위전공</span>
                                <span className={css(styles.userCredit)}>{doneMD}</span>
                                <span className={css(styles.custom_hr_react)}> / </span>
                                <span className={css(styles.custom_h_focus)}>{MDStandard} 학점</span>
                            </div>
                            <hr className={css(styles.custom_major_hr)} />
                            {doneMD >= MDStandard ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
                                    <div className={css(styles.successContainer)}>
                                        <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                        <div>
                                            <span className={css(styles.contentAlertText)}>소단위전공</span>
                                            <span className={css(styles.contextSuccess)}>이수완료</span>
                                            <span className={css(styles.contentAlertText)}>했습니다!</span>
                                            {localStorage.removeItem('lackMD', lackMD)}
                                        </div>
                                    </div>
                                </div> :
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={notgood} />
                                    <span className={css(styles.contentAlertText)}>소단위전공</span>
                                    <span className={css(styles.lackCredit)}>{lackMD}학점</span>
                                    {localStorage.setItem('lackMD', lackMD)}
                                    <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                </div>}
                        </div>}
                    {!restStandard ? null :
                        <div className={css(styles.majorContainer)}>
                            <div className={css(styles.majortitleContainer)}>
                                <span className={css(styles.custom_h)}>일반선택</span>
                                <span className={css(styles.userCredit)}>{doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest}</span>
                                <span className={css(styles.custom_hr_react)}> / </span>
                                <span className={css(styles.custom_h_focus)}>{restStandard} 학점</span>
                            </div>
                            <hr className={css(styles.custom_major_hr)} />
                            {/* 일반선택 로직 추가 */}
                            {(doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) >= restStandard ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
                                    <div className={css(styles.successContainer)}>
                                        <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                        <div>
                                            <span className={css(styles.contentAlertText)}>일반 선택</span>
                                            <span className={css(styles.contextSuccess)}>이수완료</span>
                                            <span className={css(styles.contentAlertText)}>했습니다!</span>
                                            {localStorage.removeItem('lackRestTotal')}
                                        </div>
                                    </div>
                                </div> :
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={notgood} />
                                    <span className={css(styles.contentAlertText)}>일반 선택</span>
                                    <span className={css(styles.lackCredit)}>{restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest)}학점</span>
                                    {localStorage.setItem('lackRestTotal', restStandard > (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) ? restStandard - (doneMajorRest + doneSubMajorRest + doneGERest + doneMDRest + doneEducationRest + doneRest) : 0)}
                                    <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                </div>}
                        </div>}
                </div>
                <div className={css(styles.rightContainer)}>
                    <div className={css(styles.majorContainer)}>
                        <div className={css(styles.majortitleContainer)}>
                            <span className={css(styles.custom_h)}>교양</span>
                            <span className={css(styles.userCredit)}>{doneEssentialGE + doneChoiceGE}</span>
                            <span className={css(styles.custom_hr_react)}> / </span>
                            <span className={css(styles.custom_h_focus)}>{essentialGEStandard + choiceGEStandard} 학점</span>
                        </div>
                        <hr className={css(styles.custom_major_hr)} />
                        <div className={css(styles.generalContainer)}>
                        {year > 2022 ?
                            <>
                            {!lackEssentialGE ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
                                    <div className={css(styles.successContainer)}>
                                        <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                        <div>
                                            <span className={css(styles.contentAlertText)}>교양</span>
                                            <span className={css(styles.contextSuccess)}>이수완료</span>
                                            <span className={css(styles.contentAlertText)}>했습니다!</span>
                                            {localStorage.removeItem('lackEssentialGE')}
                                            {localStorage.removeItem('lackChoiceGE')}
                                        </div>
                                    </div>
                                </div> :
                                <>
                                    <div className={css(styles.majorContentsContainer)}>
                                        <img src={notgood} />
                                        <div className={css(styles.successContainer)}>
                                            <span className={css(styles.congratulation)}>추가로 수강해야하는 영역을 확인하세요.</span>
                                            <div>
                                                <span className={css(styles.contentAlertText)}>교양</span>
                                                <span className={css(styles.lackCredit)}>{lackEssentialGE}학점</span>
                                                <span className={css(styles.contentAlertText)}>부족합니다.</span>
                                                {localStorage.setItem('lackEssentialGE', lackEssentialGE)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={css(styles.generalLacks)}>
                                        <span className={css(styles.generalLecture)}>
                                            {lackEssentialGETopic && Object.entries(lackEssentialGETopic).map(([key, value]) => {
                                                const divisor = (key === '봉사활동' || key === 'VERUM캠프' || key === '트리니티아카데미' || key === 'VERUM인성') ? 1 : 2;
                                                return (
                                                    <div key={key}>
                                                        {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                                                    </div>
                                                );
                                            })}
                                            {lackChoiceGETopic && Object.entries(lackChoiceGETopic).map(([key, value]) => {
                                                const divisor = (key === '봉사활동' || key === 'VERUM캠프' || key === '트리니티아카데미' || key === 'VERUM인성') ? 1 : 2;
                                                return (
                                                    <div key={key}>
                                                        {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                                                    </div>
                                                );
                                            })}
                                        </span>
                                    </div>
                                </> 
                            } 
                            </> : 
                            <>
                            {!lackEssentialGE ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
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
                                        <img src={notgood} />
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
                                                const divisor = (key === '봉사활동' || key === 'VERUM캠프' || key === 'VERUM인성') ? 1 : 2;
                                                return (
                                                    <div key={key}>
                                                        {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                                                    </div>
                                                );
                                            })}
                                        </span>
                                    </div>
                                </>
                            }

                            {!lackChoiceGE ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
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
                                        <img src={notgood} />
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
                                                const divisor = (key === '봉사활동' || key === 'VERUM캠프' || key === 'VERUM인성') ? 1 : 2;
                                                return (
                                                    <div key={key}>
                                                        {key} <span className={css(styles.generalLectureSub)}> 중 {value / divisor}과목</span> ({value}학점)
                                                    </div>
                                                );
                                            })}
                                        </span>
                                    </div>
                                </>
                            }
                            </>
                        }
                        </div>
                    </div>
                    {!doneEducationRest ? null :
                        <div className={css(styles.majorContainer)}>
                            <div className={css(styles.majortitleContainer)}>
                                <span className={css(styles.custom_h)}>교직</span>
                                <span className={css(styles.userCredit)}>{doneEducationRest}</span>
                                <span className={css(styles.custom_hr_react)}> / </span>
                                <span className={css(styles.custom_h_focus)}>22 학점</span>
                            </div>
                            <hr className={css(styles.custom_major_hr)} />
                            {doneEducationRest >= 22 ?
                                <div className={css(styles.majorContentsContainer)}>
                                    <img src={sogood} />
                                    <div className={css(styles.successContainer)}>
                                        <span className={css(styles.congratulation)}>축하합니다 🎉</span>
                                        <div>
                                            <span className={css(styles.contentAlertText)}>교직 학점</span>
                                            <span className={css(styles.contextSuccess)}>이수완료</span>
                                            <span className={css(styles.contentAlertText)}>했습니다!</span>
                                        </div>
                                    </div>
                                </div> :
                                <>
                                    <div className={css(styles.majorContentsContainer)}>
                                        <img src={notgood} />
                                        <div className={css(styles.successContainer)}>
                                            <span className={css(styles.congratulation)}>교직 이수에 필요한 학점을 표시합니다. </span>
                                            <div>
                                                <span className={css(styles.contentAlertText)}>교직 이수</span>
                                                <span className={css(styles.lackCredit)}>{lackEducation}학점</span>
                                                <span className={css(styles.contentAlertText)}>필요합니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={css(styles.educationInfoContainer)}>
                                        <img src={light} className={css(styles.lightEmoji)}/>
                                        <span className={css(styles.educationInfo)}>교직 이수현황 파악을 위한 영역으로 일반선택 학점 계산에 반영됐습니다.</span>
                                    </div>
                                </>}
                        </div>
                    }
                </div>
            </div>
            <div className={css(styles.bottomContainer)}>
                <button className={css(styles.gradubutton)} onClick={goToDoneLecture}>
                    이수 과목 시뮬레이션
                </button>
                <a href="https://docs.google.com/forms/d/15ueJU2u7EiEBA8uVJI2hExoQqREngYg23wntCTzBZhM/edit#responses" className={css(styles.feedbackLink)} target="_blank" title="FinishLine 설문 링크">
                  오류 및 피드백 제보
                </a>
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
        paddingBottom: '66px',
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
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '200px',
        backgroundColor: '#FFFEFB',
        gap: '30px',
    },
    feedbackLink: {
        width: '155px',
        height: '49px',
        borderRadius: '5px',
        border: '1.5px solid #3D5286',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#3D5286',
        backgroundColor: '#FFFEFB',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ':active': {
          fontWeight: '700',
          opacity: '0.5'
        },
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
        alignItems: 'left',
        gap: '35px'
    },
    hrContainer: {
        width: '520px',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap'
    },
    whole: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '700',
        color: 'black',
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
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '520px',
        alignItems: 'center',
    },
    custom_hr: {
        width: '520px',
        border: '1px solid #E4E4E4'
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
        padding: '40px 0 30px 0'
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
        paddingRight: '30px',
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
        padding: '0 5px'
    },
    custom_h_focus: {
        fontFamily: 'Lato',
        fontSize: '20px',
        fontWeight: '700',
        color: 'black',
        paddingBottom: '2px'
    },
    educationInfoContainer: {
        display: 'flex',
        width: '100%',
        height: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#E9F7FA'
    },
    lightEmoji: {
        width: '15px',
        paddingRight: '5px'
    },
    educationInfo: {
        fontFamily: 'Lato',
        fontSize: '13px',
        color: '#618F9D',
        fontWeight: '600'
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
        paddingTop: '0px',
    }
});

export default GraduTestPage;