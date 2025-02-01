import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Footer from '../components/footer';
import Template from '../components/template';
import Sidebar from '../components/sideBar.jsx';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function ManageCoursePage() {
    const [selectedYear, setSelectedYear] = useState('2019');
    const [selectedDepartment, setSelectedDepartment] = useState('일반학과');
    const [selectedType, setSelectedType] = useState('교양필수');
    const [visibleTable, setVisibleTable] = useState(false);
    const [existingCourses, setExistingCourses] = useState([]);
    const [courseSettings, setCourseSettings] = useState([{
        area: '',
        credit: '',
        condition: '',
        totalCredit: '',
        alternative: ''
    }]);
    // 이수영역 옵션
    const requiredAreaOptions = [
        'VERUM인성', '봉사활동', '인간학', '논리적사고와글쓰기', '외국어',
        '디지털소통', '진로탐색', '창의성', '창업', '계열기초'
    ];
    const electiveAreaOptions = [
        '정치와 경제', '심리와 건강', '정보와 기술', '인간과 문학', '역사와 사회',
        '철학과 예술', '자연과 환경', '수리와 과학', '언어와 문화', '사회와 경제'
    ];
    const conditionOptions = [
        'P', 'NP'
    ];
    // 기존 교육과정 데이터 불러오기
    const fetchExistingCourses = async () => {
        try {
            const response = await axios.get('/api/manages/liberal-arts/');
            setExistingCourses(response.data);
        } catch (error) {
            console.error('Error fetching existing courses:', error);
        }
    };
    useEffect(() => {
        fetchExistingCourses();
    }, []);
    // 테이블 생성 핸들러
    const handleCreate = () => {
        if (!selectedYear || !selectedDepartment) {
            alert('등록년도와 학과를 선택해주세요.');
            return;
        }
        // 이미 존재하는 조합인지 확인
        const isDuplicate = existingCourses.some(
            course => course.year === selectedYear && 
                     course.department === selectedDepartment
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
    // 행 추가
    const addRow = () => {
        setCourseSettings([...courseSettings, {
            area: '',
            credit: '',
            condition: '',
            totalCredit: '',
            alternative: ''
        }]);
    };
    // 행 삭제
    const removeRow = (index) => {
        if (courseSettings.length > 1) {
            setCourseSettings(courseSettings.filter((_, i) => i !== index));
        }
    };
    // 등록 처리
// handleSubmit 함수도 수정
const handleSubmit = async () => {
    if (!courseSettings.every(setting => setting.area && setting.credit)) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }
    try {
        const courseData = courseSettings.map(setting => ({
            department: selectedDepartment,
            admission_year: selectedYear,
            completion_area: setting.area,
            required_credits: setting.credit,
            conditions: setting.condition,
            alternative_subject: setting.alternative
        }));

        await axios.post('/api/manages/liberal-arts/', courseData[0]);  // URL 수정
        
        alert('교육과정이 성공적으로 등록되었습니다.');
        setVisibleTable(false);
        setCourseSettings([{
            area: '',
            credit: '',
            condition: '',
            totalCredit: '',
            alternative: ''
        }]);
        
        fetchExistingCourses();
    } catch (error) {
        console.error('Error submitting course:', error);
        alert('교육과정 등록 중 오류가 발생했습니다.');
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
                                <button className={css(styles.settingButton)}>조회</button>
                            </div>
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
        padding: '50px 5% 108px 5%',  // 픽셀 대신 퍼센트 사용
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
       width: '170px',
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
       border: '1px solid #B9B9B9',
       borderRadius: '4px',
       borderSpacing: '0px',
       width: '100%'
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
    padding: '0px',
    width: '170px',
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
});

export default ManageCoursePage;