import { useState, useEffect, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../utils/hooks/modalContext';
import { DoneSubComponents } from '../components/doneLectureComponents';
import { MAJOR, MICRO_DEGREE, SUBMAJORTYPE } from '../pages/signupPage2';
import axios from 'axios';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';
import Modal from '../components/modal';
import FeatureModal from '../components/featureModal';
import Symbol from '../assets/images/symbol.png';

function MyPage() {
    const [major, setMajor] = useState();
    const [student_id, setStudent_id] = useState();
    const [sub_major_type, setSub_major_type] = useState(null);
    const [sub_major, setSub_major] = useState(null);
    const [micro_degree, setMicro_degree] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState('');
    const [checkError, setCheckError] = useState('');
    const [closeButtonState, setCloseButtonState] = useState(false);
    const [passwordStateCheck, setPasswordStateCheck] = useState(false);
    const [editInfoCheck, setEditInfoCheck] = useState(false);
    const [removeInfoCheck, setRemoveInfoCheck] = useState(false);
    const [successChangePW, setSuccessChangePW] = useState(false);
    const [myLectureList, setMyLectureList] = useState([]);
    const navigate = useNavigate();
    const { modalState, featModalState, openModal, closeModal, openFeatModal, closeFeatModal, setFeatButtonState, setFeatCloseButton } = useContext(ModalContext);
    const myInfo = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/my_info/', {
            idToken : localStorage.getItem('idToken')
        });
        if (response.data.major && response.data.student_id) {
            if (response.data.sub_major_type && response.data.sub_major) {
                if (response.data.micro_degree) {
                    const { major, student_id, sub_major_type, sub_major, micro_degree } = response.data;
                    setMajor(MAJOR.find(item => item.value === major)?.label);
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
    const myLectureUpdate = async () => {
        const userId = localStorage.getItem('idToken');
        try {
          const response = await axios.get(`http://127.0.0.1:8000/graduation/api/mydonelecture?user_id=${userId}`);
          setMyLectureList(response.data);
        } catch (error) {
          setError('기이수과목 정보를 가져오는데 실패했습니다.');
          console.error('Error fetching data: ', error);
        }
      };
    const closeButtonAction = () => {
        setEditInfoCheck(false);
        closeFeatModal();
    };
    const removeMembership = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/remove_membership/', {
            idToken : localStorage.getItem('idToken')
        });
        if (response.data) {
            if (response.data.result === true) {
                localStorage.clear();
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
        setFeatButtonState(true);
        openFeatModal();
    };
    const passwordCheck = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/check_register/', {
            studentId : student_id,
            password : password
        });
        if (response.data.idToken === localStorage.getItem('idToken')) {
            setPasswordStateCheck(true);
            setPassword('');
            closeFeatModal();
            openFeatModal();
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };
    const passwordFormat = (e) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!#^%*?&])[a-zA-Z\d@$!#^%*?&]{8,20}$/;
        const input = e.target.value;
        setPassword(input)
        if (input ===  ''){
            setError('비밀번호를 입력하세요.');
        } else {
            if (regex.test(input)){
                setError('');
            } else {
                setError('비밀번호 형식이 올바르지 않습니다.');
            }
        };
    };
    const passwordCorrect = (e) => {
        const input = e.target.value;
        setCheckPassword(input);
        if (password !== '') {
            if (password === input) {
                setCheckError('');
            } else {
                setCheckError('비밀번호가 일치하지 않습니다.');
            };
        } else {
            setError('비밀번호 필수 입력');
        };
    };
    const saveNewPassword = () => {
        if (error === '' && checkError === '') {
            newPassword();
        } else return;
    };
    const newPassword = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/change_pw/', {
            studentId : student_id,
            password : password
        });
        if (response.data.success) {
            setSuccessChangePW(true);
            closeFeatModal();
        }
        else {
            const { error } = response.data;
            alert(error);
        };
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
    const noticeChangePW = () => {
        setSuccessChangePW(false);
        closeModal();
    };
    const translateInfo = () => {
        setSub_major_type(SUBMAJORTYPE.find(item => item.value === sub_major_type)?.label || sub_major_type);
        setSub_major(MAJOR.find(item => item.value === sub_major)?.label || sub_major);
        setMicro_degree(MICRO_DEGREE.find(item => item.value === micro_degree)?.label || micro_degree);
        newInfo();
    };
    const newInfo = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/change_info/', {
            studentId : student_id,
            sub_major_type: sub_major_type,
            sub_major : sub_major,
            micro_degree: micro_degree
        });
        if (response.data.success) {
            closeFeatModal();
        }
        else {
            const { error } = response.data;
            alert(error);
        };
    };
    const lackCredit = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/lack_credit/', {
            student_id : localStorage.getItem('idToken')
          });
        if (response.data) {
            const { need_major } = response.data;
        } else {
            alert("서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요")
        }
    };
    const navigateUploadPDF = () => {
        navigate('/uploadpdf');
        window.scrollTo(0, 0);
    };
    const navigateDoneLecture = () => {
        navigate('/graduTestPage');
        window.scrollTo(0, 0);
    };
    const navigateTest = () => {
        navigate('/graduTestPage');
        window.scrollTo(0, 0);
    };
    const goFirst = () => {
        alert('기이수 과목 등록을 먼저 진행해주세요.');
    };

    useEffect(() => {
        myInfo();
        myLectureUpdate();
        setFeatCloseButton(true);
        // lackCredit();
    }, []);

    useEffect(() => {
        setError('');
        setCheckError('');
        setPassword('');
        setCheckPassword('');
        setPasswordStateCheck(false);
    }, [featModalState]);

    useEffect(() => {
        setSub_major('');
    }, [sub_major_type === '']);

    return (
        <>
            {modalState ? 
            removeInfoCheck ? 
            <Modal infoMessage="회원탈퇴" infoSymbol={Symbol} mainMessage="회원 탈퇴 되었습니다." contentMessage={<>FINISH LINE 을 이용해주셔서 감사합니다.</>} mainButton="확인" mainButtonAction={removeMembership} closeButton={removeMembership} />
            : <Modal infoMessage="회원탈퇴" infoSymbol={Symbol} mainMessage="정말 탈퇴하시겠습니까?" contentMessage={<>탈퇴 시 모든 회원정보는 <ins className={css(styles.point)}>삭제</ins>되며 복구가 <b>불가능</b>합니다.</>} mainButton="탈퇴하기" mainButtonAction={removeCheckModal} closeButton={closeModal} />
            : null}
            {featModalState ?
            editInfoCheck ?
            <FeatureModal title="추가 정보" closeAction={closeButtonAction} mainContents={
            <div className={css(styles.columnLayout)}>
                <div className={css(styles.startLayout)}>
                    <label className={css(styles.infoLable)}>복수/부/연계 전공</label>
                    <select className={css(styles.majorStatus)} onChange={(e) => setSub_major_type(e.target.value)}>
                        { sub_major_type ? 
                        <>
                            <option value="" >해당 없음</option>
                            { SUBMAJORTYPE.map((item) => (
                            <option value={item.value} selected={item.label === sub_major_type ? true : undefined}>{item.label}</option> )) }
                        </>
                        : <>
                            <option value="" >해당 없음</option>
                            { SUBMAJORTYPE.map((item) => (
                            <option value={item.value}>{item.label}</option> )) }
                        </>}
                    </select>
                    <select className={css(styles.majorSelect)} onChange={checkMajor}>
                        { sub_major_type ? 
                        sub_major ? (
                            <>
                                <option value="">선택</option>
                                { MAJOR.map((item) => (
                                    <option value={item.value} selected={item.label === sub_major ? true : undefined}>{item.label}</option>
                                )) }
                            </> ) 
                        : (
                            <>
                                <option value="">선택</option>
                                { MAJOR.map((item) => (
                                    <option value={item.value}>{item.label}</option>
                                )) }
                            </> )
                        : ( <option value=""></option> ) }
                    </select>
                    <label className={css(styles.infoLable)}>소단위전공</label>
                    <select className={css(styles.majorSelect)} onChange={(e) => setMicro_degree(e.target.value)}>
                        { micro_degree ?
                        <>
                            <option value="">해당 없음</option>
                            { MICRO_DEGREE.map((item) => (
                                <option value={item.value} selected={item.label === micro_degree ? true : undefined}>{item.label}</option>
                            )) }
                        </>
                        : <>
                            <option value="">해당 없음</option>
                            { MICRO_DEGREE.map((item) => (
                            <option value={item.value}>{item.label}</option>
                            )) }
                        </>
                        }
                    </select>
                </div>
            </div>} buttonText="저장" buttonAction={translateInfo} disButton={sub_major_type && !sub_major ? true : undefined} />
            : passwordStateCheck ?
            <FeatureModal title="비밀번호 변경" closeAction={closeFeatModal} mainContents={
                <div className={css(styles.columnLayout)}>
                    <div className={css(styles.startLayout)}>
                        <div className={css(styles.pwLabelSpace)}>
                            <label className={css(styles.infoLable)}>변경할 비밀번호 입력</label>
                            { error ? <span className={css(styles.errorMessage)}>{error}</span> : null }
                        </div>
                        <input className={css(styles.certificationInput)} type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={passwordFormat} placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                        <div className={css(styles.pwLabelSpace)}>
                            <label className={css(styles.infoLable)}>비밀번호 확인</label>
                            { checkError ? <span className={css(styles.errorMessage)}>{checkError}</span> : null }
                        </div>
                        <input className={css(styles.certificationInput)} type="password" value={checkPassword} onChange={passwordCorrect} placeholder="영문 대/소문자, 숫자, 특수문자 포함 (8~20자)"></input>
                    </div>
                </div>} buttonText="저장" buttonAction={saveNewPassword} />
            : <FeatureModal title="본인 확인" closeAction={closeFeatModal} mainContents={
                <div className={css(styles.columnLayout)}>
                    <div className={css(styles.startLayout)}>
                        <label className={css(styles.infoLable)}>비밀번호 입력</label>
                        <input className={css(styles.certificationInput)} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="본인 확인을 위해 비밀번호를 입력하세요."></input>
                    </div>
                </div>} buttonText="완료" buttonAction={passwordCheck} />
            : successChangePW ?
            <Modal infoMessage="비밀번호 변경" infoSymbol={Symbol} mainMessage="비밀번호가 재설정 되었습니다." mainButton="확인" mainButtonAction={noticeChangePW} closeButton={noticeChangePW} />
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
                        {localStorage.getItem('testing') ?
                        <button className={css(styles.button)} onClick={navigateDoneLecture}>자세히보기</button>
                        : <button className={css(styles.button)} onClick={localStorage.getItem('uploadPDF') ? navigateTest : goFirst}>검사하기</button> }
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    {localStorage.getItem('testing') ?
                    <div className={css(styles.contentArea)}>
                                  <span className={css(styles.graduState)}>
                                    졸업까지 <span className={css(styles.highlight_number)}>
                                        {localStorage.getItem('needTotalCredit')}학점
                                      </span> 이수해야 합니다!
                                   </span>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>전공</span>
                            <span className={css(styles.graduContent)}>10학점 부족</span>
                        </div>
                        {localStorage.getItem('completeEsseCredit') == 0 ? 
                        null
                        : <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양필수</span>
                            <span className={css(styles.graduContent)}><strong>{localStorage.getItem('completeEsseCredit')} 학점</strong> 부족</span>
                        </div>
                        }
                        {localStorage.getItem('completeChoiceCredit') == 0 ? 
                        null
                        : <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양선택</span>
                            <span className={css(styles.graduContent)}><strong>{localStorage.getItem('completeChoiceCredit')} 학점</strong> 부족</span>
                        </div>
                        }
                        {localStorage.getItem('completeNormalCredit') == 0 ?
                        null
                        : <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>일반선택</span>
                            <span className={css(styles.graduContent)}><strong>{localStorage.getItem('completeNormalCredit')} 학점</strong> 부족</span>
                        </div>
                        }  
                    </div>
                    : <div className={css(styles.contentNothingArea)}>
                        <div className={css(styles.noneContainer)}>
                            <span className={css(styles.noneMessage)}>검사 이력이 없습니다.</span>
                        </div>
                    </div> }
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 기이수과목</span>
                        {localStorage.getItem('uploadPDF') ? 
                        <button className={css(styles.button)} onClick={navigateDoneLecture}>추가하기</button>
                        : <button className={css(styles.button)} onClick={navigateUploadPDF}>등록하기</button>
                        }
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentTableArea)}>
                        {localStorage.getItem('uploadPDF') ? 
                            <DoneSubComponents subjects={myLectureList} className={css(styles.resizingTable)} tableType="resize"/>
                        : <>
                            <div className={css(styles.noneContainer)}>
                                <span className={css(styles.noneMessage)}>등록된 기이수과목이 없습니다.</span>
                            </div>
                            <div className={css(styles.guideContainer)}>
                                <span className={css(styles.guideMethod)}>가톨릭관동대 포털 {'>'} 종합정보시스템 {'>'} 학적관리 {'>'} 학기별 성적조회 및 출력 {'>'} 인쇄 {'>'} PDF로 저장</span>
                            </div>
                        </>
                        }
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
        paddingTop: '60px',
        paddingBottom: '85px',
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
        whiteSpace: 'nowrap',
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
        gap: '30px',
        whiteSpace: 'nowrap',
    },
    contentTableArea: {
        display: 'flex',
        flexDirection: 'column',
        padding: '25px 50px 20px 50px',
        gap: '30px'
    },
    contentNothingArea: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 50px 30px 50px',
    },
    doneLecturesContainer: {
        display: 'flex',
    },
    noneContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    noneMessage: {
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '17px',
        color: '#7A828A'
    },
    guideContainer: {
        display: 'flex',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
    },
    guideMethod: {
        fontFamily: 'Lato',
        fontWeight: '500',
        fontSize: '11px',
        color: '#7A828A'
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
        color: '#2B2A28',
    },
    defaultInfo: {
        marginBottom: '30px',
        padding: '0 0 0 15px',
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
    pwLabelSpace: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    errorMessage: {
        color: '#FF4921',
        fontSize: '12px',
        fontFamily: 'Lato',
        fontWeight: '600',
        margin: '0 0 6px auto',
    },
});

export default MyPage;