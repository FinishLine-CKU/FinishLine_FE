import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, css, reset } from 'aphrodite';
import Template from '../components/template';
import Header from '../components/header';
import Footer from '../components/footer';
import { DoneSubComponents } from '../components/doneLectureComponents';
import UploadPdfPageComponents from '../components/uploadPdfComponents';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import { MdAutoMode } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { TbExternalLink } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { IoSearchCircleSharp } from "react-icons/io5";

const searchType = [
    {value : "searchCode" , label : "과목코드"},
    {value : "searchName" , label : "과목명"},
]

const searchSemester = [
    {year : "2025" , semester : "2" , label : "25년 2학기"},
    // {year : "2025" , semester : "1" , label : "25년 1학기"},
]

// 최신학과 기준 코드
export const MAJOR_NEW = [
    { value: '030503*', label: '의예' },
    { value: '030502*', label: '간호' },
    { value: '030701*', label: '국어교육' },
    { value: '030702*', label: '지리교육' },
    { value: '030704*', label: '수학교육' },
    { value: '030705*', label: '체육교육' },
    { value: '030707*', label: '컴퓨터교육' },
    { value: '030709*', label: '영어교육' },
    { value: '030710*', label: '역사교육' },
    { value: '031103*', label: '관광경영' },
    { value: '03300111', label: '스포츠재활의학' },
    { value: '03300108', label: '호텔관광경영' },
    { value: '03300110', label: '스포츠레저' },
    { value: '03300112', label: '스포츠지도' },
    { value: '031191*', label: '스포테인먼트전공(F)' },
    { value: '03300109', label: '조리외식경영' },
    { value: '03300117', label: '건축학' },
    { value: '03300118', label: '건축공학' },
    { value: '031214*', label: '토목공학' },
    { value: '031224*', label: '전자공학' },
    { value: '031230*', label: '소프트웨어' },
    { value: '031241*', label: '기술창업' },
    { value: '031241*', label: '창업지식재산' },
    { value: '031295*', label: 'AI융합전공(C)' },
    { value: '031297*', label: 'AI융합전공(F)' },
    { value: '031298*', label: '항만물류시스템' },
    { value: '031299*', label: '반도체융합' },
    { value: '03300105', label: '사회복지' },
    { value: '03300106', label: '경영' },
    { value: '03300107', label: '광고홍보' },
    { value: '03301001', label: '경찰행정' },
    { value: '03301002', label: '해양경찰' },
    { value: '03300104', label: '행정' },
    { value: '032391*', label: '스타트업콘텐츠마케팅전공(F)-스타트업콘텐츠마케팅' },
    { value: '032401*', label: '디지털헬스케어' },
    { value: '032402*', label: '의료IT' },
    { value: '032403*', label: '의생명과학' },
    { value: '03300101', label: '의료경영' },
    { value: '032408*', label: '바이오융합공학' },
    { value: '032415*', label: '안경광학' },
    { value: '032490*', label: '정밀의료융합' },
    { value: '032492*', label: '스마트수소에너지융합' },
    { value: '032501*', label: '항공운항서비스' },
    { value: '032506*', label: '항공교통물류' }, 
    { value: '03300114', label: '항공운항' },
    { value: '032515*', label: '무인항공' },
    { value: '03300115', label: '항공정비' },
    { value: '032591*', label: '항공설계전공(F-C)' }, 
    { value: '03260103', label: '실용음악' },
    { value: '03260104', label: '연기예술' },
    { value: '032603*', label: '뷰티디자인' },
    { value: '032608*', label: '콘텐츠제작' },
    { value: '032609*', label: 'CG디자인' },
    { value: '032702*', label: '치매전문재활' },
    { value: '032703*', label: '산림치유' },
    { value: '032705*', label: '언어재활' },
    { value: '032708*', label: '복지상담' },
    { value: '032709*', label: '스마트통합치유' },
    { value: '032710*', label: '해양치유레저' },
    { value: '032801*', label: '임상병리' },
    { value: '032802*', label: '치위생학' },
    { value: '03290112', label: '반려동물' },
    { value: '03290113', label: '군사학' },
    { value: '03300116', label: '스마트항만공학' },  
    { value: '033020', label: '자율전공학부' }, 
];

function DoneLecturePage() {

    const [lectureCode, setLectureCode] = useState('');
    const [lectureData, setLectureData] = useState([]);
    const [error, setError] = useState(null);
    const [myLectureList, setMyLectureList] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [searchCodeSelect, setSearchCodeSelect] = useState(searchType[0]);
    const [codeIsOpen, setCodeIsOpen] = useState(false);
    const [semesterIsOpen, setSemesterIsOpen] = useState(false);
    const [searchSemesterSelect, setSearchSemesterSelect] = useState(searchSemester[0]);
    const codeDropDownRef = useRef(null);
    const semesterDropDownRef = useRef(null);
    const navigate = useNavigate();
    const [showTextboxContainer, setShowTextboxContainer] = useState(false);

    const deleteButton = (lecture_code) => {
        const shouldWeDelete = myLectureList.find((subject) => subject.lecture_code === lecture_code);
    
        if (shouldWeDelete && shouldWeDelete.can_delete === true) {
            deleteButtonToDb(lecture_code);
        } else {
            deleteButtonToReat(lecture_code);
        }
    };

    //과목 목록 삭제 함수, 과목찾기와 내 기이수 과목 목록을 구분하기 위해 상태 저장
    const deleteButtonToReat = (lecture_code) => {
        const updatedMyLectures = myLectureList.filter(subject => subject.lecture_code !== lecture_code);
        setMyLectureList(updatedMyLectures);
    };
    
    const deleteButtonToDb = async (lecture_code) => {
        const userId = localStorage.getItem("idToken");
    
        try {
            const response = await axios.delete(`https://finishline-cku.com/graduation/api/mydonelecture/${lecture_code}/`, {
                data: {
                    user_id: userId,
                },
            });

            if (response.status === 204) {
                alert("해당 과목이 삭제되었습니다");
            } else if (response.status === 400) {
                alert("잠시후 다시 시도하세요");
            } else if (response.status === 404) {
                alert("삭제할 데이터를 찾지 못했습니다");
            }

            myLectureUpdate();
        } catch (error) {
            console.error("삭제 오류:", error);
        }
    };

    //과목 목록이 내 기이수 과목에 중복된 요소인 지 확인 함수
    const handleAddSubject = (subject) => {
        const isDuplicate = myLectureList.some((item) => item.lecture_code === subject.lecture_code);

        if (isDuplicate) {
            alert(`해당 과목은 이미 추가되었습니다.`);
            return;
        }

        setMyLectureList((prevSubjects) => [...prevSubjects, { ...subject, subjectNew: true }]);
        setFilteredSubjects([0]);
    };

    //과목 코드로 찾는 함수
    const SubjectSearch = async () => {
        setError(null);
        setLectureData([]);

        if (!lectureCode || lectureCode.trim() === "") {
            searchCodeSelect.value === "searchCode" ? alert("과목코드를 입력하세요") : alert("과목명을 입력하세요")
            return;
        }

        try {
            const response = await axios.get(`https://finishline-cku.com/graduation/api/nowLectureData/filter/`, {
                params: {
                    code: lectureCode,
                    searchType: searchCodeSelect.value,
                    year: searchSemesterSelect.year,
                    semester: searchSemesterSelect.semester,
                }
            });

            // 과목 찾기로 현재 과목 데이터가 없다면 전체 과목 데이터를 살펴본 후 예외처리 결정
            if (!response.data || response.data.length === 0) {
                const allResponse = await axios.get(`https://finishline-cku.com/graduation/api/allLectureData/filter/`, {
                    params: {
                        code: lectureCode,
                        searchType: searchCodeSelect.value,
                    }
                });

                if (!allResponse.data || allResponse.data.length === 0) {
                    searchCodeSelect.value === "searchCode" ? alert("과목코드를 다시 확인하세요.") : alert("과목명을 다시 확인하세요.")
                } else if (allResponse.data && allResponse.data.length > 0) {
                    alert(`20${searchSemesterSelect.label} 내에 존재하지 않는 교과목입니다.\n과목코드를 다시 확인하세요.`);
                }
                
            } else {
                setLectureData(response.data);
                console.log(response.data)
            }

        } catch (error) {
            setError('과목 정보를 가져오는데 실패했습니다.');
            alert('과목 정보를 가져오는데 실패했습니다.');
        }
    };

    //내 기이수 과목 저장 함수
    const myLectureUpdate = async () => {
        const userId = localStorage.getItem('idToken');
        try {
            const response = await axios.get(`https://finishline-cku.com/graduation/api/mydonelecture?user_id=${userId}`);
            setMyLectureList(response.data);
        } catch (error) {
            setError('과목 정보를 가져오는데 실패했습니다.');
            console.error('Error fetching data: ', error);
        }
    };

    //과목찾기 -> 내 기이수 과목 DB에 추가하기 함수
    const handleSaveAllSubjects = async () => {
        const userId = localStorage.getItem('idToken');
        try {
            const newSubjects = myLectureList.filter(subject => subject.subjectNew);

            if (newSubjects.length === 0) {
                alert("새로운 과목이 없습니다.");
                return;
            }

            //DB(현재 과목) -> 클라이언트 -> DB(내 기이수 과목) 순으로 과목 데이터를 직접 전달하여 내 기이수 과목에 저장
            const subjectsToSave = newSubjects.map(subject => ({
                year: subject.year,
                semester: subject.semester,
                lecture_code: subject.lecture_code,
                lecture_type: subject.lecture_type,
                lecture_topic: subject.lecture_topic,
                lecture_name: subject.lecture_name,
                credit: subject.credit,
                grade: subject.grade,
                user_id: userId,
                can_delete: true,
            }));

            const response = await axios.post("https://finishline-cku.com/graduation/api/mydonelecture/", {
                subjectsToSave: subjectsToSave,
            });

            if (!response.status === 201) {
                alert("과목 저장에 실패했습니다.");
            }

            myLectureUpdate();

            //현재 과목 목록을 내 기이수 과목으로 전달했다면 subjectNew 상태 저장(색상 변경을 위함)
            setMyLectureList(prev =>
                prev.map(subject => ({ ...subject, subjectNew: false }))
            );

        } catch (error) {
            console.error("Error:", error);
            alert("과목 저장 중 오류가 발생했습니다.");
        }
    };

    //졸업요건 검사 버튼을 누를 시 졸업요건 페이지로 이동
    const navigateToGraduTest = () => {
        navigate('/graduTestPage');
        window.scrollTo(0, 0);
    };

    const deleteText = (e) => {
        setLectureCode('');
        setLectureData([])
    };

    //랜더링 될 때마다 내 기이수 과목 목록 갱신
    useEffect(() => {
        if (localStorage.getItem('uploadPDF') || localStorage.getItem('oneClickTest')) {
            myLectureUpdate();
        } else {
            navigate('/uploadpdf');
            window.scrollTo(0, 0);
        };
    }, []);

    useEffect(() => {
        const ClickOutside = (event) => {
            if (codeDropDownRef.current && !codeDropDownRef.current.contains(event.target)) {
                setCodeIsOpen(false);
            }
        }

        document.addEventListener('mousedown',ClickOutside)
        
        return () => {
            document.removeEventListener('mousedown',ClickOutside)
        }
    }, []);

    useEffect(() => {
        const ClickOutside = (event) => {
            if (semesterDropDownRef.current && !semesterDropDownRef.current.contains(event.target)) {
                setSemesterIsOpen(false);
            }
        }

        document.addEventListener('mousedown',ClickOutside)
        
        return () => {
            document.removeEventListener('mousedown',ClickOutside)
        }
    }, []);

    useEffect(() => {
        const simulCheck = myLectureList.some(subject => subject.can_delete == true)

        if (simulCheck){
            setShowTextboxContainer(true);
        }

        if (localStorage.getItem('testing') === 'true'){
            setShowTextboxContainer(true);
        }
    }, [myLectureList]);

    useEffect(() => {
        if(myLectureList.some(subject => subject.subjectNew)) {
            handleSaveAllSubjects();
        } 
    }, [myLectureList]);

    const enterSubmit = (e) => {
        if (e.key === 'Enter') {
            SubjectSearch();
        }
    };

    return (
        <div>
            <Header />
            <Template title="기이수 과목 관리" />
            <div className={css(styles.container)}>
                <div className={css(styles.ColumnContainer)}>
                    {showTextboxContainer ?
                        <>
                            <div className={css(styles.secondTitleContainer)}>
                                <span className={css(styles.secondTitle)}>이수 과목 시뮬레이션</span>
                            </div>
                            <div className={css(styles.secondSubTitleContainer)}>
                                <span className={css(styles.secondSubTitle)}>원하는 과목을 직접 추가하고 검사 결과를 미리 확인해보세요.</span>
                            </div>
                        </> : null
                    }
                    <div className={css(styles.textboxContainer, showTextboxContainer ? styles.slideDownActive : styles.slideDownHidden)} onKeyDown={enterSubmit}>
                        <div className={css(styles.inputListContainer)}>
                            <div className={css(styles.titleColumnContainer)}>
                                <div className={css(styles.titleContainer)} ref={semesterDropDownRef}>
                                    <button className={css(styles.itemSemesterButton)} onClick={() => setSemesterIsOpen(!semesterIsOpen)}>
                                        {searchSemesterSelect.label}
                                        <IoIosArrowDown className={css(styles.bottomArrowIcon)}/>
                                    </button>
                                    {semesterIsOpen && (
                                        <ul className={css(styles.dropCustomUlSemester)}>
                                            {searchSemester.map((item) => (
                                                <li
                                                    className={css(styles.dropCustomLi)}
                                                    key={item.value}
                                                    onClick={() => {
                                                        setSearchSemesterSelect(item); 
                                                        setSemesterIsOpen(false);
                                                }}
                                                >
                                                    {item.label}
                                                </li>
                                            ))}
                                        </ul>
                                        )}
                                </div>
                                <div className={css(styles.inputSearchContainer)}>
                                    <div className={css(styles.inputCodeContainer)} ref={codeDropDownRef}>
                                        <button className={css(styles.itemCodeButton)} onClick={() => setCodeIsOpen(!codeIsOpen)}>
                                            <div className={css(styles.labelContainer)}>
                                                {searchCodeSelect.label}
                                            </div>
                                            <GoTriangleDown className={css(styles.triangleIcon)}/>
                                            <div className={css(styles.shortDivider)}>
                                            </div>
                                        </button>
                                        {codeIsOpen && (
                                            <ul className={css(styles.dropCustomUlCode)}>
                                                {searchType.map((item) => (
                                                    <li
                                                        className={css(styles.dropCustomLiCode)}
                                                        key={item.value}
                                                        onClick={() => {
                                                            setSearchCodeSelect(item); 
                                                            setCodeIsOpen(false);
                                                    }}
                                                    >
                                                        {item.label}
                                                    </li>
                                                ))}
                                            </ul>
                                            )}
                                    </div>
                                    <input
                                        type="text"
                                        id="lectureCode"
                                        name="Code"
                                        value={lectureCode}
                                        onChange={e => {
                                            const inputCode = e.target.value.trim();
                                            setLectureCode(inputCode);
                                            if (inputCode === "") setLectureData([]);
                                        }}
                                        placeholder={searchCodeSelect.value === "searchCode" ? "과목 코드를 입력하세요" : "과목명을 입력하세요"}
                                        className={css(styles.inputContainer, searchCodeSelect.value === "searchCode" ? styles.inputContainer : styles.inputLecturenameContainer)} />
                                    {lectureCode ?
                                    <TiDelete className={css(styles.textDeleteButton)} onClick={deleteText} />
                                    : null}
                                    <button className={css(styles.itemSearchButton)} onClick={SubjectSearch}>
                                        <IoSearchCircleSharp className={css(styles.ArrowCustom)} />
                                    </button>
                                </div>
                            </div>
                        <div className={css(styles.subListContainer)}>
                            {lectureData.length == 0 ? 
                            (
                                <a href='https://info.cku.ac.kr/haksa/undergraduate/subject_search_all.jsp' target="_blank" className={css(styles.linkContainer)}>
                                    <FaCircleQuestion />
                                    <span>과목코드를 찾으시나요?</span>
                                    <TbExternalLink className={css(styles.linkCustom)} />
                                </a>
                            )
                               : (lectureData && lectureData.length > 0 ? (
                                <ul className={css(styles.subInfoListUi)}>
                                    {lectureData.map((subject, idx) => (
                                        <li
                                            key={subject.lecture_code + idx}
                                            className={css(styles.subInfoListLi)}
                                        >
                                            <div className={css(styles.subjectInfo)} onClick={() => handleAddSubject(subject)}>
                                                <div className={css(styles.subjectMain)}>{subject.lecture_name}</div>
                                                <div className={css(styles.subjectSub)}>
                                                    {subject.year}년 {subject.semester}학기 | {subject.lecture_code} | {subject.lecture_type} | {subject.lecture_topic.trim() == '' ? subject.major_code.trim() == '' ? `-` : MAJOR_NEW.find(item => item.value === subject.major_code).label : subject.lecture_topic} | {subject.credit}학점
                                                </div>
                                            </div>
                                            <div className={css(styles.plusContainer)}>
                                                <div className={css(styles.addButton, (myLectureList.some((item) => item.lecture_code === subject.lecture_code)) ? styles.alreadyButton : styles.addButton)} onClick={() => handleAddSubject(subject)} title="내 기이수 과목에 추가">
                                                    {(myLectureList.some((item) => item.lecture_code === subject.lecture_code)) ?
                                                    <>
                                                        <span>반영완료</span>
                                                        <FaRegCheckCircle />
                                                    </> :
                                                    <>
                                                        <span>추가하기</span>
                                                        <FaArrowRightLong />
                                                    </>}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>) : null)}
                        </div>
                    </div>
                    </div>
                    <div className={css(styles.secondTitleContainer)}>
                        <span className={css(styles.secondTitle)}>내 기이수 과목</span>
                        {showTextboxContainer ?
                            null :
                            <div className={css(styles.simulationToggleContainer)} onClick={() => setShowTextboxContainer(v => !v)}>
                                <MdAutoMode />
                                <span>이수 과목 시뮬레이션</span>
                            </div>
                        }
                    </div>
                    <hr className={css(styles.hrLine)} />
                    <div className={css(styles.tableContainerSecond)}>
                        <DoneSubComponents subjects={myLectureList} onDelete={(lecture_code) => deleteButton(lecture_code)} />
                    </div>
                    <button className={css(styles.itemGraduButton)} onClick={navigateToGraduTest}>졸업요건 검사</button>
                </div>
            </div>
            <UploadPdfPageComponents />
            <Footer />
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '50px',
        backgroundColor: '#FFFEFB',
    },
    ColumnContainer: {
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    tableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        position: 'absolute',
        border: 'none',
        width: '378px',
        height: '95%',
        backgroundColor: 'transparent',
        borderTopRightRadius: '18px',
        borderBottomRightRadius: '18px',
        paddingLeft: '10px',
        fontFamily: 'Lato',
        fontSize: '15px',
        color: '#2a3038',
        outline: 'none',
        right: '0px',
    },
    inputLecturenameContainer: {
        position: 'absolute',
        border: 'none',
        width: '390px',
        height: '95%',
        backgroundColor: 'transparent',
        borderTopRightRadius: '18px',
        borderBottomRightRadius: '18px',
        paddingLeft: '10px',
        fontFamily: 'Lato',
        fontSize: '15px',
        color: '#2a3038',
        outline: 'none',
        right: '0px',
    },
    tableContainerSecond: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0'
    },
    title: {
        paddingBottom: '5px',
        fontFamily: 'Lato',
        fontSize: '23px',
        textAlign: 'left',
        fontWeight: '700',
    },
    secondTitle: {
        fontFamily: 'Lato',
        fontSize: '23px',
        fontWeight: '700',
    },
    secondSubTitleContainer: {
        display: 'flex',
        width: '520px',
        padding: '10px 0 30px 0'
    },
    secondSubTitle: {
        fontFamily: 'Lato',
        fontSize: '15px',
        color: '#7A828A',
        fontWeight: '600'
    },
    simulationToggleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        color: '#3D5286',
        fontWeight: '700',
        ':hover': {
            color: 'rgba(246, 193, 83, 1)',
            textShadow: '0 0 5px rgba(246, 193, 83, 0.2)',
            transition: '0.2s ease-out',
            cursor: 'pointer'
        }
    },
    titleContainer: {
        width: '120px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    hrLine: {
        width: '520px',
        border: '1px solid #E4E4E4',
    },
    textboxContainer: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        display: 'flex',
        width: '880px',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'flex-start',
    },
    itemTextboxContainer: {
        width: '450px',
        height: '100px',
        border: '1px solid black',
        backgroundColor: 'transparent',
        borderRadius: '5px',
    },
    textDeleteButton: {
        display: 'flex',
        position: 'absolute',
        right: '50px',
        padding: '3px 3px',
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        color: '#b0b3ba'
    },
    itemSearchButton: {
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',      
        justifyContent: 'center',  
        right: '0px',
        border: 'none',
        borderRadius: '18px',
        backgroundColor: 'transparent',
        width: '50px',
        height: '50px',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    secondTitleContainer: {
        paddingTop: '15px',
        width: '520px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemSaveButton: {
        width: '70px',
        height: '25px',
        borderRadius: '5px',
        border: '1px solid #2B2A28',
        backgroundColor: '#FFFEFB',
        color: '#2B2A28',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#2B2A28',
            color: '#FFFEFB'
        },
        ':active': {
            backgroundColor: '#595650',
            borderColor: '#595650'
        },
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '700',
    },
    itemGraduButton: {
        width: '165px',
        height: '49px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#006277',
        color: '#FFFFFF',
        cursor: 'pointer',
        ':active': {
            backgroundColor: '#004c56',
        },
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '700',
    },
    dropCustomUlSemester: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute', 
        textAlign: 'center',
        color: '#595650',
        top: '80%', 
        left: 10, 
        right: 0,
        padding: '5px',
        listStyle: 'none',
        backgroundColor: '#FFFEFB',
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: '1000',
        width: '90px',
        fontSize: '16px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },

    dropCustomUlCode: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute', 
        color: '#595650',
        top: '80%',
        left: 10, 
        padding: '5px',
        listStyle: 'none',
        backgroundColor: '#FFFEFB',
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: '1000',
        width: '80px',
        fontSize: '16px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    dropCustomLi: {
        padding: '5px 0 5px 0px',
        fontSize: '15px',
        color: '#878B93',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: '#F7F8F9'
        }
    },
    dropCustomLiCode: {
        padding: '5px 0 5px 10px',
        fontSize: '15px',
        color: '#878B93',
        borderRadius: '4px',
        ':hover': {
            backgroundColor: '#F7F8F9'
        }
    },
    itemSemesterButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px',
        width: '120px',
        height: '50px',
        borderRadius: '30px',
        border: '1px solid #2B2A28',
        backgroundColor: '#2B2A28',
        color: '#FFFEFB',
        cursor: 'pointer',
        ':active': {
            backgroundColor: '#595650',
            borderColor: '#595650'
        },
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '700',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },
    ArrowCustom: {
        width: '45px',
        height: '45px',
        color: '#2B2A28'
    },
    inputSearchContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        border: '1px solid #E4E4E4',
        width: '500px',
        height: '50px',
        borderRadius: '30px',
        boxSizing: 'border-box',
    },
    inputCodeContainer: {
        display: 'flex',
        whiteSpace: 'nowrap',
    },
    itemCodeButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50px',
        borderColor: 'transparent',
        borderTopLeftRadius: '30px',
        borderBottomLeftRadius: '30px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '700',
        paddingLeft: '20px',
        outline: 'none',
        cursor: 'pointer',
    },
    triangleIcon: {
        fontSize: '18px',
        color: '#2B2A28',
        padding: '0 10px 0 2px'
    },
    bottomArrowIcon: {
        fontSize: '16px',
        color: '#E4E4E4',
        marginLeft: '2px',
    },
    linkContainer: {
        display: 'flex',
        gap: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontSize: '14px',
        color: '#7A828A',
        marginTop: '10px',
        paddingLeft: '30px'
    },
    linkCustom: {
        fontSize: '18px',
        color: '#7A828A'
    },
    shortDivider: {
        width: '1px',
        height: '65%',
        background: '#E4E4E4'
    },
    inputListContainer: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        width: '750px',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        height: '180px',
    },
    subListContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '520px',
        alignItems: 'center',
        paddingTop: '10px',
        height: '100px'
    },
    subInfoListLi: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 20px',
        width: '100%',
        borderRadius: '6px',
        background: '#fff',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px 0 rgba(33,37,41,0.10)',
        cursor: 'pointer',
        transition: 'background 0.15s, box-shadow 0.15s',
        gap: '4px',
        ':hover': {
            background: '#f8f9fa',
        },
    },
    subInfoListUi: {
        position: 'absolute',
        right: 60,
        width: '500px',
        margin: '0',
        listStyle: 'none',
        height: '120px',
        overflowY: 'auto',
    },
    subjectMain: {
        fontWeight: '700',
        fontSize: '16px',
        color: '#2B2A28',
        width: '350px',
    },
    subjectSub: {
        fontSize: '14px',
        color: '#7A828A',
    },
    plusContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#3D5286',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        borderRadius: '60px',
        fontWeight: '700',
        fontSize: '13px',
        padding: '5px 10px',
        gap: '3px'
    },
    alreadyButton: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#B9B9B9',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        borderRadius: '60px',
        fontWeight: '700',
        fontSize: '13px',
        padding: '5px 10px',
        gap: '3px'
    },
    addCustom: {
        fontSize: '32px',
        color: '#3D5286',
        cursor: 'pointer',
        marginLeft: '16px',
        transition: 'color 0.2s',
        ':hover': {
            color: '#004c56',
        },
    },
    subjectInfo: {
        flex: 1,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px'
    },
    slideDownHidden: {
        maxHeight: '0px',
        opacity: 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
    },
    slideDownActive: {
        maxHeight: '1000px',
        opacity: 1,
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
    },
    itemSimulButton: {
        width: '120px',
        height: '35px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#006696',
        background: '#3D5286',
        boxShadow: '0px 4px 5px #888',
        color: '#FFFEFB',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#3674B5',
            color: '#FFFEFB'
        },
        ':active': {
            boxShadow: '0 2px 4px 0 #00bfff33, 0 1px 2px 0 rgba(0,0,0,0.10) inset',
        },
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '700',
    },
    titleColumnContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        gap: '10px',
    },
    labelContainer: {
        display: 'flex',
    }
});

export default DoneLecturePage;