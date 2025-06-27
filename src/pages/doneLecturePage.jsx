import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Template from '../components/template';
import Header from '../components/header';
import Footer from '../components/footer';
import { SubSearchComponents, DoneSubComponents } from '../components/doneLectureComponents';
import UploadPdfPageComponents from '../components/uploadPdfComponents';
import axios from 'axios';
import { HiArrowCircleRight } from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

export const searchType = [
    {value : "searchCode" , label : "과목코드"},
    {value : "searchName" , label : "과목명"},
]

export const searchSemester = [
    {value : "1" , label : "2025/1학기"},
    {value : "2" , label : "2025/2학기"},
]

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
            const response = await axios.delete(`http://127.0.0.1:8000/graduation/api/mydonelecture/${lecture_code}/`, {
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
    const handleAddSubject = () => {
        const isDuplicate = myLectureList.some((subject) => subject.lecture_code === lectureData[0].lecture_code);

        if (isDuplicate) {
            alert(`해당 과목은 이미 추가되었습니다.`);
            return;
        }

        setMyLectureList((prevSubjects) => [...prevSubjects, { ...lectureData[0], subjectNew: true }]);
        setFilteredSubjects([0]);
    };

    //과목 코드로 찾는 함수
    const SubjectSearch = async () => {
        setError(null);
        setLectureData([]);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/graduation/api/nowLectureData/filter-by-code/${lectureCode}/`);

            // 과목 찾기로 현재 과목 데이터가 없다면 전체 과목 데이터를 살펴본 후 예외처리 결정
            if (!response.data || response.data.length === 0) {
                const allResponse = await axios.get(`http://127.0.0.1:8000/graduation/api/allLectureData/filter-by-code/${lectureCode}/`);

                if (!allResponse.data || allResponse.data.length === 0) {
                    alert('과목코드를 다시 확인하세요');
                } else if (allResponse.data && allResponse.data.length > 0) {
                    alert('현재학기 과목만 조회 가능합니다. 이전학기는 PDF 등록을 이용해주세요.');
                } else {
                    alert('과목코드를 다시 입력하세요');
                }
                
            } else {
                setLectureData(response.data);
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
            const response = await axios.get(`http://127.0.0.1:8000/graduation/api/mydonelecture?user_id=${userId}`);
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

            const response = await axios.post("http://127.0.0.1:8000/graduation/api/mydonelecture/", {
                subjectsToSave: subjectsToSave,
            });

            if (!response.status === 201) {
                alert("과목 저장에 실패했습니다.");
            }

            myLectureUpdate();
            alert("저장되었습니다.");

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
                    <div className={css(styles.textboxContainer)} onKeyDown={enterSubmit}>
                        <div className={css(styles.titleContainer)} ref={semesterDropDownRef}>
                            <button className={css(styles.itemSemesterButton)} onClick={() => setSemesterIsOpen(!semesterIsOpen)}>
                                {searchSemesterSelect.label}
                                <IoIosArrowDown className={css(styles.bottomArrowIcon)}/>
                            </button>
                            {semesterIsOpen && (
                                <ul className={css(styles.dropCustomUl)}>
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
                                    {searchCodeSelect.label}
                                    <GoTriangleDown className={css(styles.triangleIcon)}/>
                                </button>
                                {codeIsOpen && (
                                    <ul className={css(styles.dropCustomUl)}>
                                        {searchType.map((item) => (
                                            <li
                                                className={css(styles.dropCustomLi)}
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
                                onChange={(e) => setLectureCode(e.target.value.trim())}
                                placeholder={ 
                                    searchCodeSelect.value === "searchCode" ? "과목 코드를 입력하세요"
                                    : "과목명을 입력하세요"
                                }
                                className={css(styles.inputContainer)} />
                            <button className={css(styles.itemSearchButton)} onClick={SubjectSearch}>
                                <HiArrowCircleRight className={css(styles.ArrowCustom)}/>
                            </button>
                        </div>
                    </div>
                    <div className={css(styles.tableContainer)}>
                        {lectureData && lectureData.length > 0 ? (<SubSearchComponents subjects={lectureData} onAdd={handleAddSubject} />) : null}
                    </div>
                    <div className={css(styles.secondTitleContainer)}>
                        <span className={css(styles.secondTitle)}>내 기이수 과목</span>
                        <button className={css(styles.itemSaveButton)} onClick={handleSaveAllSubjects}>커스텀하기</button>
                    </div>
                    <hr className={css(styles.custom_hr)} />
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
        border: 'none',
        width: '500px',
        height: '48px',
        fontFamily: 'Lato',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: 'transparent',
        position: 'absolute',
        right: '0px',
        borderTopRightRadius: '18px',
        borderBottomRightRadius: '18px',
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
    titleContainer: {
        width: '110px',
        height: '50px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    custom_hr: {
        width: '520px',
        border: '1px solid #E4E4E4',
    },
    small_title: {
        fontFamily: 'Lato',
        fontSize: '20px',
        fontWeight: '600',
        textAlign: 'center',
        color: '#006277',
    },
    textboxContainer: {
        paddingTop: '10px',
        paddingBottom: '40px',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: '15px',
        alignItems: 'center',
    },
    itemTextboxContainer: {
        width: '450px',
        height: '100px',
        border: '1px solid black',
        backgroundColor: 'transparent',
        borderRadius: '5px',
    },
    itemSearchButton: {
        border: '1px solid transparent',
        borderRadius: '18px',
        backgroundColor: 'transparent',
        width: '50px',
        height: '50px',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',      // 수직 중앙
        justifyContent: 'center',  // 수평 중앙
        right: '0px',
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
    dropCustomUl: {
        position: 'absolute', 
        textAlign: 'center',
        color: '#595650',
        top: '100%', 
        left: 0, 
        right: 0,
        margin: 0,
        padding: 0,
        listStyle: 'none',
        backgroundColor: '#FFFEFB',
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: 1000,
        width: '110px',
        fontSize: '16px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    dropCustomLi: {
        marginBottom: '5px',
        marginTop: '5px',
    },
    itemSemesterButton: {
        width: '110px',
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
        fontSize: '13px',
        fontWeight: '700',
        textAlign: 'center', 
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
    },
    ArrowCustom: {
        width: '40px',
        height: '40px',
    },
    inputSearchContainer: {
        display: 'flex',
        position: 'relative',
        border: '1px solid #E4E4E4',
        flexDirection: 'row',
        width: '600px',
        height: '50px',
        borderRadius: '30px',
        boxSizing: 'border-box',
    },
    inputCodeContainer: {
        border: 'none',
        width: '94px',
        height: '50px',
        borderTopLeftRadius: '30px',
        borderBottomLeftRadius: '30px',
    },
    itemCodeButton: {
        border: 'none',
        width: '100%',
        height: '50px',
        borderTopLeftRadius: '30px',
        borderBottomLeftRadius: '30px',
        backgroundColor: 'transparent',
        color: '#2B2A28',
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: '700', 
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15px',
    },
    triangleIcon: {
        fontSize: '14px',
        color: '#333',
        marginLeft: '4px',
    },
    bottomArrowIcon: {
        fontSize: '14px',
        color: '#E4E4E4',
        marginLeft: '4px',
    }
});

export default DoneLecturePage;