import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import logo from '../../assets/images/noBg-logo.png';
import campus from '../../assets/images/Campus.jpg';
import '../SignIn-SignUp.css';
import axios from 'axios';


function SignUp() {
    const { t } = useTranslation();
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [department, setDepartment] = useState('');
    const [a, b] = useState([{}]);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if email format is correct (you can use a regex for this)
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            try {
                const response = await axios.post('http://localhost:3000/auth/signup', { email, password, userType, department });
                console.log('Response:', response.data);
                localStorage.setItem('email', email);
                // Navigate to the '/register/account' route only after successful signup
                navigate('/register/account');

            } catch (error) {
                console.error('Error signing up:', error.response.data.message);
                setShowAlert(true);
                // Handle errors, e.g., display an error message to the user
            }
        } else {
            // Handle incorrect email format (e.g., display an error message)
            console.log('Email format is incorrect');
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
                <h1 className='title'>{t('signUp.welcome')}</h1>
                <div>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t('signUp.emailPlaceholder')}
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder={t('signUp.passwordPlaceholder')}
                            required
                        />
                        <select className='login-input form-select' value={userType} onChange={handleUserTypeChange} required>
                            <option value="" disabled>{t('signUp.userType')}</option>
                            <option value="student">{t('signUp.student')}</option>
                            <option value="teacher">{t('signUp.teacher')}</option>
                        </select>
                        <select className='login-input form-select' value={department} onChange={handleDepartmentChange} required>
                            <option value="" disabled>{t('signUp.department')}</option>
                            <option value="MATHEMATIQUE">{t('signUp.math')}</option>
                            <option value="INFORMATIQUE">{t('signUp.info')}</option>
                            <option value="PHYSIQUE">{t('signUp.phy')}</option>
                            <option value="CHIMIE">{t('signUp.ch')}</option>
                            <option value="BIOLOGIE">{t('signUp.bio')}</option>
                            <option value="GEOLOGIE">{t('signUp.gio')}</option>

                            
                        </select>
                        <button className='submit-button' type="submit">{t('signUp.signUpButton')}</button>
                    </form>
                    {showAlert && <p className='error-message'>{t('signUp.error')}</p>}
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default SignUp;
