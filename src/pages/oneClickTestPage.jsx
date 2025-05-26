import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import resultMockup from '../assets/images/resultMockup.png';
import customSubjectMockup from '../assets/images/customSubjectMockup.png';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';

function OneClickTestPage() {
    const [agree, setAgree] = useState(true);
    const [studentId, setStudentId] = useState('');
    const [studentPW, setStudentPW] = useState('');
    const navigate = useNavigate();

    const oneClickTest = async () => {
        if (studentId === '' || studentPW === '') {
            alert("가톨릭관동대 포털 아이디와 비밀번호를 모두 입력해주세요.");
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/graduation/oneclick_test/', {
                    studentId: studentId,
                    studentPW: studentPW,
                });
                if (response.data.success) {
                    localStorage.setItem('oneClickTest', true);
                    navigate('/graduTestPage');
                    window.scrollTo(0, 0);
                } else {
                    const { error } = response.data;
                    alert(error);
                };
            } catch {
                alert("인증과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            };
        };
    };
    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            if (agree) {
                oneClickTest();
            } else {
                alert("이용약관 및 개인정보처리방침에 동의해주세요.");
            };
        }
    };
    
    return (
        <div className={css(styles.container)}>
            <Header />
            <Template title="원클릭 검사" subtitle="클릭 한 번으로 간편하게 졸업요건을 확인하세요."/>
            <div className={css(styles.contents)}>
                <div className={css(styles.divideHorizontal)}>
                    <div className={css(styles.textSide)}>
                        <span className={css(styles.featTitle)}>원클릭 검사</span>
                        <span className={css(styles.hookingTitle)}>복잡한 졸업요건,</span>
                        <span className={css(styles.hookingTitleEmpasize)}><span className={css(styles.redColorPoint)}>클릭 한 번</span>으로</span>
                        <span className={css(styles.hookingTitleEmpasize)}>빠르고 간편하게</span>
                        <span className={css(styles.contentsText)}>부족한 영역을 빠르게 확인하고</span><span className={css(styles.textInterval)}>추가계획까지 세워보세요.</span>
                    </div>
                    <div className={css(styles.imgSide)}>
                        <img src={resultMockup} className={css(styles.mockuupIMG)}></img>
                    </div>
                </div>
                <div className={css(styles.imgSide)}>
                    <div className={css(styles.partitionBackground)}>
                        <span className={css(styles.EmojiIcon)}>⏱️</span>
                        <span className={css(styles.meritTitle)}>간편하고 신속한 검사</span>
                        <span className={css(styles.meritContents)}>추가 절차없이 클릭 한 번으로</span><span className={css(styles.textInterval)}>부족한 학점과 영역을 파악할 수 있어요.</span>
                    </div>
                    <div className={css(styles.partitionBackground)}>
                        <span className={css(styles.EmojiIcon)}>🔐</span>
                        <span className={css(styles.meritTitle)}>민감정보 일회성 처리</span>
                        <span className={css(styles.meritContents)}>입력한 정보는 저장되지 않고</span><span className={css(styles.textInterval)}>안전하게 처리됩니다.</span>
                    </div>
                    <div className={css(styles.partitionBackground)}>
                        <span className={css(styles.EmojiIcon)}>📚</span>
                        <span className={css(styles.meritTitle)}>최소한의 데이터 수집</span>
                        <span className={css(styles.meritContents)}>종합정보시스템에서 검사에 필요한</span><span className={css(styles.textInterval)}>최소한의 정보만 크롤링합니다.</span>
                    </div>
                </div>
                <div className={css(styles.divideHorizontal)}>
                    <div className={css(styles.imgSide)}>
                        <img src={customSubjectMockup} className={css(styles.mockuupIMG)}></img>
                    </div>
                    <div className={css(styles.textSide)}>
                        <span className={css(styles.featTitle)}>기이수과목 커스텀</span>
                        <span className={css(styles.hookingTitleEmpasize)}><span className={css(styles.navyColorPoint)}>수강 예정 과목</span>을</span>
                        <span className={css(styles.hookingTitleEmpasize)}>직접 추가해서</span>
                        <span className={css(styles.hookingTitleEmpasize)}>검사해보세요</span>
                        <span className={css(styles.contentsText)}>현재 수강 중인 과목과</span><span className={css(styles.textInterval)}>다음 학기 수강 예정 과목을</span><span className={css(styles.textInterval)}>미리 반영해볼 수 있어요</span>
                    </div>
                </div>
                <div className={css(styles.oneClickArea)}>
                    <div className={css(styles.oneClickTestContainer)}>
                        <span className={css(styles.oneClickLabel)}>원클릭으로 검사하기</span>
                        <img src={whiteCKULogo} className={css(styles.univLogo)} />
                        <span className={css(styles.fastTestText)}><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" className={css(styles.ckuLoginLink)} target="_blank">가톨릭관동대학교 포털</a> 계정으로 빠르게 검사하세요.</span>
                        <span className={css(styles.safeGuideText)}>* 입력한 정보는 수강이력 조회 시에만 사용되며 저장되지 않습니다.</span>
                        <div className={css(styles.inputContainer)} onKeyDown={enterSubmit}>
                            <label className={css(styles.inputLabel)}>아이디</label>
                            <input className={css(styles.oneClickInput)} value={studentId} onChange={(e) => setStudentId(e.target.value)} type="text" placeholder="아이디를 입력하세요."></input>
                            <label className={css(styles.inputLabel)}>비밀번호</label>
                            <input className={css(styles.oneClickInput)} value={studentPW} onChange={(e) => setStudentPW(e.target.value)} type="password" placeholder="비밀번호를 입력하세요."></input>
                        </div>
                        <button className={css(styles.oneClickTestButton)} onClick={oneClickTest} disabled={!agree}>원클릭 검사 시작하기</button>
                        <span className={css(styles.subGuideMessage)}>가톨릭관동대 통합 로그인을 통해 검사에 필요한<br />최소한의 수강 이력 정보만을 활용합니다.</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFEFB'
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        gap: '100px',
        fontFamily: 'Lato',
        paddingBottom: '120px'
    },
    divideHorizontal: {
        display: 'flex',
        paddingTop: '100px',
        justifyContent: 'center'
    },
    textSide: {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px'
    },
    featTitle: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#006277',
        paddingBottom: '20px'
    },
    hookingTitle: {
        fontWeight: 'bold',
        fontSize: '30px',
        paddingBottom: '5px'
    },
    hookingTitleEmpasize: {
        fontWeight: 'bold',
        fontSize: '35px'
    },
    redColorPoint: {
        color: '#FF4921'
    },
    navyColorPoint: {
        color: '#3D5286'
    },
    contentsText: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#7A828A',
        paddingTop: '30px'
    },
    meritContents: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#7A828A',
        paddingTop: '10px'
    },
    textInterval: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#7A828A',
        paddingTop: '5px'
    },
    imgSide: {
        display: 'flex',
        justifyContent: 'center',
        gap: '22px'
    },
    mockuupIMG: {
        width: '623px',
    },
    partitionBackground: {
        width: '300px',
        height: '195px',
        backgroundColor: '#F6F7FA',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1), background-color 0.35s cubic-bezier(0.4,0,0.2,1)',
        ':hover': {
            boxShadow: '0 15px 30px 0 rgba(61,82,134,0.18), 0 2px 8px 0 rgba(0,0,0,0.04)',
            backgroundColor: '#FDFDFD',
            transform: 'translateY(-1px) scale(1)',
        }
    },
    EmojiIcon: {
        fontSize: '45px'
    },
    meritTitle: {
        fontSize: '22px',
        fontWeight: 'bold',
    },
    oneClickArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 0 0 0',
        gap: '65px',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
    },
    oneClickTestContainer: {
        width: '720px',
        height: '900px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 50px 3px rgba(0, 0, 0, 0.2)',
        borderRadius: '20px',
        paddingTop: '70px',
    },
    oneClickLabel: {
        fontSize: '24px',
        fontWeight: 'bold'
    },
    univLogo: {
        width: '182px',
        padding: '45px 0 37px 0'
    },
    fastTestText: {
        fontSize: '16px',
        color: '#2B2A28'
    },
    safeGuideText: {
        fontSize: '16px',
        color: '#006277',
        paddingTop: '10px',
        paddingBottom: '55px'
    },
    ckuLoginLink: {
        textDecoration: 'none',
        color: '#006277',
        fontWeight: '600',
        ':hover': {
            textDecoration: 'none'
        },
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputLabel: {
        margin: '0 0 8px 0',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        color: '#2B2A28',
    },
    oneClickInput: {
        margin: '0 0 24px 0',
        padding: '0 0 0 15px',
        width: '500px',
        height: '55px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '17px',
        fontWeight: '500',
        ':focus': {
            outline: '1px solid #2B2A28',
        }
    },
    oneClickTestButton: {
        margin: '16px 0 10px 0',
        width: '515px',
        height: '57px',
        border: '1px solid #006277',
        borderRadius: '10px',
        backgroundColor: '#006277',
        color: '#FFFEFB',
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
    subGuideMessage: {
        padding: '30px 0 50px 0',
        fontSize: '15px',
        color: '#7A828A',
        textAlign: 'center'
    },
});

export default OneClickTestPage;