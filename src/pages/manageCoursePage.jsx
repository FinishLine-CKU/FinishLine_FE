import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Footer from '../components/footer';
import Template from '../components/template';
import Sidebar from '../components/sideBar.jsx';
import axios from 'axios';

// baseURL 설정
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function ManageCoursePage() {
    // 상태 관리
    const [selectedYear, setSelectedYear] = useState('2019');
    const [selectedDepartment, setSelectedDepartment] = useState('일반학과');
    const [selectedType, setSelectedType] = useState('교양필수');
    const [visibleTable, setVisibleTable] = useState(false);
    const [totalRequired, setTotalRequired] = useState(0);
    const [totalElective, setTotalElective] = useState(0);
    const [retrievedCourses, setRetrievedCourses] = useState({
        requiredCourses: [],
        electiveCourses: []
    });
    const [courseSettings, setCourseSettings] = useState([{
        area: '',
        credit: '',
        condition: '',
        totalCredit: '',
        alternative: ''
    }]);
    const [isDataRetrieved, setIsDataRetrieved] = useState(false);

    // 이수영역 옵션
    const requiredAreaOptions = [
        'VERUM인성', '봉사활동', '인간학', '논리적사고와글쓰기', '외국어',
        '디지털소통', '진로탐색', '창의성', '창업', '계열기초'
    ];
    const electiveAreaOptions = [
        '정치와 경제', '심리와 건강', '정보와 기술', '인간과 문학', '역사와 사회',
        '철학과 예술', '자연과 환경', '수리와 과학', '언어와 문화', '사회와 경제'
    ];
    const conditionOptions = ['P', 'NP'];

    // API 호출 함수
    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/manages/liberal-arts/', {
                params: {
                    admission_year: selectedYear,
                    department: selectedDepartment
                }
            });
            
            console.log('API Response:', response.data);
    
            // 필수와 선택 구분
            const required = response.data.filter(item => 
                item.category?.type === '교양필수' || item.type === '교양필수'
            );
            const elective = response.data.filter(item => 
                item.category?.type === '교양선택' || item.type === '교양선택'
            );
    
            setRetrievedCourses({
                requiredCourses: required,
                electiveCourses: elective
            });
    
            // 총점 계산
            const reqTotal = required.reduce((sum, item) => sum + (parseInt(item.required_credits) || 0), 0);
            const eleTotal = elective.reduce((sum, item) => sum + (parseInt(item.required_credits) || 0), 0);
    
            setTotalRequired(reqTotal);
            setTotalElective(eleTotal);
            setIsDataRetrieved(true);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [selectedYear, selectedDepartment]);

    // 테이블 생성 핸들러
    const handleCreate = () => {
        if (!selectedYear || !selectedDepartment) {
            alert('등록년도와 학과를 선택해주세요.');
            return;
        }

        const isDuplicate = retrievedCourses.requiredCourses.some(
            course => course.curriculum_year.year === parseInt(selectedYear) && 
                     course.curriculum_year.department.name === selectedDepartment
        );

        if (isDuplicate) {
            alert('해당 입학년도 학과의 교양 교육과정이 이미 등록되어있습니다.');
            return;
        }

        if (visibleTable) {
            alert('이미 테이블이 생성되어있습니다.');
            return;
        }

        setVisibleTable(true);
    };

    // 설정 변경 핸들러
    const handleSettingChange = (index, field, value) => {
        const newSettings = [...courseSettings];
        newSettings[index][field] = value;
        setCourseSettings(newSettings);
    };

    // 행 추가/삭제 핸들러
    const addRow = () => {
        setCourseSettings([...courseSettings, {
            area: '',
            credit: '',
            condition: '',
            totalCredit: '',
            alternative: ''
        }]);
    };

    const removeRow = (index) => {
        if (courseSettings.length > 1) {
            setCourseSettings(courseSettings.filter((_, i) => i !== index));
        }
    };

    // 등록 처리
    const handleSubmit = async () => {
        if (!courseSettings.every(setting => setting.area && setting.credit)) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        try {
            // Department 처리
            const departmentResponse = await axios.get(`/api/manages/departments/?name=${selectedDepartment}`);
            let departmentId = departmentResponse.data[0]?.id;
            
            if (!departmentId) {
                const newDepartment = await axios.post('/api/manages/departments/', { 
                    name: selectedDepartment 
                });
                departmentId = newDepartment.data.id;
            }

            // CurriculumYear 생성
            const curriculumYear = await axios.post('/api/manages/curriculum-years/', {
                year: parseInt(selectedYear),
                department: departmentId,
                is_active: true
            });

            // 각 교양 과목 처리
            for (const setting of courseSettings) {
                const category = await axios.post('/api/manages/liberal-arts-categories/', {
                    name: setting.area,
                    type: selectedType
                });

                await axios.post('/api/manages/liberal-arts/', {
                    curriculum_year: curriculumYear.data.id,
                    category: category.data.id,
                    required_credits: parseInt(setting.credit),
                    conditions: setting.condition,
                    total_credits: parseInt(setting.totalCredit),
                    alternative_category: null,
                    note: ''
                });
            }

            alert('교육과정이 성공적으로 등록되었습니다.');
            setVisibleTable(false);
            setCourseSettings([{
                area: '',
                credit: '',
                condition: '',
                totalCredit: '',
                alternative: ''
            }]);
            
            fetchCourses();
        } catch (error) {
            console.error('Error submitting courses:', error);
            alert('교육과정 등록 중 오류가 발생했습니다.');
        }
    };

    // 삭제 처리
    const handleDeleteCourses = async () => {
        try {
            await axios.delete('/api/manages/liberal-arts/', {
                params: {
                    year: selectedYear,
                    department: selectedDepartment
                }
            });

            await fetchCourses();
            setIsDataRetrieved(false);
            alert('선택한 교육과정이 삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting courses:', error);
            alert('교육과정 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={css(styles.container)}>
            <Sidebar />
                <Template title="교양 교육과정 관리" />
                <div className={css(styles.frame)}>
                    <div className={css(styles.boundaryContainer)}>
                        <div className={css(styles.titleArea)}>
                            <span className={css(styles.title)}>교양 교육과정 등록</span>
                            <span className={css(styles.guide)}>
                                등록한 교육과정을 아래 DB에서 확인하세요.
                            </span>
                        </div>
                        <hr className={css(styles.horizontal)} />
                        <div className={css(styles.contentArea)}>
                            <div className={css(styles.settingContainer)}>
                                <div className={css(styles.selectContainer)}>
                                    <select 
                                        className={css(styles.selectYear)}
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        disabled={visibleTable}
                                    >
                                        {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <select 
                                        className={css(styles.selectMajor)}
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                        disabled={visibleTable}
                                    >
                                        <option value="일반학과">일반학과</option>
                                        <option value="의학과">의학과</option>
                                        <option value="간호학과">간호학과</option>
                                        <option value="건축학과">건축학과</option>
                                        <option value="의료경영학과">의료경영학과</option>
                                        <option value="건축공학과">건축공학과</option>
                                    </select>
                                </div>
                                <div className={css(styles.noticeText)}>
                              의학과, 간호학과, 건축학과, 의료경영학과, 건축공학과를 제외한 <br />
                              모든 학과는 <span className={css(styles.boldText)}>일반 학과</span>로 분류됩니다.
                           </div>
                            </div>
                            <div className={css(styles.selectTypeContainer)}>
                            <select
                                className={css(styles.selectType)}
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                disabled={visibleTable}
                            >
                                <option value="교양필수">교양필수</option>
                                <option value="교양선택">교양선택</option>
                            </select>
                            <button 
                                className={css(styles.settingButton)}
                                onClick={handleCreate}
                            >
                                생성
                            </button>
                        </div>
                        {visibleTable && (
                            <div className={css(styles.contentContainer)}>
                                <span className={css(styles.tableTitle)}>
                                    {selectedYear}학년도 {selectedDepartment}{' '}
                                    <span className={css(styles.highlightText)}>{selectedType}</span>
                                </span>
                                <table className={css(styles.tableLayout)}>
                                    <thead>
                                        <tr>
                                            <th className={css(styles.tableHeader)}>이수영역</th>
                                            <th className={css(styles.tableHeader)}>학점</th>
                                            <th className={css(styles.tableHeader)}>조건 (횟수/P/NP)</th>
                                            <th className={css(styles.tableHeader)}>총학점</th>
                                            <th className={css(styles.tableHeader)}>대체과목 영역</th>
                                            <th className={css(styles.tableHeader)}>삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseSettings.map((setting, index) => (
                                            <tr key={index}>
                                                <td className={css(styles.tableData)}>
                                                    <select 
                                                        className={css(styles.input)}
                                                        value={setting.area}
                                                        onChange={(e) => handleSettingChange(index, 'area', e.target.value)}
                                                    >
                                                        <option value="">선택</option>
                                                        {(selectedType === '교양필수' ? requiredAreaOptions : electiveAreaOptions)
                                                            .map(area => (
                                                                <option key={area} value={area}>{area}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td className={css(styles.tableData)}>
                                                    <input 
                                                        type="number"
                                                        className={css(styles.input)}
                                                        value={setting.credit}
                                                        onChange={(e) => handleSettingChange(index, 'credit', e.target.value)}
                                                        placeholder="학점입력"
                                                    />
                                                </td>
                                                <td className={css(styles.tableData)}>
                                                    <select 
                                                        className={css(styles.input)}
                                                        value={setting.condition}
                                                        onChange={(e) => handleSettingChange(index, 'condition', e.target.value)}
                                                        style={{
                                                            fontWeight: setting.condition ? '600' : '400',
                                                            color: setting.condition ? '#000' : '#7A828A'
                                                        }}
                                                    >
                                                        <option value="">선택</option>
                                                        {conditionOptions.map(option => (
                                                            <option 
                                                                key={option} 
                                                                value={option}
                                                                style={{ fontWeight: '600' }}
                                                            >
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className={css(styles.tableData)}>
                                                    <input 
                                                        type="number"
                                                        className={css(styles.input)}
                                                        value={setting.totalCredit}
                                                        onChange={(e) => handleSettingChange(index, 'totalCredit', e.target.value)}
                                                        placeholder="입력"
                                                    />
                                                </td>
                                                <td className={css(styles.tableData)}>
                                                    <select 
                                                        className={css(styles.input)}
                                                        value={setting.alternative}
                                                        onChange={(e) => handleSettingChange(index, 'alternative', e.target.value)}
                                                    >
                                                        <option value="">선택</option>
                                                        {(selectedType === '교양필수' ? requiredAreaOptions : electiveAreaOptions)
                                                            .map(area => (
                                                                <option key={area} value={area}>{area}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td className={css(styles.tableData)}>
                                                    <button
                                                        className={css(styles.deleteButton)}
                                                        onClick={() => removeRow(index)}
                                                        disabled={courseSettings.length === 1}
                                                    >
                                                        삭제
                                                    </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button
                                        className={css(styles.expandButton)}
                                        onClick={addRow}
                                    >
                                        +
                                    </button>
                                    <div className={css(styles.buttonContainer)}>
                                        <button
                                            className={css(styles.registerButton)}
                                            onClick={handleSubmit}
                                        >
                                            등록하기
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className={css(styles.boundaryContainer)}>
    <div className={css(styles.titleArea)}>
        <span className={css(styles.title)}>교양 교육과정 DB</span>
    </div>
    <hr className={css(styles.horizontal)} />
    <div className={css(styles.contentArea)}>
        <div className={css(styles.selectContainer)}>
            <select
                className={css(styles.selectYear)}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
            >
                {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select
                className={css(styles.selectMajor)}
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
            >
                <option value="일반학과">일반학과</option>
                <option value="의학과">의학과</option>
                <option value="간호학과">간호학과</option>
                <option value="건축학과">건축학과</option>
                <option value="의료경영학과">의료경영학과</option>
                <option value="건축공학과">건축공학과</option>
            </select>
            <button 
                className={css(styles.settingButton)}
                onClick={fetchCourses}
            >
                조회
            </button>
        </div>
        {isDataRetrieved && retrievedCourses.requiredCourses.length + retrievedCourses.electiveCourses.length > 0 && (
    <div className={css(styles.tableContainer)}>
        <div className={css(styles.tableHeaderContainer)}>
            <div className={css(styles.tableTitle)}>
                {selectedYear}학년도 {selectedDepartment}
            </div>
            <div className={css(styles.tableButtons)}>
                <button className={css(styles.createButton)}>편집</button>
                <button 
                    className={css(styles.dbButton)}
                    onClick={handleDeleteCourses}
                >
                    삭제
                </button>
            </div>
        </div>
        <table className={css(styles.tableLayout)}>
                    <thead>
                        <tr>
                            <th className={css(styles.titleCell)} colSpan="5">교양 필수</th>
                            <th className={css(styles.titleCell)} colSpan="5">교양 선택</th>
                            <th className={css(styles.resultCell)} rowSpan="2">종합</th>
                        </tr>
                        <tr>
                            <th className={css(styles.headerCell)}>이수영역</th>
                            <th className={css(styles.headerCell)}>학점</th>
                            <th className={css(styles.headerCell)}>조건</th>
                            <th className={css(styles.headerCell)}>총학점</th>
                            <th className={css(styles.headerCell)}>대체과목 영역</th>
                            <th className={css(styles.headerCell)}>이수영역</th>
                            <th className={css(styles.headerCell)}>학점</th>
                            <th className={css(styles.headerCell)}>조건</th>
                            <th className={css(styles.headerCell)}>총학점</th>
                            <th className={css(styles.headerCell)}>대체과목 영역</th>
                        </tr>
                    </thead>
                    <tbody>
                    {retrievedCourses.requiredCourses.map((course, index) => (
    <tr key={`required-${index}`}>
        <td className={css(styles.cell)}>{course.category?.name || '-'}</td>
        <td className={css(styles.cell)}>{course.required_credits || '-'}</td>
        <td className={css(styles.cell)}>{course.conditions || '-'}</td>
        <td className={css(styles.cell)}>{course.total_credits || '-'}</td>
        <td className={css(styles.cell)}>{course.alternative_category?.name || '-'}</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        {index === 0 && (
            <td className={css(styles.lastCell)} rowSpan={Math.max(retrievedCourses.requiredCourses.length + retrievedCourses.electiveCourses.length + 1, 2)}>
                {totalRequired + totalElective}
            </td>
        )}
    </tr>
))}
{retrievedCourses.electiveCourses.map((course, index) => (
    <tr key={`elective-${index}`}>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>-</td>
        <td className={css(styles.cell)}>{course.completion_area}</td>
        <td className={css(styles.cell)}>{course.required_credits}</td>
        <td className={css(styles.cell)}>{course.conditions}</td>
        <td className={css(styles.cell)}>{course.total_credits || '-'}</td>
        <td className={css(styles.cell)}>{course.alternative_subject || '-'}</td>
    </tr>
))}
<tr>
    <td colSpan="5" className={css(styles.cell)}>{totalRequired}</td>
    <td colSpan="5" className={css(styles.cell)}>{totalElective}</td>
</tr>
                    </tbody>
                </table>
            </div>
        )}
    </div>
</div>
            </div>
            <Footer footerType="manage" />
            </div>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: '80px',
        marginLeft: '273px',
        backgroundColor: '#FFFEFB'
    },
    frame: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 5% 108px 5%',  
        gap: '30px',
    },
    boundaryContainer: {
        border: '1px solid #E4E4E4',
        borderRadius: '15px',
        padding: '35px 45px 25px 45px',
        boxSizing: 'border-box',
        minWidth: 'fit-content',
        width: '70%',    
        margin: '0 auto' 
    },
    titleArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: '15px'
    },
 title: {
       fontSize: '25px',
       fontFamily: 'Lato',
       fontWeight: '600'
   },
   guide: {
       fontSize: '10px',
       fontFamily: 'Lato',
       fontWeight: '500',
       color: '#7A828A'
   },
   horizontal: {
       width: '100%',
       border: '1px solid #E4E4E4',
       marginTop: '0px',
   },
   contentArea: {
       display: 'flex',
       flexDirection: 'column',
       marginTop: '25px',
       gap: '25px'
   },
   settingContainer: {
       display: 'flex',
       justifyContent: 'space-between',
       height: '25px'
   },
   selectContainer: {
       display: 'flex',
       height: '25px',
       gap: '10px',
   },
   selectTypeContainer: {
    display: 'flex',
       height: '25px',
       gap: '10px',
       justifyContent: 'space-between',
},
   selectYear: {
       width: 'auto',
       padding: '0 8px',
       fontFamily: 'Lato',
       fontSize: '12px',
       border: 'solid 1px black',
       borderRadius: '4px',
   },
   selectMajor: {
       width: '90px',
       padding: '0 8px',
       fontFamily: 'Lato',
       fontSize: '12px',
       border: 'solid 1px black',
       borderRadius: '4px',
   },
   selectType: {
       width: 'auto',
       padding: '0 8px',
       fontFamily: 'Lato',
       fontSize: '12px',
       border: 'solid 1px black',
       borderRadius: '4px',
   },
   settingButton: {
       backgroundColor: 'white',
       fontFamily: 'Lato',
       fontSize: '12px',
       fontWeight: '800',
       border: 'solid 1px #2B2A28',
       borderRadius: '4px',
       borderWidth: '1px',
       ':hover': {
           cursor: 'pointer',
           backgroundColor: '#2B2A28',
           color: '#FFFEFB',
           transitionDuration: '0.2s',
       },
       ':active': {
           backgroundColor: '#595650',
           border: '1px solid #595650',
           color: '#FFFEFB',
       },
   },
   contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
},
   tableTitle: {
    fontFamily: 'Lato',
    fontSize: '15px',
    fontWeight: '800'
},
tableLayout: {
    marginTop: '10px',
    width: '100%',
    border: '1px solid #B9B9B9',
    borderCollapse: 'separate', 
    borderSpacing: 0, 
    borderRadius: '6px',
    overflow: 'hidden', 
},
   tableHeader: {
       width: '70px',
       height: '34px',
       fontFamily: 'Lato',
       fontSize: '12px',
       fontWeight: '700',
       backgroundColor: 'rgba(0, 0, 0, 0.06)',
       borderRight: '1px solid #B9B9B9',
       ':last-child': {
           borderRight: '0px'
       }
   },
   tableData: {
       height: '34px',
       padding: '0px',
       fontFamily: 'Lato',
       fontSize: '12px',
       fontWeight: '700',
       textAlign: 'center',
       borderTop: '1px solid #B9B9B9',
       borderRight: '1px solid #B9B9B9',
       ':last-child': {
           borderRight: '0px'
       }
   },
   input: {
    border: '1px solid #B9B9B9',
    borderRadius: '4px',
    width: '150px',
    height: '70%',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'Lato',
    color: '#7A828A',
   },
   expandButton: {
       width: '37px',
       height: '32px',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       border: '1px solid #666666',
       borderRadius: '20%',
       margin: '20px auto',
       cursor: 'pointer',
       backgroundColor: 'white',
       fontSize: '16px'
   },
   buttonContainer: {
       display: 'flex',
       justifyContent: 'center',
       width: '100%'
   },
   registerButton: {
       width: '70px',
       height: '25px',
       border: '1px solid #2B2A28',
       borderRadius: '4px',
       fontSize: '12px',
       fontWeight: '600',
       color: '#FFFEFB',
       backgroundColor: '#2B2A28',
       ':hover': {
           cursor: 'pointer',
       },
       ':active': {
           backgroundColor: '#595650',
           border: '1px solid #595650',
           color: '#FFFEFB',
       },
   },
   deleteButton: {
       padding: '4px 8px',
       backgroundColor: '#ff4444',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       fontSize: '12px',
       cursor: 'pointer',
       ':disabled': {
           backgroundColor: '#cccccc',
           cursor: 'not-allowed'
       }
   },
   noticeText: {
       color: '#666666',
       fontSize: '10px',
       textAlign: 'right',
   },
   boldText: {
    fontWeight: '700'
},
highlightText: {
    color: '#3d5286',
},
createButton: {
    padding: '2px 6px',
    border: '1px solid #000000',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '12px',
    fontWeight: '600',
    float: 'right',
    ':focus': {
        outline: 'none',
        borderColor: '#2B2A28'
    }
},  
dbButton: {
    padding: '2px 6px',
    border: '1px solid #000000',
    borderRadius: '4px',
    backgroundColor: 'black', 
    fontSize: '12px',
    fontWeight: '600',
    float: 'right',
    color: 'white', 
    ':hover': {
        cursor: 'pointer',
        backgroundColor: '#2B2A2',
        color: '#FFFEFB',
        transitionDuration: '0.2s',
    },
    ':active': {
        backgroundColor: '#595650',
        border: '1px solid #595650',
        color: '#FFFEFB',
    },
},
titleCell: {
    border: '1px solid #E0E0E0',
    color: '#006277',
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: '600',
    height: '36px',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    wordWrap: 'break-word',
},
resultCell: {
    border: '1px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '12px',
       fontWeight: '600',
       height: '36px',
       backgroundColor: 'rgba(0, 0, 0, 0.06)',
       textAlign: 'center',
       wordWrap: 'break-word',
},
   headerCell: {
       border: '1px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '11px',
       fontWeight: '600',
       height: '36px',
       backgroundColor: 'rgba(0, 0, 0, 0.06)',
       textAlign: 'center',
       wordWrap: 'break-word',
   },
   cell: {
       border: '1px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '10px',
       textAlign: 'center',
       height: '35px',
       backgroundColor: '#FFFFFF',
       wordWrap: 'break-word',
       maxWidth: '120px',
   },
   lastCell: {
       width: '40px',
       border: '1px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '10px',
       fontWeight: '600',
       textAlign: 'center',
       minHeight: '35px',
       backgroundColor: '#FFFFFF'
   },
   tableHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
},
tableButtons: {
    display: 'flex',
    flexDirection: 'column', // 세로 방향으로 변경
    gap: '10px', // 버튼 사이 간격
    alignItems: 'flex-end', // 오른쪽 정렬 유지
},
});

export default ManageCoursePage;