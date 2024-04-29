import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode'; // Import the named export
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';
import axios from 'axios';
const AdminProfile = () => {

    /*fetching the user by token*/

   
    const { t } = useTranslation();
    const [user, setUser] = useState(null); // Initialize user state as null
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const _id = decodedToken.userId;

                    // Make the POST request with the email
                    const response = await axios.post('http://localhost:3000/admin/get-email', { _id: _id});

                    // Update the user state with the response data
                    console.log(response.data);
                    setUser(response.data);
                    
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    // Consider displaying an error message to the user
                }
            } else {
                console.warn('No token found in localStorage');
                // Consider handling the case where no token is available
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            setEmail(user.user.email);
            setPassword('*****');
            
        }
    }, [user]);
    
    


    

    // Fonctions de gestion des changements des champs
    

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/change-pass-or-email', {
                email,
                newEmail,
                newPassword,
                confirmPassword,
            });
    
            console.log('Form submitted!');
    
            setEmail(  newEmail || user.email);
            setPassword(newPassword || user.password);


            setNewEmail('');
            setNewPassword('');
            setConfirmPassword('');
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const _id = decodedToken.userId;
            const updatedResponse = await axios.post('http://localhost:3000/admin/get-email', { _id: user._id});
            setUser(updatedResponse.data.user);
            setShowMessage(true);
        } catch (error) {
            console.error('An error occurred:', error);
            setShowAlert(true);
        }
    };



    

    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='admin-head'>
                    <div className='title1'>
                        <h2>{t('profile.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='profile-page'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex flex-column'>
                                <div className='profile-forms'>
                                    <div className='profile-form'>
                                        <label className='prof-label'>
                                            <div className='prof-element'>
                                                <div className='profile-label'>
                                                    {t('profile.email')}:
                                                </div>
                                                <div>
                                                    <p className='current'>{email}</p>
                                                    <p className='new-label'>{t('profile.newEmail')}:</p>
                                                    <input className='profile-input' type="email" value={newEmail} onChange={handleEmailChange} />
                                                </div>
                                            </div>
                                        </label>
                                        <br />
                                        <label className='prof-label'>
                                            <div className='prof-element'>
                                                <div className='profile-label'>
                                                    {t('profile.password')}:
                                                </div>
                                                <div>
                                                    <p className='current'>{"*****"}</p>
                                                    <p className='new-label'>{t('profile.newPassword')}:</p>
                                                    <input className='profile-input' type="password" value={newPassword} onChange={handlePasswordChange} />
                                                    <p className='new-label'> {t('profile.confirmPassword')}:</p>
                                                    <input className='profile-input' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                                </div>
                                            </div>
                                        </label>
                                        <br />
                                    </div>
                                </div>
                                <div className='profile-btns1'>
                                    <button className='reset-btn1' type="button" onClick={() => {
                                        setNewEmail('');
                                        setNewPassword('');
                                        setConfirmPassword('');
                                    }}>{t('profile.cancel')}</button>
                                    <button className='save-btn1' type="submit">{t('profile.save')}</button>
                                </div>
                            </div>

                        </form>
                        {showAlert && <p className='error-message'>{t('profile.error')}</p>}
                        {showMessage && <p className='true-message'>{t('profile.msg')}</p>}
                    </div>
                </div>
            </div>
        </div>
    );

};


export default AdminProfile;
