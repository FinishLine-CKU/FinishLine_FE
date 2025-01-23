import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { MAJOR, MICRO_DEGREE, SUBMAJORTYPE } from '../pages/signupPage2';
import Header from '../components/header';
import Template from '../components/template';
import Footer from '../components/footer';

function MyPage() {
    const [major, setMajor] = useState();
    const [student_id, setStudent_id] = useState();
    const [sub_major_type, setSub_major_type] = useState();
    const [sub_major, setSub_major] = useState();
    const [micro_degree, setMicro_degree] = useState();
    const myInfo = async () => {
        const response = await axios.post('http://127.0.0.1:8000/user/my_info/', {
            name : localStorage.getItem('name')
        });
        if (response.data.major && response.data.student_id) {
            if (response.data.sub_major_type && response.data.sub_major) {
                if (response.data.micro_degree) {
                    const { major, student_id, sub_major_type, sub_major, micro_degree } = response.data;
                    setMajor(MAJOR.find(item => item.value === major).label);
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

    useEffect(() => {
        myInfo();
    }, []);

    return (
        <>
            <Header />
            <Template title="마이페이지" />
            <div className={css(styles.container)}>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 정보</span>
                        <button className={css(styles.button)}>수정</button>
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
                        <button className={css(styles.button)}>자세히보기</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
                        <span className={css(styles.graduState)}>졸업까지 28학점 이수해야 합니다!</span>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>전공</span>
                            <span className={css(styles.graduContent)}>10학점 부족</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양필수</span>
                            <span className={css(styles.graduContent)}>봉사와 실천 (2학점)</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>교양선택</span>
                            <span className={css(styles.graduContent)}>인간과문학, 역사와사회, 철학과예술 중 4과목 (8학점)</span>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>일반선택</span>
                            <span className={css(styles.graduContent)}>6학점 부족</span>
                        </div>
                    </div>
                    
                </div>
                <div className={css(styles.boundaryContainer)}>
                    <div className={css(styles.titleArea)}>
                        <span className={css(styles.title)}>내 기이수과목</span>
                        <button className={css(styles.button)}>추가하기</button>
                    </div>
                    <hr className={css(styles.horizontal)}></hr>
                    <div className={css(styles.contentArea)}>
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
                            <button className={css(styles.button)}>변경하기</button>
                        </div>
                        <div className={css(styles.contentContainer)}>
                            <span className={css(styles.contentTitle)}>회원탈퇴</span>
                            <button className={css(styles.button)}>탈퇴하기</button>
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
        marginTop: '60px',
        marginBottom: '85px',
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
        gap: '30px'
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
    }
});

export default MyPage;