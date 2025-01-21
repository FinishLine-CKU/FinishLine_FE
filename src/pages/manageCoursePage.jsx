import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Footer from '../components/footer';
import Template from '../components/template';
import Sidebar from '../components/sideBar';

function ManageCoursePage() {
    const [selectedYear, setSelectedYear] = useState('2019');
    const [selectedDepartment, setSelectedDepartment] = useState('일반학과');
    const [selectedType, setSelectedType] = useState('교양필수');

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.mainArea)}>
                <Sidebar />
                <div className={css(styles.contentWrapper)}>
                    <Template
                        title="교양 교육과정 관리"
                    />
                    <div className={css(styles.content)}>
                        <div className={css(styles.mainContent)}>
                            {/* Registration Section */}
                            <div className={css(styles.section)}>
                                <h2 className={css(styles.sectionTitle)}>교양 교육과정 등록</h2>
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
                                    <select
                                        className={css(styles.select)}
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option value="교양필수">교양필수</option>
                                        <option value="교양선택">교양선택</option>
                                    </select>
                                </div>

                                <div className={css(styles.gridContainer)}>
                                    {/* Column 1 */}
                                    <div className={css(styles.column)}>
                                        <div className={css(styles.inputGroup)}>
                                            <select className={css(styles.selectFlex)}>
                                                <option>인간이해</option>
                                            </select>
                                            <input
                                                type="text"
                                                defaultValue="2"
                                                className={css(styles.numberInput)}
                                            />
                                        </div>
                                        <div className={css(styles.inputGroup)}>
                                            <select className={css(styles.selectFlex)}>
                                                <option>물리화영역</option>
                                            </select>
                                            <input
                                                type="text"
                                                defaultValue="1"
                                                className={css(styles.numberInput)}
                                            />
                                        </div>
                                    </div>

                                    {/* Column 2 */}
                                    <div className={css(styles.column)}>
                                        <div className={css(styles.inputGroup)}>
                                            <select className={css(styles.selectFlex)}>
                                                <option>2영역</option>
                                            </select>
                                            <input
                                                type="text"
                                                defaultValue="4"
                                                className={css(styles.numberInput)}
                                            />
                                        </div>
                                        <div className={css(styles.inputGroup)}>
                                            <select className={css(styles.selectFlex)}>
                                                <option>P</option>
                                            </select>
                                            <input
                                                type="text"
                                                defaultValue="1"
                                                className={css(styles.numberInput)}
                                            />
                                        </div>
                                    </div>

                                    {/* Column 3 */}
                                    <div className={css(styles.column)}>
                                        <select className={css(styles.select, styles.fullWidth)}>
                                            <option>인간이해</option>
                                        </select>
                                        <select className={css(styles.select, styles.fullWidth)}>
                                            <option>물리화영역</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={css(styles.buttonContainer)}>
                                    <button className={css(styles.submitButton)}>
                                        등록하기
                                    </button>
                                </div>
                            </div>

                            {/* DB Section */}
                            <div className={css(styles.section)}>
                                <h2 className={css(styles.sectionTitle)}>교양 교육과정 DB</h2>
                                <div className={css(styles.selectGroup)}>
                                    <select className={css(styles.select)}>
                                        <option>2019</option>
                                    </select>
                                    <select className={css(styles.select)}>
                                        <option>일반학과</option>
                                    </select>
                                    <button className={css(styles.searchButton)}>
                                        조회
                                    </button>
                                </div>

                                <div className={css(styles.tableContainer)}>
                                    <table className={css(styles.table)}>
                                        <thead>
                                            <tr>
                                                <th className={css(styles.th)}>이수구분</th>
                                                <th className={css(styles.th)}>영역</th>
                                                <th className={css(styles.th)}>주간 총점</th>
                                                <th className={css(styles.th)}>이수구분</th>
                                                <th className={css(styles.th)}>대체과목 영역</th>
                                                <th className={css(styles.th)}>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={css(styles.td)}>인간이해</td>
                                                <td className={css(styles.td)}>2</td>
                                                <td className={css(styles.td)}>4</td>
                                                <td className={css(styles.td)}>인간이해</td>
                                                <td className={css(styles.td)}>교양필수</td>
                                                <td className={css(styles.td)}>
                                                    <button className={css(styles.editButton)}>
                                                        수정하기
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
        flexDirection: 'column'
    },
    mainArea: {
        display: 'flex',
        flex: 1
    },
    contentWrapper: {
        flexDirection: 'column',
        backgroundColor: '#FFFEFB',
        fontFamily: 'Lato'
    },
    content: {
        width: '100%',
        maxWidth: '1200px',
        padding: '0 32px',
        margin: '0 auto'
    },
    mainContent: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    section: {
        padding: '24px',
        borderBottom: '1px solid #E4E4E4'
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px'
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
        fontSize: '14px',
        ':focus': {
            outline: 'none',
            borderColor: '#2B2A28'
        }
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
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
        backgroundColor: 'white',
        fontSize: '14px',
        ':focus': {
            outline: 'none',
            borderColor: '#2B2A28'
        }
    },
    numberInput: {
        width: '64px',
        padding: '8px 12px',
        border: '1px solid #000000',
        borderRadius: '4px',
        fontSize: '14px',
        ':focus': {
            outline: 'none',
            borderColor: '#2B2A28'
        }
    },
    fullWidth: {
        width: '100%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px'
    },
    submitButton: {
        padding: '8px 24px',
        backgroundColor: '#2B2A28',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#404040'
        }
    },
    searchButton: {
        padding: '8px 16px',
        border: '1px solid #000000',
        borderRadius: '4px',
        backgroundColor: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#F9FAFB'
        }
    },
    tableContainer: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        padding: '12px 16px',
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600'
    },
    td: {
        padding: '12px 16px',
        border: '1px solid #E5E7EB',
        fontSize: '14px'
    },
    editButton: {
        color: '#2563EB',
        background: 'none',
        border: 'none',
        padding: 0,
        fontSize: '14px',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline'
        }
    }
});

export default ManageCoursePage;