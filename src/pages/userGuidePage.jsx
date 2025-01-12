import { StyleSheet, css } from "aphrodite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/header";
import Template from "../components/template";
import Footer from "../components/footer";

import certification from "../assets/images/certification.png";
import login from "../assets/images/login.png";
import subject from "../assets/images/subject.png";
import requirements from "../assets/images/requirements.png";
import arrow from "../assets/images/arrow.png";

const CommonButton = ({ text, onClick }) => (
    <button
        className={css(styles.commonButton)}
        onClick={onClick}
    >
        {text}
    </button>
);

CommonButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

function UserGuidePage() {
    const navigate = useNavigate();

    return (
        <div className={css(styles.userGuideContainer)}>
            <Header />
            <Template 
                title="이용 가이드" 
                subtitle={
                    <div>
                        FinishLine을 효과적으로 사용하는 방법을 안내합니다.<br />
                        아래의 안내에 따라 시스템을 사용해보세요.
                    </div>
                } 
            />

            <main className={css(styles.mainContent)}>
                <div className={css(styles.stepsSection)}>
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <img src={certification} alt="회원 가입 및 학생인증" className={css(styles.placeholder)} />
                        </div>
                        <h2 className={css(styles.stepTitle)}>회원가입 및 학생인증</h2>
                        <p className={css(styles.stepDescription)}>
                            대학 포털 ID/PW를 입력하여<br />
                            학생인증을 하고<br /><br />
                            추가 정보(어학 자격) 및 비밀번호를 <br />
                            설정하여 회원가입을 합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            학생 인증을 위해 입력한 비밀번호는<br />
                            학생 인증에만 사용되며 저장되지 않습니다.
                        </p>
                        <CommonButton 
                            text="회원가입"
                            onClick={() => navigate("/signupPage1")}
                        />
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
                        <CommonButton 
                            text="로그인"
                            onClick={() => navigate("/loginPage")}
                        />
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
                            인쇄 ＞ PDF 저장<br /><br />
                            다운받은 PDF를 첨부하여<br />
                            기이수 과목을 등록합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            첨부한 PDF의 성적은 저장되지 않으며<br />
                            F와 NP 처리된 과목은 반영되지 않습니다.
                        </p>
                        <CommonButton 
                            text="등록하기"
                            onClick={() => navigate("/subjectPage")}
                        />
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
                        <CommonButton 
                            text="결과보기"
                            onClick={() => navigate("/requirementsPage")}
                        />
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
        minHeight: '150vh',
    },
    mainContent: {
        padding: '50px',
    },
    stepsSection: {
        display: 'flex',
        justifyContent: 'center',   // 주 축 설정
        alignItems: 'flex-start',   // 교차 축 설정
        flexWrap: 'nowrap',
        gap: '15px', 
    },
    step: {
        textAlign: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '210px',  
        height: '450px', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',    // 축 설정
    },
    placeholder: {
        width: '200px',
    },
    arrowImage: {
        marginTop: '70px',
        width: '60px',
    },
    stepTitle: {
        fontSize: '25px', 
        fontWeight: '600',
        marginBottom: '20px', 
        whiteSpace: 'nowrap',       // 텍스트가 항상 한 줄로 유지
    },
    stepDescription: {
        fontSize: '15px', 
        color: '#7A828A',
        lineHeight: '1.6', 
        marginBottom: '40px',
        width: '150%',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    notice: {
        fontSize: '15px',
        color: '#006277',
        width: '150%',
        height: '1000px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    commonButton: {
        fontFamily: 'Lato',
        fontSize: '17px', 
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '8px',
        padding: '9px 32px', 
        cursor: 'pointer',              // 커서 "손 모양(👆)"
        position: 'absolute',
        top: '620px', 
        left: '50%',
        transform: 'translateX(-50%)',  // 가로 가운데 정렬
        whiteSpace: 'nowrap',           
       ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#595650',
        },
        ':disabled': {
            backgroundColor: '#d5d3d1',
            cursor: 'not-allowed',      // 커서 "금지 모양🚫"
            opacity: '0.7',
        },
    },
});

export default UserGuidePage;