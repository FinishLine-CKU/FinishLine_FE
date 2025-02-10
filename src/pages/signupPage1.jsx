import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { ModalContext } from '../utils/hooks/modalContext';
import axios from 'axios';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import FeatureModal from '../components/featureModal';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';
import loading from '../assets/images/loading.gif';

function SignupPage1() {
    const [agree, setAgree] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [studentPW, setStudentPW] = useState('');
    const navigate = useNavigate();
    const { featModalState, setFeatButtonState, openFeatModal, closeFeatModal, featCloseButton, setFeatCloseButton } = useContext(ModalContext);
    const checkedState = (e) => {
        setAgree(e.target.checked);
    };
    const studentAuth = async () => {
        setFeatButtonState(false);
        setFeatCloseButton(false);
        openFeatModal();
        if (studentId === '' || studentPW === '') {
            alert("가톨릭관동대 포털 아이디와 비밀번호를 모두 입력해주세요.");
        } else {
            try {
                const response = await axios.post('http://3.36.58.79:8000/user/student_auth/', {
                    studentId : studentId,
                    studentPW : studentPW,
                });
                if (response.data.student_id && response.data.name && response.data.major) {
                    const { student_id, name, major } = response.data;
                    closeFeatModal();
                    navigate('/signupPage2', { state: { student_id, name, major}});
                    window.scrollTo(0, 0);
                } else {
                    const { error } = response.data;
                    closeFeatModal();
                    alert(error);
                };
            } catch {
                closeFeatModal();
                alert("인증과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            };
        };
    };
    useEffect(() => {
        if (localStorage.getItem('idToken')) {
            navigate("/userGuidePage");
        }
    }, []);
    
    return (
        <>
            {featModalState ? 
            <FeatureModal closeAction={closeFeatModal} mainContents={
                <div className={css(styles.modalContainer)}>
                    <div className={css(styles.icons)}>
                        <img src={whiteCKULogo} className={css(styles.ckuLogo)}/>
                        <img src={loading} className={css(styles.loadingGIF)}/>
                    </div>
                    <div className={css(styles.modalTitleContainer)}>
                        <span className={css(styles.modalTitle)}>재학생 확인 중...</span>
                    </div>
                    <div className={css(styles.infoMessageContainer)}>
                        <span className={css(styles.infoMessage)}>5초 정도 소요됩니다. 잠시만 기다려주세요.</span>
                    </div>
                </div>
            }/>
            : null}
            <Header />
            <Template title="회원가입" subtitle="졸업요건 검사 서비스 이용을 위해 약관 동의와 학생 인증 절차가 필요합니다."/>
            <div className={css(styles.container)}>
                <div className={css(styles.policyArea)}>
                    <span className={css(styles.containerTitle)}>이용약관 및 개인정보처리방침</span>
                    <div className={css(styles.policyContainer)}>
                        <span className={css(styles.contentTitle)}>이용약관</span>
                        <p className={css(styles.policyContent)}>
                            1. 본 서비스는 가톨릭관동대학교 소프트웨어학과 학생들이 운영하는 웹 사이트로 공식적인 효력을 갖지 않습니다.<br/>
                            정확한 졸업사정 확인을 위해 <b className={css(styles.emphasizeText)}>소속 단과대 교학팀에서 2차 검증을 권장합니다.</b><br/><br/>
                            2. 현재 검사 가능한 학과-학번은 다음과 같습니다. 검사대상에 속하지 않다면 검사가 불가능합니다. <b className={css(styles.emphasizeText)}>꼭 검사대상인지 확인하세요!</b><br/>
                            <b>- 학과 : <b className={css(styles.emphasizeText)}>의과대학, 헬스케어융합대학, 휴먼서비스대학, 23년도이전학과, </b> <b className={css(styles.redText)}>트리니티자유대학, 사범대학(불가)</b></b><br/>
                            <b>- 학번 : <b className={css(styles.emphasizeText)}>18 ~ 22학번</b></b><br/><br/>
                            3. <b className={css(styles.emphasizeText)}>교직이수자, 편입학 대상자</b>의 졸업검사 기준은 포함되지 않아 검사가 불가능합니다.<br/><br/>
                            4. 원활한 검사를 위해 <b className={css(styles.emphasizeText)}>PC환경</b>에서 진행할 것을 권장합니다.<br/><br/>
                            5. 검사 기준은 <b className={css(styles.emphasizeText)}>2024학년도 2학기</b> 교육과정을 기준으로 합니다.<br/><br/>
                            6. 졸업요건 기준이 잘못 설정되거나, 오류 발생 시 <a href="https://naver.me/FHlQ2NqP" className={css(styles.feedback)}>하단 폼 링크</a>를 통해 피드백 부탁드립니다.<br/><br/>
                        </p>
                        <span className={css(styles.contentTitle)}>개인정보처리방침</span>
                        <p className={css(styles.policyContent)}>
                            가톨릭관동대학교 소프트웨어학과 개발팀 FinishLine(이하 ‘FinishLine’라 한다)는 개인정보 보호법 제30조에 따라 사용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.<br/>
                            본 사이트는 회원가입 및 학생 인증을 위해 다음과 같은 개인정보를 수집합니다.<br/><br/>
                            <strong>제1조 (개인정보의 처리목적)</strong><br/>
                            FinishLine은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/><br/>
                            1. 홈페이지 회원 가입 및 관리<br/>
                            회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 각종 고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.<br/><br/>
                            2. 재화 또는 서비스 제공<br/>
                            서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.<br/><br/>
                            <strong>제2조 (개인정보의 처리 및 보유기간)</strong><br/>
                            ① FinishLine은 법령에 따른 개인정보 보유, 이용 기간 또는 사용자로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.<br/>
                            ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/><br/>
                            1. 홈페이지 회원 가입 및 관리 : 홈페이지 탈퇴 시까지<br/>
                            다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지<br/>
                            1) 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당 수사, 조사 종료 시까지<br/><br/>
                            <strong>제3조(처리하는 개인정보 항목)</strong><br/>
                            FinishLine은 다음의 개인정보 항목을 처리하고 있습니다.<br/><br/>
                            1. 홈페이지 회원 가입 및 관리<br/>
                            필수항목 : 성명, 학과, 학번, 비밀번호<br/>
                            선택항목 : 복수전공, 부전공, 연계전공, 소단위전공<br/><br/>
                            2. 서비스 제공<br/>
                            필수항목 : 기이수과목, 학점<br/><br/>
                            <strong>제4조(개인정보의 파기)</strong><br/>
                            ① FinishLine은 개인정보 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/>
                            ② 사용자로부터 동의받은 개인정보 보유 기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br/>
                            ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br/>
                            1. 파기 절차<br/>
                            FinishLine은 파기 사유가 발생한 개인정보를 선정하고, FinishLine의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br/>
                            2. 파기 방법<br/>
                            FinishLine은 전자적 파일 형태로 기록․저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록․저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.<br/><br/>
                            <strong>제5조(개인정보의 안전성 확보조치)</strong><br/>
                            FinishLine은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 하고 있습니다.<br/>
                            1. 관리적 조치 : 내부관리계획 수립 및 시행<br/>
                            2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 고유 식별정보 등의 암호화<br/><br/>
                            <strong>제6조(개인정보 보호책임자)</strong><br/>
                            ① FinishLine은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 사용자의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/><br/>
                            ▶ 개인정보 보호책임자<br/>
                            성명 : 황선규<br/>
                            연락처 : sun30126331@gmail.com<br/><br/>
                            ② 사용자는 FinishLine의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다. FinishLine은 사용자의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.<br/><br/>
                            <strong>제7조(권익침해 구제 방법)</strong><br/>
                            사용자는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.<br/>
                            1. 개인정보 분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)<br/>
                            2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)<br/>
                            3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)<br/>
                            4. 경찰청 : (국번없이) 182 (ecrm.police.go.kr/minwon/main)<br/><br/>
                            <strong>제8조(개인정보 처리방침 시행 및 변경)</strong><br/>
                            이 개인정보 처리방침은 2025. 01. 20. 부터 적용됩니다.
                        </p>
                    </div>
                    <label className={css(styles.agreementContainer)}>
                        <input type="checkbox" className={css(styles.agreementCheckbox)} checked={agree} onChange={checkedState}></input>
                        <span className={css(styles.agreementDiscription)}>이용약관 및 개인정보처리방침에 동의합니다.</span>
                    </label>
                </div>
                <div className={css(styles.certificationArea)}>
                    <span className={css(styles.containerTitle)}>학생인증</span>
                    <div className={css(styles.certificationContainer)}>
                        <img src={whiteCKULogo} className={css(styles.univLogo)} />
                        <span className={css(styles.guideCertification)}><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" className={css(styles.ckuLoginLink)} target="_blank">가톨릭관동대학교 포털</a> 아이디와 비밀번호를 입력해주세요.</span>
                        <div className={css(styles.inputContainer)}>
                            <label className={css(styles.inputLabel)}>아이디</label>
                            <input className={css(styles.certificationInput)} value={studentId} onChange={(e) => setStudentId(e.target.value)} type="text" placeholder="아이디를 입력하세요."></input>
                            <label className={css(styles.inputLabel)}>비밀번호</label>
                            <input className={css(styles.certificationInput)} value={studentPW} onChange={(e) => setStudentPW(e.target.value)} type="password" placeholder="비밀번호를 입력하세요."></input>
                        </div>
                        <button className={css(styles.certificationButton)} onClick={studentAuth} disabled={!agree}>재학생 인증</button>
                        <span className={css(styles.exception)}>가톨릭관동대 통합 로그인을 통해 학생인증이 진행됩니다. 약관 동의 후 인증을 진행해주세요.</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '50px 0 0 0',
        gap: '65px',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
    },
    policyArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        width: '736px',
    },
    containerTitle: {
        display: 'flex',
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '18px',
    },
    policyContainer: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        margin: '20px 0 0 0',
        padding: '30px 15px 30px 15px',
        maxHeight: '300px',
        overflow: 'scroll',
        backgroundColor: '#fff',
    },
    contentTitle: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '16px',
    },
    policyContent: {
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '14px',
        color: '#2B2A28',
        marginLeft: '4px',
        marginRight: '4px',
    },
    emphasizeText: {
        fontWeight: '600',
        color: '#006277',
    },
    redText: {
        fontWeight: '600',
        color: '#FFB2A2',
    },
    feedback: {
        color: '#006277',
    },
    agreementContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '12px 0 5px 0',
        ':hover': {
            cursor: 'pointer'
        }
    },
    agreementCheckbox: {
        zoom: '1.3',
    },
    agreementDiscription: {
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        ':hover': {
            fontWeight: '600',
        }
    },
    certificationArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        width: '736px',
        gap: '10px',
    },
    certificationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    univLogo: {
        width: '182px',
    },
    guideCertification: {
        margin: '25px 0 25px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#7A828A',
    },
    ckuLoginLink: {
        textDecoration: 'none',
        color: '#7A828A',
        ':hover': {
            textDecoration: 'underline'
        },
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    inputLabel: {
        margin: '0 0 8px 0',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: '500',
        color: '#2B2A28',
    },
    certificationInput: {
        margin: '0 0 24px 0',
        padding: '0 0 0 15px',
        width: '415px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        ':focus': {
            outline: '1px solid #2B2A28',
        }
    },
    certificationButton: {
        margin: '16px 0 10px 0',
        width: '430px',
        height: '48px',
        border: '2px solid #2B2A28',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '700',
        ':hover:not(:disabled)': {
            cursor: 'pointer',
            backgroundColor: '#2B2A28',
            color: '#FFFEFB',
            transitionDuration: '0.2s',
        },
        ':active:not(:disabled)': {
            backgroundColor: '#595650',
            border: '2px solid #595650',
            color: '#FFFEFB',
        },
        ':disabled': {
            color: '#CACACA',
            border: '2px solid #CACACA',
        },
    },
    exception: {
        margin: '0 0 118px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#006277',
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        width: '100%'
    },
    ckuLogo: {
        width: '168px'
    },
    loadingGIF: {
        position: 'absolute',
        zIndex: '1001',
        width: '177px',
        marginTop: '40px',
        marginLeft: '90px'
    },
    modalTitleContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '30px 0 20px 0'
    },
    modalTitle: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '30px',
        color: '#2B2A28'
    },
    infoMessageContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '80px'
    },
    infoMessage: {
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '20px',
        color: '#006277'
    }
})

export default SignupPage1;