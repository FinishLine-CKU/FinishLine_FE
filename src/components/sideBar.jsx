import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import Symbol from '../assets/images/symbol.png';
import finishlineLogo from '../assets/images/finishlineLogo.png';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={css(styles.container)}>
            <div className={css(styles.logoSection)}>
                <img src={Symbol} className={css(styles.sideLogo)} />
                <img src={finishlineLogo} className={css(styles.mainText)} />
                <span className={css(styles.managerText)}>Manager</span>
            </div>

            <nav className={css(styles.navigation)}>
                <div className={css(styles.guideSection)}>
                    <div className={css(styles.guideText)}>이용 안내</div>
                </div>

                <div className={css(styles.menuSection)}>
                    <div
                        className={css(styles.menuItem)}
                        onClick={() => navigate('/manageRegisterPage')}
                    >
                        강의 정보 관리
                    </div>
                    <div
                        className={css(styles.menuItem)}
                        onClick={() => navigate('/manageGraduPage')}
                    >
                        졸업 요건 관리
                    </div>
                    <div
                        className={css(styles.menuItem)}
                        onClick={() => navigate('/manageCoursePage')}
                    >
                        교양 교육과정 관리
                    </div>
                </div>

                <div className={css(styles.logoutContainer)}>
                    <button className={css(styles.logoutButton)}>
                        로그아웃
                    </button>
                </div>
            </nav>
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '256px',
        minHeight: '100vh',
        backgroundColor: '#2B2A28',
        color: 'white',
        position: 'relative'
    },
    logoSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '24px',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    sideLogo: {
        width: '50px',
        height: '50px'
    },
    mainText: {
        height: '27px'
    },
    managerText: {
        fontSize: '15px',
        fontWeight: '700',
        color: '#ffffff',
        fontFamily: 'Lato'

    },
    navigation: {
        marginTop: '32px'
    },
    guideSection: {
        padding: '16px 0',
        borderTop: '1px solid #ffffff',
        borderBottom: '1px solid #ffffff'
    },
    guideText: {
        fontSize: '15px',
        fontWeight: '700',
        color: '#ffffff',
        fontFamily: 'Lato',
        textAlign: 'center',
    },
    menuSection: {
        padding: '8px 0'
    },
    menuItem: {
        padding: '12px 24px',
        color: '#ffffff',
        cursor: 'pointer',
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '600',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#595650',
        }
    },
    logoutContainer: {
        position: 'absolute',
        bottom: '32px',
        left: '9px',
        right: '9px'
    },
    logoutButton: {
        width: '100%',
        padding: '8px',
        border: '1px solid #ffffff',
        borderRadius: '9px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '700',
        fontFamily: 'Lato',
        ':hover': {
            cursor: 'pointer',
        },
        ':active': {
            backgroundColor: '#595650',
        }
    }
});

export default Sidebar;