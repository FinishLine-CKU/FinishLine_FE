import { useState, useEffect, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../utils/hooks/modalContext';
import axios from 'axios';
import { MAJOR, MICRO_DEGREE, SUBMAJORTYPE } from '../pages/signupPage2';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import Modal from '../components/modal';
import FeatureModal from '../components/featureModal';
import Symbol from '../assets/images/symbol.png';
import whiteCKULogo from '../assets/images/whiteCKULogo.png';

function MyPage() {
    const [major, setMajor] = useState();
    const [student_id, setStudent_id] = useState();
    const [sub_major_type, setSub_major_type] = useState();
    const [sub_major, setSub_major] = useState();
    const [micro_degree, setMicro_degree] = useState();
    const [editInfoCheck, setEditInfoCheck] = useState(false);
    const [removeInfoCheck, setRemoveInfoCheck] = useState(false);
    // const [additionalMajorType, setAdditionalMajorType] = useState();
    // const [additionalMajor, setAdditionalMajor] = useState('');
    // const [microDegree, setMicroDegree] = useState('');
    const navigate = useNavigate();
    const { modalState, featModalState, openModal, closeModal, openFeatModal, featButtonState, setFeatButtonState } = useContext(ModalContext);
    const myInfo = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/my_info/', {
            name : localStorage.getItem('name')
        });
        if (response.data.major && response.data.student_id) {
            if (response.data.sub_major_type && response.data.sub_major) {
                if (response.data.micro_degree) {
                    const { major, student_id, sub_major_type, sub_major, micro_degree } = response.data;
                    setMajor(MAJOR.find(item => item.value === major).label);
                    setStudent_id(student_id);
                    setSub_major_type(SUBMAJORTYPE.find(item => item.value === sub_major_type).label);
                    setSub_major(MAJOR.find(item => item.value === sub_major).label);
                    setMicro_degree(MICRO_DEGREE.find(item => item.value === micro_degree).label);
                } else {
                    const { major, student_id, sub_major_type, sub_major } = response.data;
                    setMajor(MAJOR.find(item => item.value === major).label);
                    setStudent_id(student_id);
                    setSub_major_type(SUBMAJORTYPE.find(item => item.value === sub_major_type).label);
                    setSub_major(MAJOR.find(item => item.value === sub_major).label);
                };
            } else {
                if (response.data.micro_degree) {
                    const { major, student_id, micro_degree } = response.data;
                    setMajor(MAJOR.find(item => item.value === major).label);
                    setStudent_id(student_id);
                    setMicro_degree(MICRO_DEGREE.find(item => item.value === micro_degree).label);
                } else {
                    const { major, student_id } = response.data;
                    setMajor(MAJOR.find(item => item.value === major).label);
                    setStudent_id(student_id);
                };
            };
        } else {
            const {error} = response.data;
            setMajor(error);
            setStudent_id(error);
        };
    };
    const removeMembership = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/remove_membership/', {
            name : localStorage.getItem('name')
        });
        if (response.data) {
            if (response.data.result === true) {
                localStorage.removeItem('name');
                closeModal();
                navigate("/loginPage");
            } else {
                alert('회원정보를 확인할 수 없습니다. 관리자에게 문의해주세요.');
            }
        } else {
            alert('서버가 불안정 합니다. 잠시 후 다시 시도해주세요.');
        }
    };
    const editCheckModal = () => {
        setEditInfoCheck(true);
        setFeatButtonState(true);
        openFeatModal();
    };
    const removeCheckModal = () => {
        setRemoveInfoCheck(true);
    };
    const noButtonFeatModal = () => {
        setEditInfoCheck(false);
        setFeatButtonState(false);
        openFeatModal();
    };
    const checkMajor = (e) => {
        const input = e.target.value
        if (input === MAJOR.find(item => item.label === major).value) {
            alert('주전공과 동일한 전공은 선택할 수 없습니다.');
            e.target.value = '';
            setSub_major(e.target.value);
        } else {
            setSub_major(input);
        };
    };

    useEffect(() => {
        myInfo();
    }, []);

    return (
        <>
            {modalState ? 
            removeInfoCheck ? 
            <Modal infoMessage="회원탈퇴" infoSymbol={Symbol} mainMessage="회원 탈퇴 되었습니다." contentMessage={<>FINISH LINE 을 이용해주셔서 감사합니다.</>} mainButton="확인" mainButtonAction={removeMembership} closeButton={removeMembership} />
            : <Modal infoMessage="회원탈퇴" infoSymbol={Symbol} mainMessage="정말 탈퇴하시겠습니까?" contentMessage={<>탈퇴 시 모든 회원정보는 <ins className={css(styles.point)}>삭제</ins>되며 복구가 <b>불가능</b>합니다.</>} mainButton="탈퇴하기" mainButtonAction={removeCheckModal} closeButton={closeModal} />
            : null}
            {featModalState ?
            editInfoCheck ?
            <FeatureModal title="내 정보" mainContents={
            <div className={css(styles.columnLayout)}>
                <div className={css(styles.startLayout)}>
                    <label className={css(styles.infoLable)}>이름</label>
                    <input className={css(styles.defaultInfo)} disabled="true" value={localStorage.getItem('name')}></input>
                    <label className={css(styles.infoLable)}>학과</label>
                    <input className={css(styles.defaultInfo)} disabled="true" value={major}></input>
                    <label className={css(styles.infoLable)}>학번</label>
                    <input className={css(styles.defaultInfo)} disabled="true" value={student_id}></input>
                </div>
                <div className={css(styles.startLayout)}>
                    <span className={css(styles.secTitle)}>추가 정보</span>
                </div>
                <div className={css(styles.startLayout)}>
                    <label className={css(styles.infoLable)}>복수/부/연계 전공</label>
                    <select className={css(styles.majorStatus)} value={sub_major_type} onChange={(e) => setSub_major_type(e.target.value)}>
                        <option value="">해당 없음</option>
                        <option value="double">복수전공</option>
                        <option value="minor">부전공</option>
                        <option value="linked">연계전공</option>
                    </select>
                    <select className={css(styles.majorSelect)} value={sub_major} onChange={checkMajor}>
                        { sub_major_type ? (
                            <>
                                <option value="">선택</option>
                                { MAJOR.map((item) => (
                                    <option value={item.value}>{item.label}</option>
                                )) }
                            </> ) : ( <option value=""></option> ) }
                    </select>
                    <label className={css(styles.infoLable)}>소단위전공</label>
                    <select className={css(styles.majorSelect)} value={micro_degree} onChange={(e) => setMicro_degree(e.target.value)}>
                        <option value="">해당 없음</option>
                        { MICRO_DEGREE.map((item) => (
                            <option value={item.value}>{item.label}</option>
                        )) }
                    </select>
                </div>
            </div>} buttonText="저장"/>
            : <FeatureModal title="학생 인증" mainContents={
                <div className={css(styles.certificationContainer)}>
                    <img src={whiteCKULogo} className={css(styles.univLogo)} />
                    <span className={css(styles.guideCertification)}><a href="https://info.cku.ac.kr/haksa/common/loginForm2.jsp" className={css(styles.ckuLoginLink)} target="_blank">가톨릭관동대학교 포털</a> 아이디와 비밀번호를 입력해주세요.</span>
                    <div className={css(styles.inputContainer)}>
                        <label className={css(styles.inputLabel)}>아이디</label>
                        <input className={css(styles.certificationInput)} type="text" placeholder="아이디를 입력하세요."></input>
                        <label className={css(styles.inputLabel)}>비밀번호</label>
                        <input className={css(styles.certificationInput)} type="password" placeholder="비밀번호를 입력하세요."></input>
                    </div>
                    <button className={css(styles.certificationButton)}>재학생 인증</button>
                </div>}/>
            : null}
            <Header />
            <Template title="마이페이지" />
            <div className={css(styles.container)}>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 정보</span>
                        <button className={css(styles.button)} onClick={editCheckModal}>수정</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>이름</span>
                            <span className={css(styles.content)}>{localStorage.getItem('name')}</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>학과</span>
                            <span className={css(styles.content)}>{major}</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>학번</span>
                            <span className={css(styles.content)}>{student_id}</span>
                        </div>
                        {sub_major && sub_major_type ?
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>{sub_major_type}</span>
                            <span className={css(styles.content)}>{sub_major}</span>
                        </div>
                        : null}
                        {micro_degree ? 
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>소단위전공</span>
                            <span className={css(styles.content)}>{micro_degree}</span>
                        </div>
                        : null}
                    </div>
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>졸업요건검사</span>
                        <button className={css(styles.button)}>자세히보기</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
                        <span className={css(styles.graduState)}>졸업까지 28학점 이수해야 합니다!</span>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>전공</span>
                            <span className={css(styles.graduContent)}>10학점 부족</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양필수</span>
                            <span className={css(styles.graduContent)}>봉사와 실천 (2학점)</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양선택</span>
                            <span className={css(styles.graduContent)}>인간과문학, 역사와사회, 철학과예술 중 4과목 (8학점)</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>일반선택</span>
                            <span className={css(styles.graduContent)}>6학점 부족</span>
                        </div>
                    </div>
                    
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 기이수과목</span>
                        <button className={css(styles.button)}>추가하기</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
                    </div>
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>계정 설정</span>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>비밀번호 변경</span>
                            <button className={css(styles.button)} onClick={noButtonFeatModal}>변경하기</button>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>회원탈퇴</span>
                            <button className={css(styles.button)} onClick={openModal}>탈퇴하기</button>
                        </div>
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
        gap: '30px',
        marginTop: '60px',
        marginBottom: '85px',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
    },
    boundaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E4E4E4',
        borderRadius: '15px',
        width: '565px',
    },
    titleArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '35px 45px 15px 45px',
    },
    title: {
        fontSize: '25px',
        fontFamily: 'Lato',
        fontWeight: '600'
    },
    button: {
        width: '70px',
        height: '25px',
        fontSize: '12px',
        fontFamily: 'Lato',
        fontWeight: '700',
        border: '1px solid #2B2A28',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#2B2A28',
            color: '#FFFEFB',
            transitionDuration: '0.2s',
        },
        ':active': {
            backgroundColor: '#595650',
            border: '2px solid #595650',
            color: '#FFFEFB',
        },
    },
    horizontal: {
        width: '478px',
        border: '1px solid #E4E4E4', 
        marginTop: '0px',
    },
    contentArea: {
        display: 'flex',
        flexDirection: 'column',
        padding: '25px 50px 42px 50px',
        gap: '30px'
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    contentTitle: {
        fontSize: '20px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: '#2B2A28'
    },
    content: {
        fontSize: '18px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: '#7A828A'
    },
    graduState: {
        fontSize: '20px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: 'red'
    },
    graduContent: {
        fontSize: '18px',
        fontFamily: 'Lato',
        fontWeight: '500',
        color: '#FF4921'
    },
    point: {
        color: '#FF4921'
    },
    columnLayout: {
        width: '100%',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    startLayout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    infoLable: {
        fontFamily: 'Lato',
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '8px',
    },
    defaultInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        // width: '424px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        backgroundColor: '#F6F6F6'
    },
    secTitle: {
        fontFamily: 'Lato',
        fontSize: '25px',
        fontWeight: '800',
        color: '#2B2A28'
    },
    majorStatus: {
        marginBottom: '10px',
        padding: '0 0 0 15px',
        // width: '425px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus':{
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    majorSelect: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
        height: '46px',
        border: '1px solid #CACACA',
        borderRadius: '6px',
        fontFamily: 'Lato',
        fontSize: '16px',
        fontWeight: '500',
        color: '#7A828A',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='%237A828A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        ':focus':{
            color: '#2B2A28',
            outline: '1px solid #2B2A28',
        },
    },
    certificationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    univLogo: {
        width: '134px',
    },
    guideCertification: {
        margin: '25px 0 25px 0',
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '15px',
        color: '#006277',
    },
    ckuLoginLink: {
        textDecoration: 'none',
        color: '#006277',
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
});

export default MyPage;