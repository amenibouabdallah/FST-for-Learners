import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import logo from '../../assets/images/noBg-logo.png';
import campus from '../../assets/images/Campus.jpg';
import '../SignIn-SignUp.css';
import '../SignIn-SignUp-mobile.css';
import axios from 'axios';

function SignIn() {
    const { t } = useTranslation();
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signin', { email: email, password: password });
            console.log("Response:", response.data);
            const { token, redirectPath } = response.data;
            localStorage.setItem('token', token);
            // Redirect to the appropriate path
            if (redirectPath) {
                window.location.href = redirectPath;
            } else {
                // Handle the case if redirectPath is not defined
                console.error('Redirect path is not defined');
            }
        } catch (error) {
            console.error('Error:', error.response.data.message);
            setShowAlert(true);
        }
    };
    

    return (
        <div className='login-view'>
           
            <div className='left-part'>
                <div className='logolang'>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg" />
                    </div>
                    <div className='logo'>
                        <img className='nobg-logo' src={logo} alt="" />
                    </div>
                </div>
                <h1 className='title'>{t('login.welcome')}</h1>
                <div className='d-flex flex-column align-items-center' >
                    {showAlert && (
                        <div className="alert alert-danger" role="alert">
                            {t('login.incorrectCredentials')}
                        </div>
                    )}
                
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t('login.emailPlaceholder')}
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder={t('login.passwordPlaceholder')}
                            required
                        />
                        <div className='lost-password'>
                            <p className='mdp'>{t('login.forgotPassword')}</p>
                            <Link className='mdp' to="/account/reset/request">{t('login.resetPassword')}</Link>
                        </div>
                        <button className='submit-button' type="submit">{t('login.signIn')}</button>
                        <div className='signup'>
                            <span className='mdp'>{t('login.noAccount')} <Link className='mdp' to="/register">{t('login.createAccount')}</Link></span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default SignIn;
