import React, { useState, useEffect } from 'react';
import './Transport-tab.css';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';
import plus from '../../assets/images/plus.png';
import trash from '../../assets/images/trash.png';
import { useTransportContext } from '../../shared/TransportContext'; // Import du contexte
import { useTranslation } from 'react-i18next'; // Import du hook de traduction

function TransportTable() {
    const { t } = useTranslation(); // Hook de traduction
    const { transports, addTransport, removeTransport } = useTransportContext(); // Utilisation du contexte

    const [data, setData] = useState(JSON.parse(localStorage.getItem('transportData')) || [{ id: 1, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: false }]);
    const [nextId, setNextId] = useState(2);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        localStorage.setItem('transportData', JSON.stringify(data));
    }, [data]);

    const handleInputChange = (e, id, key) => {
        const newData = data.map(item => {
            if (item.id === id) {
                return { ...item, [key]: e.target.value, isDirty: true };
            }
            return item;
        });
        setData(newData);
    };

    const handleAddRow = () => {
        const newId = nextId;
        setNextId(nextId + 1);
        setData([...data, { id: newId, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: true }]);
    };

    const handleRemoveRow = (id) => {
        if (id === 1 || data.find(item => item.id === id && !Object.values(item).some(value => value !== ''))) {
            const newData = data.map(item => {
                if (item.id === id) {
                    return { ...item, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: false };
                }
                return item;
            });
            setData(newData);
        } else {
            setData(data.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (isFormValid()) {
            // Envoyer les données modifiées à l'interface suivante
        } else {
            setShowAlert(true);
        }
    };

    const isFormValid = () => {
        const isValid = data.every(item => {
            const valid = Object.values(item).every(value => {
                if (typeof value === 'string') {
                    const isNotEmpty = value.trim() !== '';
                    console.log(`Value: "${value}", isNotEmpty: ${isNotEmpty}`);
                    return isNotEmpty;
                }
                return true; // Si ce n'est pas une chaîne, considérez-la comme valide
            });
            console.log('Item valid:', valid);
            return valid;
        });
        console.log('Form valid:', isValid);
        return isValid;
    };

    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='admin-head'>
                    <div className='title1'>
                        <h2>{t('transportTable.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>

                </div>
                <div className='cont-resto'>
                    <form className='users-tab-wrapper1 trans-form' onSubmit={handleSubmit}>
                        <table className="table2">
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
                                    <th rowSpan="2"></th>
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
                                        <td><input className='trans-input' value={item.ligne} onChange={(e) => handleInputChange(e, item.id, 'ligne')} required /></td>
                                        <td><input className='trans-input' value={item.destination} onChange={(e) => handleInputChange(e, item.id, 'destination')} required /></td>
                                        <td><input className='trans-input' value={item.premierDepartStation} onChange={(e) => handleInputChange(e, item.id, 'premierDepartStation')} required /></td>
                                        <td><input className='trans-input' value={item.premierDepartBanlieue} onChange={(e) => handleInputChange(e, item.id, 'premierDepartBanlieue')} required /></td>
                                        <td><input className='trans-input' value={item.dernierDepartStation} onChange={(e) => handleInputChange(e, item.id, 'dernierDepartStation')} required /></td>
                                        <td><input className='trans-input' value={item.dernierDepartBanlieue} onChange={(e) => handleInputChange(e, item.id, 'dernierDepartBanlieue')} required /></td>
                                        <td><input className='trans-input' value={item.frequence} onChange={(e) => handleInputChange(e, item.id, 'frequence')} required /></td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn ml-2" onClick={handleAddRow}><img className='plus-trash' src={plus} alt="" /></button>
                                                {item.isDirty && (
                                                    <button className="btn" onClick={() => handleRemoveRow(item.id)}><img className='plus-trash' src={trash} alt="" /></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="alert alert-danger" role="alert" style={{ display: isSubmitted && !isFormValid() ? 'block' : 'none' }}>
                            {t('form.errorMessage')}
                        </div>
                        <div className='sub-button'>
                            <button type="submit" className="submit">
                                {t('form.submitButton')}
                            </button>
                            <div></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TransportTable;
