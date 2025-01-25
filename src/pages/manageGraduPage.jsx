import { StyleSheet, css } from 'aphrodite';
import SideBar from '../components/sideBar';
import Template from '../components/template';
import Footer from '../components/footer';
;
function ManageGraduPage() {
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

                                <button>생성</button>
                            </div>
                        </div>
                    </div>
                    <div className={css(styles.boundaryContainer)}>
                        <div className={css(styles.titleArea)}>
                            <span className={css(styles.title)}>졸업요건 DB</span>
                        </div>
                        <hr className={css(styles.horizontal)}></hr>
                        <div className={css(styles.contentArea)}>

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

    },
    settingContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});

export default ManageGraduPage;