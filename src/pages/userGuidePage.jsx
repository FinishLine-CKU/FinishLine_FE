import { useState, useContext } from 'react';
import { StyleSheet, css } from "aphrodite";
import { useNavigate } from "react-router-dom";
import { ModalContext } from '../utils/hooks/modalContext';
import Header from "../components/header";
import Template from "../components/template";
import Footer from "../components/footer";
import Modal from '../components/modal';
import Symbol from '../assets/images/symbol.png';
import graduationCap from '../assets/images/graduationCap.png';
import resultMockup from '../assets/images/resultMockup.png';
import groupMockup from '../assets/images/groupMockup.png';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';
import pdfFilesIcon from '../assets/images/pdfFilesIcon.png';
import testResult from '../assets/images/testResult.png';
import oneClickIcon from '../assets/images/oneClickIcon.png';

function UserGuidePage() {
    const navigate = useNavigate();
    const [selectCategory, setSelectCategory] = useState("oneClick");
    const { modalState, openModal, closeModal } = useContext(ModalContext);
    const navigateUploadPDF = () => {
        navigate("/uploadpdf");
        window.scrollTo(0, 0);
    };

    const navigateLoginPage = () => {
        document.body.style.overflow = 'auto';
        navigate("/loginPage");
        closeModal();
    };

    const navigateDoneLecture = () => {
        navigate("/donelecture");
        window.scrollTo(0, 0);
    };

    return (
        <>
            {modalState ?
                <Modal infoMessage="로그인 안내" infoSymbol={Symbol} mainMessage="로그인이 필요한 서비스입니다." contentMessage={<><b>학생 인증을 완료한 회원</b>만 이용 가능합니다.<br />서비스 이용을 위해 로그인 해주세요.</>} mainButton="로그인" mainButtonAction={navigateLoginPage} closeButton={closeModal} />
                : null}
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
                    <div className={css(styles.categoryLayout)}>
                        <div className={css(styles.categoryContainer)}>
                            <div className={css(styles.categoryMovingZone)}>
                                <div className={css(selectCategory === "oneClick" ? styles.categoryActiveButtons : styles.categoryButtons)} onClick={() => setSelectCategory("oneClick")}>
                                    <span className={css(styles.categoryLabel)}>원클릭검사</span>
                                </div>
                                <div className={css(selectCategory === "graduation" ? styles.categoryActiveButtons : styles.categoryButtons)} onClick={() => setSelectCategory("graduation")}>
                                    <span className={css(styles.categoryLabel)}>졸업요건검사</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css(styles.guideLayoutContainer)}>
                        {selectCategory === "oneClick" ?
                        <>
                            <div className={css(styles.featureInfoContainer)}>
                                <div className={css(styles.titleContainer)}>
                                    <img src={oneClickIcon} className={css(styles.titleEmoji)} />
                                    <span className={css(styles.titleText)}>원클릭 검사</span>
                                </div>
                                <div className={css(styles.titleContainer)}>
                                    <span className={css(styles.hashTage)}># PC/모바일 이용가능</span>
                                    <span className={css(styles.hashTage)}># 계절학기 반영</span>
                                    <span className={css(styles.hashTage)}># 빠르고 간편한 검사</span>
                                </div>
                            </div>
                            <div className={css(styles.bannerContainer)}>
                                <div className={css(styles.bannerTextContainer)}>
                                    <span className={css(styles.titleTextBold)}>18~25학번 전체학과 검사 지원</span>
                                    <span className={css(styles.subTitleText)}>모바일에서도 원클릭검사로 쉽고 빠르게<br />졸업 학점을 계산해보세요.</span>
                                </div>
                                <img src={groupMockup} className={css(styles.groupMockupImg)} />
                            </div>
                            <div className={css(styles.processContainer)}>
                                <img src={whiteCKULogo} className={css(styles.processIconPadding)} />
                                <div className={css(styles.featureContainer)}>
                                    <span className={css(styles.indexTitle)}>#1</span>
                                    <span className={css(styles.featTitle)}>가톨릭관동대 포털 정보 입력</span>
                                    <p className={css(styles.featComment)}>
                                        원클릭 검사 페이지에서 <strong>학교 포털 정보</strong>를 입력하여 학점을 계산합니다.<br />
                                        원격 로그인을 통해 이수과목 정보를 가져오며 입력한 정보는 저장되지 않습니다.<br />
                                        
                                    </p>
                                    <button className={css(styles.featButton)}
                                        onClick={localStorage.getItem('idToken') ? () => { navigate("/oneClickTestPage"); window.scrollTo({top: 0, behavior: "smooth"}); } : openModal}>입력하기
                                    </button>
                                </div>
                            </div>
                            <div className={css(styles.processContainer)}>
                                <div className={css(styles.featureContainer)}>
                                    <span className={css(styles.indexTitle)}>#2</span>
                                    <span className={css(styles.featTitle)}>학점계산 결과 확인</span>
                                    <p className={css(styles.featComment)}>
                                        <strong>계절학기</strong>를 포함한 <strong>모든 수강 정보</strong>를 바탕으로 검사를 진행합니다.<br />
                                        <strong>최신 교육과정 및 학점이수 안내표</strong>를 참고하여 졸업학점 및 부족영역을 계산합니다.<br />
                                        (*검사결과는 참고용으로 반드시 학사운영팀/교학팀에서 교차 검증하세요.)
                                    </p>
                                    <button className={css(styles.featButton)}
                                        onClick={localStorage.getItem('idToken') ? (localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest')) ? () => { navigate("/graduTestPage"); window.scrollTo(0, 0); } : () =>{ alert("원클릭 검사 진행 후 결과를 확인하세요."); } : openModal}>결과보기
                                    </button>
                                </div>
                                <img src={testResult} className={css(styles.processIcon)} />
                            </div>
                        </> :
                        <>
                            <div className={css(styles.featureInfoContainer)}>
                                <div className={css(styles.titleContainer)}>
                                    <img src={graduationCap} className={css(styles.titleEmoji)} />
                                    <span className={css(styles.titleText)}>졸업요건검사</span>
                                </div>
                                <div className={css(styles.titleContainer)}>
                                    <span className={css(styles.hashTage)}># PC 전용 검사</span>
                                    <span className={css(styles.hashTage)}># 기이수과목 PDF 첨부</span>
                                    <span className={css(styles.hashTage)}># 원하는 학기만 반영 가능</span>
                                </div>
                            </div>
                            <div className={css(styles.bannerContainer)}>
                                <div className={css(styles.bannerTextContainer)}>
                                    <span className={css(styles.titleTextBold)}>18~25학번 전체 학과 검사 지원</span>
                                    <span className={css(styles.subTitleText)}>안내에 따라 기이수과목 PDF 파일을 첨부하고<br />부족학점을 계산해보세요.</span>
                                </div>
                                <img src={resultMockup} className={css(styles.mockupImg)} />
                            </div>
                            <div className={css(styles.processContainer)}>
                                <img src={pdfFilesIcon} className={css(styles.processIcon)} />
                                <div className={css(styles.featureContainer)}>
                                    <span className={css(styles.indexTitle)}>#1</span>
                                    <span className={css(styles.featTitle)}>기이수과목 등록</span>
                                    <p className={css(styles.featComment)}>
                                        <strong>종합정보시스템 - 학기별 성적 조회 메뉴</strong>에서 제공하는 기이수과목 PDF 파일을 첨부합니다.<br />
                                        PDF 저장 시 "인쇄" 버튼 클릭 후 <strong>"PDF로 저장"</strong>을 선택하여 저장해주세요. <br />
                                        계절학기는 PDF 파일이 제공되지 않으니 원클릭 검사를 이용해주세요.<br />
                                    </p>
                                    <button className={css(styles.featButton)}
                                        onClick={localStorage.getItem('idToken') ? (localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest')) ? navigateDoneLecture : navigateUploadPDF : openModal}>등록하기
                                    </button>
                                </div>
                            </div>
                            <div className={css(styles.processContainer)}>
                                <div className={css(styles.featureContainer)}>
                                    <span className={css(styles.indexTitle)}>#2</span>
                                    <span className={css(styles.featTitle)}>졸업요건검사</span>
                                    <p className={css(styles.featComment)}>
                                        <strong>최신 교육과정 및 학점이수 안내표</strong>를 참고하여 졸업학점 및 부족영역을 계산합니다.<br />
                                        (*검사결과는 참고용으로 반드시 학사운영팀/교학팀에서 교차 검증하세요.)
                                        
                                    </p>
                                    <button className={css(styles.featButton)}
                                        onClick={localStorage.getItem('idToken') ? (localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest')) ? () => { navigate("/graduTestPage"); window.scrollTo(0, 0); } : () =>{ alert("기이수과목 등록을 먼저 진행해주세요."); } : openModal}>결과보기
                                    </button>
                                </div>
                                <img src={testResult} className={css(styles.processIcon)} />
                            </div>
                        </>}
                    </div>
                </main>
                <Footer />
            </div>
        </>
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
    },
    mainContent: {
        padding: '40px 250px 200px 250px',
        whiteSpace: 'nowrap'
    },
    categoryLayout: {
        display:'flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        paddingBottom: '30px'
    },
    categoryContainer: {
        display:'flex',
        width: '220px',
        minWidth: '220px',
        height: '45px',
        backgroundColor: '#ECECEC',
        borderRadius: '100px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px'
    },
    categoryMovingZone: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    categoryActiveButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        borderRadius: '100px',
        backgroundColor: '#FFFEFB',
        color: '#2B2A28',
        fontWeight: '600',
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: '50% 50% 0',
        transform: 'translateX(0%)',
        boxShadow: '2px 2px 8px 1px rgba(0,0,0,0.1)',
    },
    categoryButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        color: '#8F8F8F',
        fontWeight: '600',
        transition: 'transform 0.3s ease-in-out',
        transformOrigin: '50% 50% 0',
    },
    categoryLabel: {
        fontSize: '15px'
    },
    guideLayoutContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '50px'
    },
    featureInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
        paddingLeft: '50px'
    },
    featureContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px'
    },
    titleContainer: {
        display: 'flex',
        gap: '10px'
    },
    titleEmoji: {
        width: '35px',
        height: '35px'
    },
    titleText: {
        fontFamily: 'Lato',
        fontSize: '30px',
        fontWeight: '700'
    },
    titleTextBold: {
        fontFamily: 'Lato',
        fontSize: '30px',
        fontWeight: '800'
    },
    subTitleText: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '18px',
        color: '#7A828A',
        textAlign: 'left'
    },
    hashTage: {
        fontWeight: '700',
        color: '#3D5286'
    },
    bannerContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        backgroundColor: '#F6F7FA', // # F6F7FA E7EDFF
        borderRadius: '20px',
        padding: '40px',
        width: '100%-80px',
        minWidth: '100%-80px'
    },
    bannerTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '10px'
    },
    mockupImg: {
        width: '360px',
    },
    groupMockupImg: {
        width: '400px',
    },
    processContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    processIcon: {
        width: '250px',
    },
    processIconPadding: {
        width: '160px',
        padding: '45px'
    },
    indexTitle: {
        fontFamily: 'Lato',
        fontSize: '45px',
        fontWeight: '700',
        color: '#7A828A'
    },
    featTitle: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '700'
    },
    featComment: {
        textAlign: 'start',
        color: '#7A828A'
    },
    featButton: {
        fontFamily: 'Lato',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '8px',
        padding: '9px 32px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#595650',
        },
        ':disabled': {
            backgroundColor: '#d5d3d1',
            cursor: 'not-allowed',
            opacity: '0.7',
        },
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: '500px',
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