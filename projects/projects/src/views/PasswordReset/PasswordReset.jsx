import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios'

function PasswordReset() {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/new-password', { email, password, confirmPassword })
        } catch (error) {
            console.log(error);
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
                            type="password"
                            className='login-input'
                            value={password}
                            placeholder={t('passwordReset.newPassword')}
                            onChange={handlePasswordChange}
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder={t('passwordReset.confirmPassword')}
                            required
                        />
                        <button className='submit-button' type="submit">{t('passwordReset.validate')}</button>
                        {message && <p className='error-message'>{message}</p>}
                    </form>

                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default PasswordReset
