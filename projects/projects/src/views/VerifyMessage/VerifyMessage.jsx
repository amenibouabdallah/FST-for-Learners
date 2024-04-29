import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import { useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';



function VerifyMessage() {
    const { t } = useTranslation();
    const navigate = useNavigate();


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);


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
                <h1 className='title verify-message'>{t('verifyMessage.accountCreated')}</h1>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default VerifyMessage;
