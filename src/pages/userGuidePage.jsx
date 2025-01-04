import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import certification from '../assets/images/certification.png'; // 회원가입 및 학생인증
import login from '../assets/images/login.png'; // 로그인
import subject from '../assets/images/subject.png'; // 기이수 과목 등록
import requirements from '../assets/images/requirements.png'; // 졸업요건 검사
import arrow from '../assets/images/arrow.png'; // 화살표 이미지


function UserGuidePage() {
    const navigate = useNavigate(); // 누락된 navigate 선언 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [modalContent, setModalContent] = useState(''); // 모달 내용 관리

    const openModal = (content) => {
        setModalContent(content); // 클릭된 버튼에 따라 모달 내용 설정
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div className={css(styles.userGuideContainer)}>
            <Header additionalBoldLink="/userGuide" /> {/* 특정 링크 강조 */}

            <main className={css(styles.mainContent)}>

                {/* 상단 로고 및 타이틀 */}
                <div className={css(styles.logoSection)}>
                    <img src={logo2} alt="Finish Line Logo" className={css(styles.guideLogo)} />
                    <h1 className={css(styles.title)}>이용 가이드</h1>
                    <p className={css(styles.subtitle)}>
                        FinishLine을 효과적으로 사용하는 방법을 안내합니다.
                        <br />
                        아래의 안내에 따라 시스템을 사용해보세요.
                    </p>
                </div>

                {/* 주요 단계 섹션 */}
                <div className={css(styles.stepsSection)}>
                    {/* 회원가입 및 학생인증 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>

                            <img src={certification} alt="회원 가입 및 학생인증" className={css(styles.placeholder)} />

                        </div>
                        <h2 className={css(styles.stepTitle)}>회원가입 및 학생인증</h2>
                        <p className={css(styles.stepDescription)}>
                            대학 포털 ID/PW를 입력하여<br />
                            학생인증을 하고<br />
                            <br />
                            추가 정보(어학 자격) 및 비밀번호를 <br />
                            설정하여 회원가입을 합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            <br /><br />
                            학생 인증을 위해 입력한 비밀번호는<br />
                            학생 인증에만 사용되며 저장되지 않습니다.
                        </p>
                        {/* 회원가입 버튼 */}
                        <button
                            className={css(styles.signupButton)}
                            onClick={() => navigate('/회원가입 링크')}
                        >
                            회원가입
                        </button>
                    </div>

                    <img src={arrow} alt="화살표" className={css(styles.arrowImage)} />

                    {/* 로그인 */}
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

                    {/* 기이수 과목 등록 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>


                            <img src={subject} alt="기이수 과목 등록" className={css(styles.placeholder)} />

                        </div>
                        <h2 className={css(styles.stepTitle)}>기이수 과목 등록</h2>
                        <p className={css(styles.stepDescription)}>
                            가톨릭관동대 포털 종합정보시스템 ＞<br />
                            학적관리 ＞ 학기별 성적조회 및 출력 ＞ <br />
                            년도/학기 설정 및 검색 ＞<br />
                            인쇄 ＞ PDF 저장
                            <br />
                            <br />
                            다운받은 PDF를 첨부하여<br />
                            기이수 과목을 등록합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            첨부한 PDF의 성적은 저장되지 않으며<br />
                            F와 NP 처리된 과목은 반영되지 않습니다.
                        </p>
                        <button
                            className={css(styles.subjectButton)}
                            onClick={() => openModal('졸업요건 검사')} // 모달 열기
                        >
                            등록하기
                        </button>

                    </div>

                    <img src={arrow} alt="화살표" className={css(styles.arrowImage)} />

                    {/* 졸업요건 검사 */}
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
                            <br />
                            <br />
                            <br />
                            <br />
                            기이수 과목 등록을 먼저 진행해주세요.
                        </p>
                        <button
                            className={css(styles.requirementsButton)}
                            onClick={() => openModal('졸업요건 검사')} // 모달 열기
                        >
                            결과보기
                        </button>
                    </div>
                </div>
            </main>

            {/* 모달 컴포넌트 */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2>{modalContent}</h2>
                    <p>이 모달은 "{modalContent}" 버튼을 눌렀을 때 열립니다.</p>
                </Modal>
            )}
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
        minHeight: '150vh',

    },
    mainContent: {
        padding: '40px 20px',
    },
    logoSection: {
        marginBottom: '40px',
    },
    guideLogo: {
        display: 'block',
        margin: '0 auto 0px',
        height: '130px',
    },

    // 이용 가이드
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '10px',
    },

    // 이용 가이드 아래 설명
    subtitle: {
        fontSize: '14px',
        color: '#7A828A',
        lineHeight: '1.5',

    },

    // 이용가이드 과정 전체 섹션
    stepsSection: {
        display: 'flex', // Flexbox로 변경
        justifyContent: 'space-between', // 요소 간의 간격을 균등 배치
        alignItems: 'flex-start', // 텍스트와 이미지를 위쪽 정렬
        flexWrap: 'nowrap', // 줄바꿈 방지
        marginBottom: '100px',


    },

    // 이용가이드 과정 별 세로 섹션
    step: {
        textAlign: 'center', // 텍스트 정렬
        alignItems: 'center', // 텍스트와 버튼을 가운데 정렬
        padding: '40px',


    },

    // 회원가입 및 학생인증, 로그인, 기이수 과목 등록, 졸업요건 검사 이미지
    placeholder: {
        width: '178px',
    },

    // 화살표 이미지
    arrowImage: {
        marginTop: '120px',
        width: '40px',
    },

    // 회원가입 및 학생인증, 로그인, 기이수 과목 등록, 졸업요건 검사
    stepTitle: {
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#000',
    },

    // 회색 설명
    stepDescription: {
        fontSize: '14px',
        color: '#7A828A',
        lineHeight: '1.5',
        marginBottom: '10px',

    },

    // 청록색 설명
    notice: {
        fontSize: '13px',
        color: '#006277',
        marginBottom: '10px',
    },

    // 회원가입 및 학생인증 버튼
    signupButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '69px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },

    // 로그인 버튼
    loginButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 25px',
        cursor: 'pointer',
        marginTop: '213px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },

    // 기이수 과목 등록 버튼
    subjectButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '61px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },

    // 졸업요건 검사 버튼
    requirementsButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '72px',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },


});

export default UserGuidePage;