import React, { useState } from 'react';
import styles from './LoginSignup.module.css';
import oser from "../assets/img/oser.ai-removebg white.png"
import axios from 'axios';


function LoginSignup() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleToggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8082/api/user/login",
                { email, password });
            console.log(response);
            if (response.status === 200) {
                document.cookie = `jwt=${response.data._id}; path=/; samesite=strict; secure;`;
            }
            window.location.href = "/home";
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8082/api/user/register",
                { email, password });
            console.log(response);
            if (response.status === 200) {
                document.cookie = `jwt=${response.data._id}; path=/; samesite=strict; secure;`;
            }
            window.location.href = "/home";
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.oserStartupConatiner}>
            <img src={oser} alt="Oser.ai" className={styles.oserLogo} />
            <div className={styles.container}>
                <h1 className={styles.title}>{isLoginMode ? 'Login' : 'Signup'}</h1>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            required
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {!isLoginMode && (
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                required
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}
                    <button type="submit" className={styles.button} onClick={isLoginMode ? handleLogin : handleSignup}>
                        {isLoginMode ? 'Login' : 'Signup'}
                    </button>
                </form>
                <p className={styles.toggleText}>
                    {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={handleToggleMode} className={styles.toggleButton}>
                        {isLoginMode ? 'Signup' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginSignup;