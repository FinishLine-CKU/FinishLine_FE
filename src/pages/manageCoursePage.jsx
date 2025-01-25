import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Footer from '../components/footer';
import Template from '../components/template';
import Sidebar from '../components/sideBar.jsx';
import axios from 'axios';

function ManageCoursePage() {
    const [selectedYear, setSelectedYear] = useState('2019');
    const [selectedDepartment, setSelectedDepartment] = useState('일반학과');
    const [selectedType, setSelectedType] = useState('교양필수');
    const [isExpanded, setIsExpanded] = useState(false);
    const [courseData, setCourseData] = useState([{
        type: '인간학',
        area: '2',
        credit: '2과목',
        requirement: '4',
        alternative: '인간학'
    }]);
    const [totalRequired, setTotalRequired] = useState(0);
    const [totalElective, setTotalElective] = useState(0);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourseData(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.post('/api/courses', {
                year: selectedYear,
                department: selectedDepartment,
                type: selectedType
            });
            fetchCourses();
        } catch (error) {
            console.error('Error submitting course:', error);
        }
    };

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.mainArea)}>
                <Sidebar />
                <div className={css(styles.contentWrapper)}>
                    {/* 이 부분에만 여백 추가 */}
                    <div className={css(styles.topSectionSpacing)}>
                        <Template title="교양 교육과정 관리" />
                    </div>
                    <div className={css(styles.content)}>
                       {/* Top Section */}
                       <div className={css(styles.sectionBase, styles.topSectionContainer)}>
                           <h2 className={css(styles.sectionTitle)}>교양 교육과정 등록</h2>
                           <div className={css(styles.noticeText)}>
                               등록한 교육과정을 아래 DB에서 확인하세요.
                           </div>
                           <div className={css(styles.divider)} />
                           <div className={css(styles.noticeText)}>
                              의학과, 간호학과, 건축학과, 의료경영학과, 건축공학과를 제외한 <br />
                              모든 학과는 <span className={css(styles.boldText)}>일반 학과</span>로 분류됩니다.
                           </div>
                           <div className={css(styles.selectGroup)}>
                               <select
                                   className={css(styles.select)}
                                   value={selectedYear}
                                   onChange={(e) => setSelectedYear(e.target.value)}
                               >
                                   <option value="2019">2019</option>
                                   <option value="2020">2020</option>
                                   <option value="2021">2021</option>
                               </select>
                               <select
                                   className={css(styles.select)}
                                   value={selectedDepartment}
                                   onChange={(e) => setSelectedDepartment(e.target.value)}
                               >
                                   <option value="일반학과">일반학과</option>
                                   <option value="의예과">의예과</option>
                               </select>
                               </div>
                               <select
                                   className={css(styles.select)}
                                   value={selectedType}
                                   onChange={(e) => setSelectedType(e.target.value)}
                               >
                                   <option value="교양필수">교양필수</option>
                                   <option value="교양선택">교양선택</option>
                               </select>
                               <button className={css(styles.createButton)}>생성</button>
                           <h2 className={css(styles.sectionSubTitle)}>
                               2019학년도 일반학과 <span className={css(styles.highlightText)}>교양필수</span>
                           </h2>
                           <div className={css(styles.topTableContainer)}>
                           <table className={css(styles.table)}>
                                    <thead>
                                        <tr>
                                            <th className={css(styles.headerCell)}>이수영역</th>
                                            <th className={css(styles.headerCell)}>학점</th>
                                            <th className={css(styles.headerCell)}>조건 (횟수/P/NP)</th>
                                            <th className={css(styles.headerCell)}>총학점</th>
                                            <th className={css(styles.headerCell)}>대체과목 영역</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={css(styles.cell)}>
                                                <select className={css(styles.selectFlex)}>
                                                    <option>인간학</option>
                                                </select>
                                            </td>
                                            <td className={css(styles.cell)}>
                                                <input type="text" defaultValue="2" className={css(styles.numberInput)} />
                                            </td>
                                            <td className={css(styles.cell)}>
                                                <select className={css(styles.selectFlex)}>
                                                    <option>2과목</option>
                                                </select>
                                            </td>
                                            <td className={css(styles.cell)}>
                                                <input type="text" defaultValue="4" className={css(styles.numberInput)} />
                                            </td>
                                            <td className={css(styles.cell)}>
                                                <select className={css(styles.selectFlex)}>
                                                    <option>인간학</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                           <button
                               className={css(styles.expandButton)}
                               onClick={() => setIsExpanded(!isExpanded)}
                           >
                               +
                           </button>
                           <div className={css(styles.buttonContainer)}>
                               <button
                                   className={css(styles.submitButton)}
                                   onClick={handleSubmit}
                               >
                                   등록하기
                               </button>
                           </div>
                       </div>

                       {/* Bottom Section */}
                       <div className={css(styles.sectionBase, styles.bottomSectionContainer)}>
                           <h2 className={css(styles.sectionTitle)}>교양 교육과정 DB</h2>
                           <div className={css(styles.divider)} />
                           <div className={css(styles.selectGroup)}>
                           <select
                               className={css(styles.select)}
                               value={selectedYear}
                               onChange={(e) => setSelectedYear(e.target.value)}
                           >
                               <option value="2019">2019</option>
                               <option value="2020">2020</option>
                               <option value="2021">2021</option>
                           </select>
                           <select
                               className={css(styles.select)}
                               value={selectedDepartment}
                               onChange={(e) => setSelectedDepartment(e.target.value)}
                           >
                               <option value="일반학과">일반학과</option>
                               <option value="의예과">의예과</option>
                           </select>
                            <button className={css(styles.createButton)}>조회</button>
                           <div style={{marginLeft: 'auto'}}>
                            <button className={css(styles.createButton)}>편집</button>
                            </div>
                           </div>
                           <button className={css(styles.dbButton)}>삭제</button>
                           <h2 className={css(styles.sectionSubTitle)}>2019학년도 일반학과</h2>
                           <div className={css(styles.bottomTableContainer)}>
                               <table className={css(styles.table)}>
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
                                        {courseData.map((course, index) => (
                                            <tr key={index}>
                                                <td className={css(styles.cell)}>{course.type}</td>
                                                <td className={css(styles.cell)}>{course.area}</td>
                                                <td className={css(styles.cell)}>{course.credit}</td>
                                                <td className={css(styles.cell)}>{course.requirement}</td>
                                                <td className={css(styles.cell)}>{course.alternative}</td>
                                                <td className={css(styles.cell)}>{course.type}</td>
                                                <td className={css(styles.cell)}>{course.area}</td>
                                                <td className={css(styles.cell)}>{course.credit}</td>
                                                <td className={css(styles.cell)}>{course.requirement}</td>
                                                <td className={css(styles.cell)}>{course.alternative}</td>
                                                {index === 0 ? (
                                                    <td className={css(styles.lastCell)} rowSpan={courseData.length + 1}>
                                                        {totalRequired + totalElective}
                                                    </td>
                                                ) : null}
                                            </tr>
                                        ))}
                                        <tr>
                                        <td colSpan="5" className={css(styles.cell)}>{totalRequired}</td>
                                        <td colSpan="5" className={css(styles.cell)}>{totalElective}</td>
                                    </tr>
                                </tbody>
                               </table>
                           </div>
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
        backgroundColor: '#FFFEFB',
        display: 'flex',
        flexDirection: 'column',
    },
    mainArea: {
        display: 'flex',
        flex: 1
    },
    contentWrapper: {
        flexDirection: 'column',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato',
        marginLeft: '256px',
        width: 'calc(100% - 256px)' 
    },
     topSectionSpacing: {
        marginTop: '60px',
        marginBottom: '60px', 
    },
    content: {
        width: '100%',
        maxWidth: '1200px',
        padding: '0 32px',
        margin: '0 auto'
    },
    sectionBase: {
        marginBottom: '50px', 
    },
    topSectionContainer: {
        width: '500px',  
        height: '500px',
        padding: '32px 300px',
        backgroundColor: '#FFFEFB',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    },
    bottomSectionContainer: {
        height: '800px',
        padding: '32px 200px', 
        backgroundColor: '#FFFEFB', 
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)', 
    },
   noticeText: {
       color: '#666666',
       fontSize: '10px',
       textAlign: 'right',
   },
   boldText: {
    fontWeight: '700', 
},
   sectionTitle: {
       fontSize: '25px',
       fontWeight: '700',
       marginBottom: '16px',
       color: '#111827'
   },
   sectionSubTitle: {
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#111827'
},
highlightText: {
    color: '#3d5286',  
},
   selectGroup: {
       display: 'flex',
       gap: '16px',
       marginBottom: '16px'
   },
   select: {
       padding: '8px 12px',
       border: '1px solid #000000',
       borderRadius: '4px',
       backgroundColor: 'white',
       fontSize: '12px',
       ':focus': {
           outline: 'none',
           borderColor: '#2B2A28'
       }
   },   
   createButton: {
    padding: '8px 12px',
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
    padding: '8px 12px',
    border: '1px solid #000000',
    borderRadius: '4px',
    backgroundColor: 'black', 
    fontSize: '12px',
    fontWeight: '600',
    float: 'right',
    color: 'white', 
    ':focus': {
        outline: 'none',
        borderColor: '#2B2A28'
    }
},  
   gridContainer: {
       display: 'grid',
       gridTemplateColumns: 'repeat(3, 1fr)',
       gap: '16px',
       marginBottom: '24px',
       transition: 'max-height 0.3s ease'
   },
   gridCollapsed: {
       maxHeight: '150px',
       overflow: 'hidden'
   },
   column: {
       display: 'flex',
       flexDirection: 'column',
       gap: '8px'
   },
   inputGroup: {
       display: 'flex',
       gap: '8px'
   },
   selectFlex: {
       flex: 1,
       padding: '8px 12px',
       border: '1px solid #000000',
       borderRadius: '4px',
       fontSize: '14px'
   },
   numberInput: {
       width: '64px',
       padding: '8px 12px',
       border: '1px solid #000000',
       borderRadius: '4px',
       fontSize: '14px'
   },
   fullWidth: {
       width: '100%'
   },
   expandButton: {
       width: '41px',
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
   divider: {
       height: '1px',
       backgroundColor: '#E4E4E4',
       margin: '20px 0',
   },
   buttonContainer: {
       display: 'flex',
       justifyContent: 'center',
       marginTop: '24px'
   },
   submitButton: {
       padding: '7px 11px',
       backgroundColor: '#2B2A28',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       fontSize: '12px',
       fontWeight: '600',
       cursor: 'pointer'
   },
   topTableContainer: {
       width: '500px',
   },
   bottomTableContainer: {
    width: '800px',
},
   table: {
       width: '100%',
       borderCollapse: 'collapse',
       borderRadius: '4px',
       overflow: 'hidden'
   },
   titleCell: {
    border: '2px solid #E0E0E0',
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
    border: '2px solid #E0E0E0',
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
       border: '2px solid #E0E0E0',
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
       border: '2px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '10px',
       textAlign: 'center',
       height: '35px',
       backgroundColor: '#FFFFFF',
       wordWrap: 'break-word',
       maxWidth: '120px',
       whiteSpace: 'nowrap',
       overflow: 'hidden',
       textOverflow: 'ellipsis',
   },
   lastCell: {
       width: '40px',
       border: '2px solid #E0E0E0',
       color: '#333333',
       fontFamily: 'Lato',
       fontSize: '10px',
       fontWeight: '600',
       textAlign: 'center',
       minHeight: '35px',
       backgroundColor: '#FFFFFF'
   },
});

export default ManageCoursePage;