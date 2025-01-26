import { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import SideBar from '../components/sideBar';
import Template from '../components/template';
import Footer from '../components/footer';
import { MAJOR, SUBMAJORTYPE, MICRO_DEGREE } from '../pages/signupPage2';

function ManageGraduPage() {
    const [year, setYear] = useState('2025');
    const [major, setMajor] = useState('');
    const [additionalMajor, setAdditionalMajor] = useState('');
    const [microDegree, setMicroDegree] = useState('');
    const [yearDB, setYearDB] = useState('2025');
    const [majorDB, setMajorDB] = useState('');

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
                                    <select className={css(styles.settingMajor)} value={major} onChange={(e) => setMajor(e.target.value)}>
                                        <option value="">전공 설정</option>
                                        { MAJOR.map((item) => (
                                            <option value={item.value}>{item.label}</option>
                                        )) }
                                    </select>
                                    <select className={css(styles.settingAdditionalMajor)} value={additionalMajor} onChange={(e) => setAdditionalMajor(e.target.value)}>
                                        <option value="">추가 전공</option>
                                        { SUBMAJORTYPE.map((item) => (
                                            <option value={item.value}>{item.label}</option>
                                        )) }
                                    </select>
                                    <select className={css(styles.settingMicroDegerr)} value={microDegree} onChange={(e) => setMicroDegree(e.target.value)}>
                                        <option value="">소단위전공</option>
                                            { MICRO_DEGREE.map((item) => (
                                                <option value={item.value}>{item.label}</option>
                                            )) }
                                    </select>
                                </div>
                                <button className={css(styles.settingButton)}>생성</button>
                            </div>
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
                                    { MAJOR.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    )) }
                                </select>
                                <button className={css(styles.settingButton)}>조회</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '80px',
        marginLeft: '273px'
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
        marginTop: '15px'
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
        border: 'solid 1px 2B2A28',
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
            border: '1x solid #595650',
            color: '#FFFEFB',
        },
    }
});

export default ManageGraduPage;