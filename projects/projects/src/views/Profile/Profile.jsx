import React, { useState, useEffect } from 'react';
import profile from '../../assets/images/profile.png';
import { useTranslation } from 'react-i18next';
import './Profile.css';
import NavigationMenu from '../../shared/Navbar/Navbar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [profileImage, setProfileImage] = useState(null); // Updated
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const _id = decodedToken.userId;
                    
                    // Fetch user data
                    const response = await axios.post('http://localhost:3000/user/get-email', { _id });
                    
                    // Update user state with response data
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.warn('No token found in localStorage');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFullName(user.fullName);
            setProfilePicture(user.profileImage);
            setPassword('*****'); // Hide password
        }
    }, [user]);

    // Handle input changes
    const handleFullNameChange = (e) => {
        setNewFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(URL.createObjectURL(file));
        setProfileImage(file);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a FormData object for file upload and other data
            const formData = new FormData();
            formData.append('email', email);
            formData.append('newFullName', newFullName);
            formData.append('newEmail', newEmail);
            formData.append('newPassword', newPassword);
            formData.append('confirmPassword', confirmPassword);
            formData.append('profileImage', profileImage);

            // Send the form data to the server
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/user/change-name-or-email-or-pass-or-image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);
            console.log('Profile updated successfully.');

            // Update the user data in state
            setFullName(newFullName || user.fullName);
            setEmail(newEmail || user.email);
            setPassword(newPassword || user.password);

            // Clear input fields
            setNewFullName('');
            setNewEmail('');
            setNewPassword('');
            setConfirmPassword('');
            setShowMessage(true);

            // Re-fetch the user data to keep the state in sync with the backend
            const updatedResponse = await axios.post('http://localhost:3000/user/get-email', { _id: user._id });
            setUser(updatedResponse.data.user);

        } catch (error) {
            console.error('Error updating user profile:', error);
            // Optionally display an error message to the user
            setShowAlert(true);

        }
    };

    return (
        <div className='usermenu'>
            <NavigationMenu />
            <div className='tab'>
                <div className='profile-page'>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex flex-column'>
                            <div className='profile-forms'>
                                <div className='profile-img-btn'>
                                    {profilePicture && (
                                        <img src={profilePicture} alt='Profile' className='profile-picture' />
                                    )}
                                    <label htmlFor='fileInput' className='custom-file-upload'>
                                        {t('profile.changeProfilePicture')}
                                    </label>
                                    <input
                                        id='fileInput'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleProfilePictureChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className='profile-form'>
                                    <label className='prof-label'>
                                        <div className='prof-element'>
                                            <div className='profile-label'>
                                                {t('profile.fullName')}:
                                            </div>
                                            <div>
                                                <p className='current'>{fullName}</p>
                                                <p className='new-label'>{t('profile.newFullName')}:</p>
                                                <input
                                                    className='profile-input'
                                                    type='text'
                                                    value={newFullName}
                                                    onChange={handleFullNameChange}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                    <br />
                                    <label className='prof-label'>
                                        <div className='prof-element'>
                                            <div className='profile-label'>
                                                {t('profile.email')}:
                                            </div>
                                            <div>
                                                <p className='current'>{email}</p>
                                                <p className='new-label'>{t('profile.newEmail')}:</p>
                                                <input
                                                    className='profile-input'
                                                    type='email'
                                                    value={newEmail}
                                                    onChange={handleEmailChange}
                                                />
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
                                                <p className='current'>{password}</p>
                                                <p className='new-label'>{t('profile.newPassword')}:</p>
                                                <input
                                                    className='profile-input'
                                                    type='password'
                                                    value={newPassword}
                                                    onChange={handlePasswordChange}
                                                />
                                                <p className='new-label'>{t('profile.confirmPassword')}:</p>
                                                <input
                                                    className='profile-input'
                                                    type='password'
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange}
                                                />
                                            </div>
                                        </div>
                                    </label>
                                    <br />
                                </div>
                            </div>
                            <div className='profile-btns'>
                                <button
                                    className='reset-btn'
                                    type='button'
                                    onClick={() => {
                                        setNewFullName('');
                                        setNewEmail('');
                                        setNewPassword('');
                                        setConfirmPassword('');
                                    }}
                                >
                                    {t('profile.cancel')}
                                </button>
                                <button className='save-btn' type='submit'>
                                    {t('profile.save')}
                                </button>
                            </div>
                        </div>
                    </form>
                    {showAlert && <p className='error-message'>{t('profile.error')}</p>}
                    {showMessage && <p className='true-message'>{t('profile.msg')}</p>}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
