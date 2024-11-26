// src/pages/graduateCheck.js


import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import UserHeader from '../components/userHeader';
import Footer from '../components/footer';
import logo2 from '../assets/images/logo2.png'; // 로고 이미지
import cap from '../assets/images/cap.png'; // 원 안에 넣을 이미지

const GraduateCheck = () => {
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

            {/* 전공과 교양 섹션 */}
            <div className={css(styles.detailsSection)}>
                {/* 전공 */}
                <div className={css(styles.majorSection)}>
                    <div className={css(styles.horizontalRow)}>
                        <h2 className={css(styles.subtitle)}>전공</h2>
                        <p className={css(styles.creditsText)}>
                            <span className={css(styles.highlightNumber)}>59</span> / 69 학점
                        </p>
                    </div>
                    <div className={css(styles.majorGrayLine)} />
                    <p className={css(styles.alertText)}>
                        <span className={css(styles.alertIcon)}>⚠️</span> 전공 학점{' '}
                        <span className={css(styles.highlight)}>10 학점</span> 부족합니다.
                    </p>
                </div>

                {/* 교양 */}
                <div className={css(styles.generalSection)}>
                    <div className={css(styles.horizontalRow)}>
                        <h2 className={css(styles.subtitle)}>교양</h2>
                        <p className={css(styles.creditsText)}>
                            <span className={css(styles.highlightNumber)}>24</span> / 36 학점
                        </p>
                    </div>
                    <div className={css(styles.generalGrayLine)} />
                    <p className={css(styles.alertText)}>
                        <span className={css(styles.successIcon)}>✅</span> 교양 필수 이수 완료 했습니다!
                    </p>
                    <p className={css(styles.alertText)}>
                        <span className={css(styles.alertIcon)}>⚠️</span> 교양 선택{' '}
                        <span className={css(styles.highlight)}>12 학점</span> 부족합니다.
                    </p>

                    {/* 기이수과목 추가하기 버튼 */}
                    <div className={css(styles.buttonWrapper)}>
                        <button className={css(styles.addButton)}>기이수과목 추가하기</button>
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
    },
 
    logo: {
        height: '120px',
        
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
        width: '120px',
        height: '120px',
        marginLeft: '10px',
        marginTop: '80px', 
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
        justifyContent: 'space-between', // 제목과 학점을 양쪽으로 배치
        alignItems: 'center', // 세로 정렬
        gap: '10px',
        marginBottom: '5px', // 제목과 회색 선 간격
    },

    
    detailsSection: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
        marginBottom: '400px', // 이걸로 전체 높이 조절
    },

    subtitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    creditsText: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    alertText: {
        fontSize: '14px',
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
    highlight: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },

    highlightNumber: {
        fontSize: '20px', 
        color: '#364876', 
        fontWeight: 'bold',
    },

    buttonWrapper: {
        position: 'absolute', // 위치를 절대값으로 설정
        marginTop:'220px',
        left: '50%', // 좌우 중앙 정렬
        transform: 'translateX(-50%)', // X축으로 중앙 정렬 보정
        textAlign: 'center',
    },
    
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
