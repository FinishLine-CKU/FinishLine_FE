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
        width: '273px',
        backgroundColor: '#2B2A28',
        color: 'white',
        position: 'fixed', // 고정 위치
        left: 0,
        top: 0,
        bottom: 0
    },
    logoSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '236px',
        gap: '2px'
    },
    sideLogo: {
        width: '65px',
    },
    mainText: {
        width: '127px'
    },
    managerText: {
        fontSize: '15px',
        fontWeight: '700',
        color: '#FFFEFB',
        fontFamily: 'Lato'

    },
    navigation: {
        marginTop: '32px'
    },
    guideSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        borderTop: '1px solid #FFFEFB',
        borderBottom: '1px solid #FFFEFB'
    },
    guideText: {
        fontSize: '15px',
        fontWeight: '800',
        color: '#FFFEFB',
        fontFamily: 'Lato',
        textAlign: 'center',
    },
    menuSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        paddingTop: '40px',
        paddingLeft: '43px',
        paddingRight: '85px'
    },
    menuItem: {
        color: '#FFFEFB',
        cursor: 'pointer',
        fontFamily: 'Lato',
        fontSize: '18px',
        fontWeight: '600',
        ':active': {
            color: '#AFAFAF',
        }
    },
    logoutContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '130px'
    },
    logoutButton: {
        width: '253px',
        padding: '10px',
        border: '1px solid #FFFEFB',
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#FFFEFB',
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