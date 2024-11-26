// src/pages/userGuide.js

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import UserHeader from '../components/userHeader';
import Footer from '../components/footer';
import logo2 from '../assets/images/logo2.png'; // 로고 이미지

function UserGuide() {
    return (
        <div className={css(styles.userGuideContainer)}>
            <UserHeader additionalBoldLink="/userGuide" /> {/* 특정 링크 강조 */}
            <main className={css(styles.mainContent)}>
                {/* 상단 로고 및 타이틀 */}
                <div className={css(styles.logoSection)}>
                    <img src={logo2} alt="Finish Line Logo" className={css(styles.guideLogo)} />
                    <h1 className={css(styles.title)}>이용 가이드</h1>
                    <p className={css(styles.subtitle)}>
                        FinishLine을 효과적으로 사용하는 방법을 안내합니다.
                        <br />
                        아래의 안내에 따라 시스템을 사용해보세요.
                    </p>
                </div>

                {/* 주요 단계 섹션 */}
                <div className={css(styles.stepsSection)}>
                    {/* 회원가입 및 학생인증 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <div className={css(styles.placeholder)}>이미지</div>
                        </div>
                        <h2 className={css(styles.stepTitle)}>회원가입 및 학생인증</h2>
                        <p className={css(styles.stepDescription)}>
                            대학 포털 ID/PW를 입력하여 학생인증을 하고<br />
                            추가 정보(예: 자격) 및 비밀번호를 설정하여 회원가입을 합니다.
                        </p>
                        <p className={css(styles.notice)}>
                            학생 인증을 위해 입력한 비밀번호는<br />
                            학생 인증이후 사용자에 저장되지 않습니다.
                        </p>
                        <button className={css(styles.signupButton)}>회원가입</button>
                    </div>

                    {/* 로그인 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <div className={css(styles.placeholder)}>이미지</div>
                        </div>
                        <h2 className={css(styles.stepTitle)}>로그인</h2>
                        <p className={css(styles.stepDescription)}>
                            학번과 Finish Line 비밀번호를<br />
                            사용하여 로그인을 합니다.
                        </p>
                        <button className={css(styles.loginButton)}>로그인</button>
                    </div>

                    {/* 기이수 과목 등록 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <div className={css(styles.placeholder)}>이미지</div>
                        </div>
                        <h2 className={css(styles.stepTitle)}>기이수 과목 등록</h2>
                        <p className={css(styles.stepDescription)}>
                            카톨릭관동대 포털 통합정보시스템 →<br />
                            학적관리 → 개인 설정 및 정보 → 학적 →<br />
                            인트라넷 설정 진입 후 PDF 저장
                        </p>
                        <p className={css(styles.notice)}>
                            첨부한 PDF의 성적은 저장되지 않으며<br />
                            F학점 처리 시 최종 반영되지 않습니다.
                        </p>
                        <button className={css(styles.actionButton)}>등록하기</button>
                    </div>

                    {/* 졸업요건 검사 */}
                    <div className={css(styles.step)}>
                        <div className={css(styles.stepImage)}>
                            <div className={css(styles.placeholder)}>이미지</div>
                        </div>
                        <h2 className={css(styles.stepTitle)}>졸업요건 검사</h2>
                        <p className={css(styles.stepDescription)}>
                            기이수 과목의 점검과 입력된 데이터 기반으로<br />
                            부족한 학점 항목을<br />
                            계산하여 보여줍니다.
                        </p>
                        <p className={css(styles.notice)}>
                            기이수 과목 등록을 먼저 진행해주세요.
                        </p>
                        <button className={css(styles.actionButton)}>결과보기</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const styles = StyleSheet.create({
    userGuideContainer: {
        textAlign: 'center',
        fontFamily: 'Lato',
        backgroundColor: '#FFFEFB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
    },
    mainContent: {
        padding: '40px 20px',
    },
    logoSection: {
        marginBottom: '40px',
    },
    guideLogo: {
        height: '80px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#d5d3d1',
        lineHeight: '1.5',
    },
    stepsSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginTop: '40px',
    },
    step: {
        textAlign: 'center',
        padding: '10px',
    },
    stepImage: {
        marginBottom: '10px',
    },
    placeholder: {
        width: '100%',
        height: '120px',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        color: '#666',
    },
    stepTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#000',
    },
    stepDescription: {
        fontSize: '14px',
        color: '#d5d3d1',
        lineHeight: '1.5',
        marginBottom: '10px',
    },
    notice: {
        fontSize: '12px',
        color: '#006277',
        marginBottom: '10px',
    },
    signupButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#d5d3d1',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#1565c0',
        },
    },
    loginButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#d5d3d1',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '', // 호버 시 더 어두운 색
        },
    },
    actionButton: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#2B2A28',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#2a3d6a',
        },
    },
});

export default UserGuide;
