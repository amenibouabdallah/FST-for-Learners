import React from 'react';
import { useMenu } from '../../shared/MenuContext';
import NavigationMenu from '../../shared/Navbar/Navbar';
import { useTranslation } from 'react-i18next'; // Ajout de l'import pour utiliser la traduction
import './Resto-tab.css';
import '../Mobile-viewer-style.css';
function UserMealTable() {
    const { menuData } = useMenu();
    const { t } = useTranslation(); // Utilisation du hook useTranslation pour accéder aux traductions

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='tab users-tab-wrapper1'>
                <table className='meal-tab viewers-meal-tab'>
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
                            <td>{menuData && menuData.lundiDejeuner}</td>
                            <td>{menuData && menuData.mardiDejeuner}</td>
                            <td>{menuData && menuData.mercrediDejeuner}</td>
                            <td>{menuData && menuData.jeudiDejeuner}</td>
                            <td>{menuData && menuData.vendrediDejeuner}</td>
                            <td>{menuData && menuData.samediDejeuner}</td>
                            <td>{menuData && menuData.dimancheDejeuner}</td>
                        </tr>
                        <tr>
                            <td className='semi-thead'>{t('restoTab.dinner')}</td>
                            <td>{menuData && menuData.lundiDiner}</td>
                            <td>{menuData && menuData.mardiDiner}</td>
                            <td>{menuData && menuData.mercrediDiner}</td>
                            <td>{menuData && menuData.jeudiDiner}</td>
                            <td>{menuData && menuData.vendrediDiner}</td>
                            <td>{menuData && menuData.samediDiner}</td>
                            <td>{menuData && menuData.dimancheDiner}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserMealTable;
