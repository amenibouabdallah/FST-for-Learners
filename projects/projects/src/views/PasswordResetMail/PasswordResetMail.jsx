import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PasswordResetMail() {
    const { t } = useTranslation();
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/forgot-password', { email: email });
            console.log("Response:", response.data);
            localStorage.setItem('email', email);
            navigate("/account/reset/verify");
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
                <h1 className='title'>{t('passwordReset.welcome')}</h1>
                <div >
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t('login.emailPlaceholder')}
                            required
                        />
                        <button className='submit-button' type="submit">{t('passwordReset.validate')}</button>
                    </form>
                    {showAlert && <p className='error-message'>{t('passwordReset.mailNoExist')}</p>}
                                    </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default PasswordResetMail
