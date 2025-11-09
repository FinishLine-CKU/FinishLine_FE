import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import SideBar from '../components/sideBar';
import Template from '../components/template';
import Footer from '../components/footer';
import { SUBMAJORTYPE } from '../pages/signupPage2';
import axios from 'axios';

function ManageGraduPage() {
    const [visibleTable, setVisibleTable] = useState(false);
    const [year, setYear] = useState('2025');
    const [major, setMajor] = useState('');
    const [additionalMajor, setAdditionalMajor] = useState('');
    const [microDegree, setMicroDegree] = useState('');
    const [yearDB, setYearDB] = useState('2025');
    const [majorDB, setMajorDB] = useState('');
    const [majorCredit, setMajorCredit] = useState('');
    const [generalCredit, setGeneralCredit] = useState('');
    const [generalChooseCredit, setGeneralChooseCredit] = useState('');
    const [normalCredit, setNormalCredit] = useState('');
    const [addMajorCredit, setAddMajorCredit] = useState('');
    const [microDegreeCredit, setMicroDegreeCredit] = useState('');
    const [totalCredit, setTotalCredit] = useState('0');
    const [majorMap, setMajorMap] = useState([]);
    const [MDMap, setMDMap] = useState([]);

    const creatTable = () => {
        year && major ? setVisibleTable(true) : alert('등록년도와 전공을 선택해주세요.');
        if (visibleTable) {
            alert('이미 테이블이 생성되어있습니다.');
        }
    };
    const majorMapping = async () => {
        const response = await axios.get('https://finishline-cku.com/user/major_mapping/');
        if (response.data) {
            const { majors, MDs } = response.data;
            setMajorMap(majors);
            setMDMap(MDs);
        } else {
            alert("학과 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        };
    };
    
    useEffect(() => {
        majorMapping();
    }, [])
    useEffect(() => {
        if (!additionalMajor) {
            setAddMajorCredit(0);
        }
        if (!microDegree) {
            setMicroDegreeCredit(0);
        }
        setTotalCredit((parseInt(majorCredit) || 0) + (parseInt(generalCredit) || 0) + (parseInt(generalChooseCredit) || 0) + (parseInt(normalCredit) || 0) + (parseInt(addMajorCredit) || 0) + (parseInt(microDegreeCredit) || 0));
    }, [additionalMajor, microDegree, majorCredit, generalCredit, generalChooseCredit, normalCredit, addMajorCredit, setAddMajorCredit, microDegreeCredit, setMicroDegreeCredit]);

    return (
        <>
            <SideBar />
            <div className={css(styles.container)}>
                <Template title="졸업 요건 관리" />
                <div className={css(styles.frame)}>
                    <div className={css(styles.boundaryContainer)}>
                        <div className={css(styles.titleArea)}>
                            <span className={css(styles.title)}>새 졸업요건 등록</span>
                            <span className={css(styles.guide)}>등록한 졸업 요건을 아래 DB에서 확인하세요.</span>
                        </div>
                        <hr className={css(styles.horizontal)}></hr>
                        <div className={css(styles.contentArea)}>
                            <div className={css(styles.settingContainer)}>
                                <div className={css(styles.selectContainer)}>
                                    <select className={css(styles.settingYear)} value={year} onChange={(e) => setYear(e.target.value)}>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </select>
                                    <select className={css(styles.settingMajor)} value={major} onChange={(e) => { if (visibleTable && !e.target.value) { alert('작업 중인 졸업요건이 존재합니다. 등록을 마무리해주세요.'); return; } setMajor(e.target.value); }}>
                                        <option value="">전공 선택</option>
                                        {majorMap.map((item) => (
                                            <option value={item.major_code}>{item.major_label}</option>
                                        ))}
                                    </select>
                                    <select className={css(styles.settingAdditionalMajor)} value={additionalMajor} onChange={(e) => setAdditionalMajor(e.target.value)}>
                                        <option value="">추가 선택</option>
                                        {SUBMAJORTYPE.map((item) => (
                                            <option value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                    <select className={css(styles.settingMicroDegerr)} value={microDegree} onChange={(e) => setMicroDegree(e.target.value)}>
                                        <option value="">소단위 전공 선택</option>
                                        {MDMap.map((item) => (
                                            <option value={item.major_code}>{item.major_label}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className={css(styles.settingButton)} onClick={creatTable}>생성</button>
                            </div>
                            {visibleTable ?
                                <div className={css(styles.contentContainer)}>
                                    <span className={css(styles.tabelTitle)}>
                                        {year}학년도 {major ? majorMap.find(item => item.major_code === major).major_label : null}
                                        {additionalMajor ? microDegree ? ` (${SUBMAJORTYPE.find(item => item.value === additionalMajor).label} + ${MDMap.find(item => item.major_code === microDegree).major_label})` : ` (${SUBMAJORTYPE.find(item => item.value === additionalMajor).label})` : microDegree ? ` (${MDMap.find(item => item.major_code === microDegree).major_label})` : null}
                                    </span>
                                    <table className={css(styles.tableLayout)}>
                                        <thead>
                                            <tr>
                                                <th className={css(styles.tableHeader)}>전공</th>
                                                <th className={css(styles.tableHeader)}>교양필수</th>
                                                <th className={css(styles.tableHeader)}>교양선택</th>
                                                <th className={css(styles.tableHeader)}>일반선택</th>
                                                {additionalMajor ?
                                                    <th className={css(styles.tableHeader)}>{SUBMAJORTYPE.find(item => item.value === additionalMajor).label}</th>
                                                    : null}
                                                {microDegree ?
                                                    <th className={css(styles.tableHeader)}>소단위</th>
                                                    : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setMajorCredit(e.target.value)}></input></td>
                                                <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setGeneralCredit(e.target.value)}></input></td>
                                                <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setGeneralChooseCredit(e.target.value)}></input></td>
                                                <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setNormalCredit(e.target.value)}></input></td>
                                                {additionalMajor ?
                                                    <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setAddMajorCredit(e.target.value)}></input></td>
                                                    : null}
                                                {microDegree ?
                                                    <td className={css(styles.tableData)}><input className={css(styles.input)} placeholder="입력" onChange={(e) => setMicroDegreeCredit(e.target.value)}></input></td>
                                                    : null}
                                            </tr>
                                            <tr>
                                                <td className={css(styles.tableTotalData)} colSpan={additionalMajor ? microDegree ? "6" : "5" : microDegree ? "5" : "4"}>{totalCredit}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                : null}
                            {visibleTable ?
                                <div className={css(styles.buttonContainer)}>
                                    <button className={css(styles.registerButton)}>등록하기</button>
                                </div>
                                : null}
                        </div>
                    </div>
                    <div className={css(styles.boundaryContainer)}>
                        <div className={css(styles.titleArea)}>
                            <span className={css(styles.title)}>졸업요건 DB</span>
                        </div>
                        <hr className={css(styles.horizontal)}></hr>
                        <div className={css(styles.contentArea)}>
                            <div className={css(styles.selectContainer)}>
                                <select className={css(styles.settingYear)} value={yearDB} onChange={(e) => setYearDB(e.target.value)}>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                </select>
                                <select className={css(styles.settingMajor)} value={majorDB} onChange={(e) => setMajorDB(e.target.value)}>
                                    <option value="">전공 설정</option>
                                    {majorMap.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                                <button className={css(styles.settingButton)}>조회</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer footerType="manage" />
            </div>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '80px',
        marginLeft: '273px',
        backgroundColor: '#FFFEFB'
    },
    frame: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px 215px 108px 215px',
        gap: '30px'
    },
    boundaryContainer: {
        border: '1px solid #E4E4E4',
        borderRadius: '15px',
        padding: '35px 45px 25px 45px',
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
    settingYear: {
        width: 'auto',
        padding: '0 8px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '400px',
        border: 'solid 1px black',
        borderRadius: '4px',
    },
    settingMajor: {
        width: '170px',
        padding: '0 8px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '400px',
        border: 'solid 1px black',
        borderRadius: '4px',
    },
    settingAdditionalMajor: {
        width: 'auto',
        padding: '0 8px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '400px',
        border: 'solid 1px black',
        borderRadius: '4px',
    },
    settingMicroDegerr: {
        width: '170px',
        padding: '0 8px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '400px',
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
    },
    tabelTitle: {
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '800'
    },
    tableLayout: {
        marginTop: '10px',
        border: '1px solid #B9B9B9',
        borderRadius: '4px',
        borderSpacing: '0px',
    },
    tableRow: {
        width: 'auto',
        // height: '34px',
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
        border: '0px',
        borderRadius: '4px',
        padding: '0px',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'Lato',
        color: '#7A828A',
        ':focus': {
            outline: 'none',
        }
    },
    tableTotalData: {
        width: '100%',
        height: '34px',
        padding: '0px',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: '500',
        textAlign: 'center',
        borderTop: '1px solid #B9B9B9',
        borderCollapse: 'collapse',
        color: '#7A828A',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
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
    }
});

export default ManageGraduPage;