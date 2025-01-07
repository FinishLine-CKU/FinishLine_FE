import { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Template from "../components/template";
import Footer from "../components/footer";

import certification from '../assets/images/certification.png';
import login from '../assets/images/login.png';
import subject from '../assets/images/subject.png';
import requirements from '../assets/images/requirements.png';
import arrow from '../assets/images/arrow.png';

function UserGuidePage() {
    const navigate = useNavigate();
    const [setIsModalOpen] = useState(false);
    const [setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    return (
        <div className={css(styles.userGuideContainer)}>
            <Header />
            <Template title="이용 가이드" subtitle={<div>FinishLine을 효과적으로 사용하는 방법을 안내합니다.<br />아래의 안내에 따라 시스템을 사용해보세요.</div>} />

            <main className={css(styles.mainContent)}>
                <div className={css(styles.stepsSection)}>
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <img src={certification} alt="회원 가입 및 학생인증" className={css(styles.placeholder)} />
                        </div>
                        <h2 className={css(styles.stepTitle)}>회원가입 및 학생인증</h2>
                        <p className={css(styles.stepDescription)}>
                            대학 포털 ID/PW를 입력하여<br />
                            학생인증을 하고<br />
                            추가 정보(어학 자격) 및 비밀번호를 <br />
                            설정하여 회원가입을 합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            학생 인증을 위해 입력한 비밀번호는<br />
                            학생 인증에만 사용되며 저장되지 않습니다.
                        </p>
                        <button
                            className={css(styles.signupButton)}
                            onClick={() => navigate('/signupPage1')}
                        >
                            회원가입
                        </button>
                    </div>

                    <img src={arrow} alt="화살표" className={css(styles.arrowImage)} />

                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <img src={login} alt="로그인" className={css(styles.placeholder)} />
                        </div>
                        <h2 className={css(styles.stepTitle)}>로그인</h2>
                        <p className={css(styles.stepDescription)}>
                            학번과 Finish Line 비밀번호를<br />
                            사용하여 로그인을 합니다.
                        </p>
                        <button
                            className={css(styles.loginButton)}
                            onClick={() => navigate('/loginPage')}
                        >
                            로그인
                        </button>
                    </div>

                    <img src={arrow} alt="화살표" className={css(styles.arrowImage)} />

                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <img src={subject} alt="기이수 과목 등록" className={css(styles.placeholder)} />
                        </div>
                        <h2 className={css(styles.stepTitle)}>기이수 과목 등록</h2>
                        <p className={css(styles.stepDescription)}>
                            가톨릭관동대 포털 종합정보시스템 ＞<br />
                            학적관리 ＞ 학기별 성적조회 및 출력 ＞ <br />
                            년도/학기 설정 및 검색 ＞<br />
                            인쇄 ＞ PDF 저장<br />
                            다운받은 PDF를 첨부하여<br />
                            기이수 과목을 등록합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            첨부한 PDF의 성적은 저장되지 않으며<br />
                            F와 NP 처리된 과목은 반영되지 않습니다.
                        </p>
                        <button
                            className={css(styles.subjectButton)}
                            onClick={() => openModal('졸업요건 검사')}
                        >
                            등록하기
                        </button>
                    </div>

                    <img src={arrow} alt="화살표" className={css(styles.arrowImage)} />

                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <img src={requirements} alt="졸업요건 검사" className={css(styles.placeholder)} />
                        </div>
                        <h2 className={css(styles.stepTitle)}>졸업요건 검사</h2>
                        <p className={css(styles.stepDescription)}>
                            기이수 과목의 학점과 <br />
                            입학년도의 교육과정 및 졸업요건을<br />
                            비교하여 부족한 영역의<br />
                            학점을 계산하여 보여줍니다.
                        </p>
                        <p className={css(styles.notice)}>
                            기이수 과목 등록을 먼저 진행해주세요.
                        </p>
                        <button
                            className={css(styles.requirementsButton)}
                            onClick={() => openModal('졸업요건 검사')}
                        >
                            결과보기
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    userGuideContainer: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: '#FFFEFB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
    },
    mainContent: {
        padding: '20px',
    },
    stepsSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        marginBottom: '50px',
        gap: '20px',
    },
    step: {
        textAlign: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '200px',
    },
    placeholder: {
        width: '120px',
        marginBottom: '15px',
    },
    arrowImage: {
        marginTop: '60px',
        width: '30px',
    },
    stepTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#000',
    },
    stepDescription: {
        fontSize: '12px',
        color: '#7A828A',
        lineHeight: '1.4',
        marginBottom: '8px',
    },
    notice: {
        fontSize: '11px',
        color: '#006277',
        marginBottom: '8px',
    },
    signupButton: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        marginTop: '30px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },
    loginButton: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        marginTop: '30px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },
    subjectButton: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        marginTop: '30px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },
    requirementsButton: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        marginTop: '30px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },
});

export default UserGuidePage;