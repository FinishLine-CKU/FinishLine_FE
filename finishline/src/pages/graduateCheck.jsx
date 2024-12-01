// src/pages/graduateCheck.js


import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import UserHeader from '../components/userHeader';
import Footer from '../components/footer';
import logo2 from '../assets/images/logo2.png'; // 로고 이미지
import cap from '../assets/images/cap.png'; // 원 안에 넣을 이미지
import danger from '../assets/images/danger.png'; // 이수 통과
import pass from '../assets/images/pass.png'; // 이수 실패

const GraduateCheck = () => {
    const navigate = useNavigate(); // useNavigate 호출

    const handleButtonClick = () => {
        navigate('/기이수 과목 링크'); // 기이수 과목 링크 넣기 
    };

    const totalCredits = 130;
    const completedCredits = 102;

    // 진행률 계산
    const percentage = (completedCredits / totalCredits) * 100;

    return (
        <main className={css(styles.graduateCheckcontainer)}>
            <UserHeader additionalBoldLink="/graduateCheck" /> {/* 특정 링크 강조 */}
            <div className={css(styles.logoSection)}>
                <img src={logo2} alt="Finish Line Logo" className={css(styles.logo)} />
                <h1 className={css(styles.title)}>졸업요건 검사 결과</h1>
            </div>

            {/* "전체" 텍스트와 회색 선 */}
            <div className={css(styles.sectionDivider)}>
                <p className={css(styles.sectionTitle)}>전체</p>
                <div className={css(styles.grayLine)} />
            </div>

            <div className={css(styles.resultSection)}>
                <p className={css(styles.userInfo)}>소프트웨어학과 홍길동님의 결과입니다.</p>
                {/* 커스텀 원형 프로그래스바 */}
                <div className={css(styles.chartContainer)}>
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 120 120"
                        className={css(styles.progressSvg)}
                        style={{ clipPath: 'inset(0px 0px 50px 0px)' }} // 하단 숨기기
                    >
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="#364876"
                            strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 50}`}
                            strokeDashoffset={`${2 * Math.PI * 50 - (2 * Math.PI * 50 * percentage) / 100}`}
                            style={{
                                transition: 'stroke-dashoffset 0.5s ease',
                                transform: 'rotate(90deg)',
                                transformOrigin: 'center',
                            }}
                        />
                    </svg>
                    {/* 원 안의 숫자 강조 */}
                    <div className={css(styles.innerContent)}>
                        <img src={cap} alt="원 안의 사진" className={css(styles.cap)} />
                        <p className={css(styles.credits)}>
                            <span className={css(styles.highlightNumber)}>{completedCredits}</span> / {totalCredits} 학점
                        </p>
                    </div>
                </div>
                <p className={css(styles.remainingText)}>
                    졸업까지 <span className={css(styles.remainingHighlight)}>{totalCredits - completedCredits} 학점</span>{' '}
                    남았습니다!
                </p>
                <p className={css(styles.infoText)}>아래에서 부족한 영역을 확인하세요.</p>
            </div>

            <div className={css(styles.detailsSection)}>
                {/* 왼쪽 그룹: 전공, 일반선택 */}
                <div className={css(styles.leftSection)}>
                    <div className={css(styles.majorSection)}>
                        <div className={css(styles.horizontalRow)}>
                            <h2 className={css(styles.subtitle)}>전공</h2>
                            <p className={css(styles.creditsText)}>
                                <span className={css(styles.highlightNumber)}>59</span> / 69 학점
                            </p>
                        </div>
                        <div className={css(styles.majorGrayLine)} />
                        <p className={css(styles.alertText)}>
                            <img src={danger} alt="부족 아이콘" className={css(styles.icon)} />
                            전공 학점 <span className={css(styles.dangerHighLight)}>10 학점</span> 부족합니다.
                        </p>
                    </div>

                    <div className={css(styles.majorSection)}>
                        <div className={css(styles.horizontalRow)}>
                            <h2 className={css(styles.subtitle)}>일반선택</h2>
                            <p className={css(styles.creditsText)}>
                                <span className={css(styles.highlightNumber)}>19</span> / 25 학점
                            </p>
                        </div>
                        <div className={css(styles.majorGrayLine)} />
                        <p className={css(styles.alertText)}>
                            <img src={danger} alt="부족 아이콘" className={css(styles.icon)} />
                            일반선택 학점 <span className={css(styles.dangerHighLight)}>6 학점</span> 부족합니다.
                        </p>
                    </div>
                </div>

                {/* 오른쪽 그룹: 교양 */}
                <div className={css(styles.rightSection)}>
                    <div className={css(styles.generalSection)}>
                        <div className={css(styles.horizontalRow)}>
                            <h2 className={css(styles.subtitle)}>교양</h2>
                            <p className={css(styles.creditsText)}>
                                <span className={css(styles.highlightNumber)}>24</span> / 36 학점
                            </p>
                        </div>
                        <div className={css(styles.generalGrayLine)} />
                        <p className={css(styles.congratulationText)}>축하합니다🎉</p>
                        <p className={css(styles.alertText)}>
                            <img src={pass} alt="이수 완료 아이콘" className={css(styles.icon)} />
                            교양 필수 <span className={css(styles.passHighLight)}>이수 완료</span> 했습니다!
                        </p>
                        <p className={css(styles.infoText)}>추가로 수강해야하는 영역을 확인하세요.</p>
                        <p className={css(styles.alertText)}>
                            <img src={danger} alt="부족 아이콘" className={css(styles.icon)} />
                            교양 선택 <span className={css(styles.dangerHighLight)}>12 학점</span> 부족합니다.
                        </p>
                        <div className={css(styles.additionalInfo)}>
                            <p>정보기술, 자연과학, 수리와과학 중 1과목 (2학점)</p>
                            <p>인간과문학, 역사와사회, 철학과예술 중 4과목 (8학점)</p>
                            <p>인간과문학, 언어와문화 중 1과목 (2학점)</p>
                        </div>
                    </div>

                    {/* 기이수과목 추가하기 버튼 */}
                    <div className={css(styles.buttonWrapper)}>
                        <button
                            className={css(styles.addButton)}
                            onClick={handleButtonClick} // 클릭 시 페이지 이동
                        >
                            기이수과목 추가하기
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};



const styles = StyleSheet.create({
    graduateCheckcontainer: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: '#FFFEFB',
        minHeight: '190vh', // 뷰포트 기준 최소 높이 설정
        display: 'flex', // Flexbox 사용
        flexDirection: 'column', // 세로 정렬
        justifyContent: 'space-between', // 헤더, 본문, 푸터 간 간격 조정
        position: 'relative', // 푸터 드롭다운 위치 충돌 방지
    },



    logo: {
        display: 'block',
        margin: '0 auto 0px',
        height: '130px',

    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
    },

    sectionTitle: {
        fontSize: '20px',
        fontWeight: 'bold', // 볼드체
        color: '#333',
        marginBottom: '10px',
        marginRight: '30%',
    },

    grayLine: {
        height: '1px',
        backgroundColor: '#cccccc', // 회색 선 색상
        margin: '0 auto',
        width: '33%',
    },

    resultSection: {
        marginBottom: '40px',
    },
    userInfo: {
        fontSize: '25px',
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#364876',
    },
    chartContainer: {
        position: 'relative',
        width: '200px',
        height: '200px',
        margin: '0 auto 20px',
        overflow: 'hidden', // 아래 부분을 숨김
    },
    progressSvg: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    innerContent: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%', // 추가: 너비 확보


    },
    cap: {
        width: '140px',
        height: '140px',
        marginTop: '70px',
    },
    credits: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        marginTop: '0', // 여백 제거
    },
    remainingText: {
        fontSize: '20px',
        fontWeight: 'bold',

    },

    infoText: {
        fontSize: '12px',
        color: '#333',

    },

    remainingHighlight: {
        color: '#e74c3c',
    },

    majorGrayLine: {
        height: '1px',
        backgroundColor: '#cccccc',
        width: '100%',
    },

    generalGrayLine: {
        height: '1px',
        backgroundColor: '#cccccc',
        width: '100%',
    },


    horizontalRow: {
        display: 'flex',
        alignItems: 'center', // 세로 정렬
        gap: '12px',
    },


    detailsSection: {
        display: 'flex',
        justifyContent: 'space-between', // 양쪽으로 정렬
        marginTop: '40px',
        marginBottom: '330px',
        padding: '0 20%', // 좌우 여백 추가
    },

    leftSection: {
        textAlign: 'left', // 왼쪽 정렬
    },


    subtitle: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    creditsText: {
        fontSize: '20px',
        fontWeight: 'bold',
    },

    congratulationText: {
        fontSize: '13px',
        marginRight: '138px',

    },

    alertText: {
        fontSize: '20px',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    alertIcon: {
        marginRight: '5px',
        color: '#e74c3c',
    },
    successIcon: {
        marginRight: '5px',
        color: '#2ecc71',
    },

    // 통과 초록색 문구로 꾸미기
    passHighLight: {
        color: '#86c46d',
        fontWeight: 'bold',
    },

    // 이수부족 빨간색 문구로 꾸미기
    dangerHighLight: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },


    highlightNumber: {
        fontSize: '20px',
        color: '#364876',
        fontWeight: 'bold',
    },

    additionalInfo: {
        color: '#3c5184', // 텍스트 색상
        fontWeight: 'bold', // 텍스트 굵기
        fontSize: '12px', // 텍스트 크기
        paddingLeft: '70px', // 왼쪽 여백 추가 (목록 스타일 느낌을 위해)
        textAlign: 'left', // 텍스트 왼쪽 정렬
        lineHeight: '1.5', // 줄 간격 조정
    },

    // 통과, 부족 아이콘 
    icon: {
        width: '50px', // 원하는 크기 설정
        height: '50px',
        marginRight: '8px', // 텍스트와 간격
        verticalAlign: 'middle', // 텍스트와 아이콘 정렬
        margin: '0px',
    },

    // 버튼 위치
    buttonWrapper: {
        position: 'absolute', // 위치를 절대값으로 설정
        marginTop: '140px',
        left: '50%', // 좌우 중앙 정렬
        transform: 'translateX(-50%)', // X축으로 중앙 정렬 보정
        textAlign: 'center',
    },

    // 버튼 꾸미기
    addButton: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#364876',
        border: 'none',
        padding: '12px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ':hover': {
            backgroundColor: '#2a3d6a', // 버튼에 호버 효과
        },
    },

});

export default GraduateCheck;
