import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import du hook useTranslation pour accéder aux traductions
import './Transport-tab.css';
import NavigationMenu from '../../shared/Navbar/Navbar';

function TransportTableUser() {
    const { t } = useTranslation(); // Utilisation du hook useTranslation pour accéder aux traductions

    const [data, setData] = useState(JSON.parse(localStorage.getItem('transportData')) || [{ id: 1, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: false }]);

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='tab users-tab-wrapper1'>
                <table className="table1">
                    {/* Table header */}
                    <thead>
                        {/* Table header rows */}
                        <tr>
                            {/* Table header cells */}
                            <th rowSpan="2">{t('transportTable.line')}</th>
                            <th rowSpan="2">{t('transportTable.destination')}</th>
                            <th colSpan="2">{t('transportTable.firstDeparture')}</th>
                            <th colSpan="2">{t('transportTable.lastDeparture')}</th>
                            <th rowSpan="2">{t('transportTable.frequency')}</th>
                        </tr>
                        <tr>
                            <th>{t('transportTable.toStation')}</th>
                            <th>{t('transportTable.toSuburb')}</th>
                            <th>{t('transportTable.toStation')}</th>
                            <th>{t('transportTable.toSuburb')}</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {/* Table rows */}
                        {data.map(item => (
                            <tr key={item.id}>
                                {/* Table cells */}
                                <td>{item.ligne}</td>
                                <td>{item.destination}</td>
                                <td>{item.premierDepartStation}</td>
                                <td>{item.premierDepartBanlieue}</td>
                                <td>{item.dernierDepartStation}</td>
                                <td>{item.dernierDepartBanlieue}</td>
                                <td>{item.frequence}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default TransportTableUser;
