import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import './lang-dropdown.css';

function LanguageDropdown({ className }) {
    const { t, i18n } = useTranslation(); // Use useTranslation hook

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang); // Change the language
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" className={`m-3 d-flex align-items-center justify-content-center ${className}`}>
                {i18n.language === 'fr' ? (
                    <>
                        <span>{t('lang.french')}</span>
                    </>
                ) : (
                    <>
                        <span>{t('lang.english')}</span>
                    </>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLanguageChange('fr')}>
                    <span>{t('lang.french')}</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLanguageChange('en')}>
                    <span>{t('lang.english')}</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LanguageDropdown;