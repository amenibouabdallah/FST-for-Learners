import React, { useState, useEffect } from 'react';
import './Resto-tab.css';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';
import { useMenu } from '../../shared/MenuContext';
import { useTranslation } from 'react-i18next'; // Ajout de l'import pour utiliser la traduction

const MealTable = () => {
    const { t } = useTranslation(); // Utilisation du hook useTranslation pour accéder aux traductions
    const { menuData, updateMenuData } = useMenu();

    const [lundiDejeuner, setLundiDejeuner] = useState('');
    const [mardiDejeuner, setMardiDejeuner] = useState('');
    const [mercrediDejeuner, setMercrediDejeuner] = useState('');
    const [jeudiDejeuner, setJeudiDejeuner] = useState('');
    const [vendrediDejeuner, setVendrediDejeuner] = useState('');
    const [samediDejeuner, setSamediDejeuner] = useState('');
    const [dimancheDejeuner, setDimancheDejeuner] = useState('');

    const [lundiDiner, setLundiDiner] = useState('');
    const [mardiDiner, setMardiDiner] = useState('');
    const [mercrediDiner, setMercrediDiner] = useState('');
    const [jeudiDiner, setJeudiDiner] = useState('');
    const [vendrediDiner, setVendrediDiner] = useState('');
    const [samediDiner, setSamediDiner] = useState('');
    const [dimancheDiner, setDimancheDiner] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Charger les données des textarea à partir de localStorage lors du chargement de la page
        const savedData = JSON.parse(localStorage.getItem('mealData')) || {};
        setLundiDejeuner(savedData.lundiDejeuner || '');
        setMardiDejeuner(savedData.mardiDejeuner || '');
        setMercrediDejeuner(savedData.mercrediDejeuner || '');
        setJeudiDejeuner(savedData.jeudiDejeuner || '');
        setVendrediDejeuner(savedData.vendrediDejeuner || '');
        setSamediDejeuner(savedData.samediDejeuner || '');
        setDimancheDejeuner(savedData.dimancheDejeuner || '');
        setLundiDiner(savedData.lundiDiner || '');
        setMardiDiner(savedData.mardiDiner || '');
        setMercrediDiner(savedData.mercrediDiner || '');
        setJeudiDiner(savedData.jeudiDiner || '');
        setVendrediDiner(savedData.vendrediDiner || '');
        setSamediDiner(savedData.samediDiner || '');
        setDimancheDiner(savedData.dimancheDiner || '');
    }, []);

    const data = {
        lundiDejeuner,
        mardiDejeuner,
        mercrediDejeuner,
        jeudiDejeuner,
        vendrediDejeuner,
        samediDejeuner,
        dimancheDejeuner,
        lundiDiner,
        mardiDiner,
        mercrediDiner,
        jeudiDiner,
        vendrediDiner,
        samediDiner,
        dimancheDiner,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (isFormValid()) {
            updateMenuData(data); // Update menu data in context
            // Sauvegarder les données dans localStorage
            localStorage.setItem('mealData', JSON.stringify(data));
        } else {
            setShowAlert(true);
        }
    };

    const isFormValid = () => {
        const requiredFields = [
            lundiDejeuner, mardiDejeuner, mercrediDejeuner, jeudiDejeuner, vendrediDejeuner, samediDejeuner, dimancheDejeuner,
            lundiDiner, mardiDiner, mercrediDiner, jeudiDiner, vendrediDiner, samediDiner, dimancheDiner,
        ];
        return requiredFields.every(field => field.trim() !== '');
    };

    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='admin-head'>
                    <div className='title1'>
                        <h2>{t('restoTab.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                <div className='cont-resto tab-scroll'>
                    <form className='users-tab-wrapper1' onSubmit={handleSubmit}>
                        <table className='meal-tab'>
                            <thead>
                                <tr>
                                    <th className='semi-thead'>{t('restoTab.meal')}</th>
                                    <th>{t('restoTab.monday')}</th>
                                    <th>{t('restoTab.tuesday')}</th>
                                    <th>{t('restoTab.wednesday')}</th>
                                    <th>{t('restoTab.thursday')}</th>
                                    <th>{t('restoTab.friday')}</th>
                                    <th>{t('restoTab.saturday')}</th>
                                    <th>{t('restoTab.sunday')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='semi-thead'>{t('restoTab.lunch')}</td>
                                    <td><textarea value={lundiDejeuner} onChange={(e) => setLundiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={mardiDejeuner} onChange={(e) => setMardiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={mercrediDejeuner} onChange={(e) => setMercrediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={jeudiDejeuner} onChange={(e) => setJeudiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={vendrediDejeuner} onChange={(e) => setVendrediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={samediDejeuner} onChange={(e) => setSamediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={dimancheDejeuner} onChange={(e) => setDimancheDejeuner(e.target.value)} required /></td>
                                </tr>
                                <tr>
                                    <td className='semi-thead'>{t('restoTab.dinner')}</td>
                                    <td><textarea value={lundiDiner} onChange={(e) => setLundiDiner(e.target.value)} required /></td>
                                    <td><textarea value={mardiDiner} onChange={(e) => setMardiDiner(e.target.value)} required /></td>
                                    <td><textarea value={mercrediDiner} onChange={(e) => setMercrediDiner(e.target.value)} required /></td>
                                    <td><textarea value={jeudiDiner} onChange={(e) => setJeudiDiner(e.target.value)} required /></td>
                                    <td><textarea value={vendrediDiner} onChange={(e) => setVendrediDiner(e.target.value)} required /></td>
                                    <td><textarea value={samediDiner} onChange={(e) => setSamediDiner(e.target.value)} required /></td>
                                    <td><textarea value={dimancheDiner} onChange={(e) => setDimancheDiner(e.target.value)} required /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="alert alert-danger" role="alert" style={{ display: isSubmitted && !isFormValid() ? 'block' : 'none' }}>
                            {t('form.errorMessage')}
                        </div>
                        <div className='sub-button'>
                            <button type="submit" className="submit">
                                {t('form.submitButton')}
                            </button>
                            <div className='other'></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};


export default MealTable;
