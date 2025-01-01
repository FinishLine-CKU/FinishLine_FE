import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (studentId && password) {
            // 실제 로그인 로직은 백엔드 API 연동 필요
            navigate('/dashboard');
        } else {
            alert('학번과 비밀번호를 모두 입력해주세요.');
        }
    };

    return (
        <div className={css(styles.pageContainer)}>
            
            <main className={css(styles.loginContainer)}>
                <h1 className={css(styles.pageTitle)}>로그인</h1>
                <p className={css(styles.pageSubtitle)}>Finish Line 서비스에 로그인하세요</p>
                
                <form onSubmit={handleLogin} className={css(styles.loginForm)}>
                    <input
                        type="text"
                        placeholder="학번"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className={css(styles.inputField)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={css(styles.inputField)}
                    />
                    <button type="submit" className={css(styles.loginButton)}>
                        로그인
                    </button>
                </form>
            </main>
            
        </div>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    loginContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFEFB',
        padding: '20px',
    },
    pageTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '30px',
        marginBottom: '10px',
    },
    pageSubtitle: {
        color: '#7A828A',
        fontFamily: 'Lato',
        fontSize: '15px',
        fontWeight: '500',
        marginBottom: '30px',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    inputField: {
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    loginButton: {
        padding: '10px',
        backgroundColor: '#006277',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
});

export default LoginPage;