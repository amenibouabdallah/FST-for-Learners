import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode'; // Import the named export
import logo from '../../assets/images/noBg-logo.png';
import profile from '../../assets/images/profile.png';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import './Navbar.css';
import axios from 'axios'
const NavigationMenu = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [user, setUser]= useState('');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        
        // Check if the token exists
        if (token) {
            // Decode the token to get the user's role
            const decodedToken = jwtDecode(token);
            const role = decodedToken.userType; 
            console.log("Decoded token:", decodedToken);
        console.log("User role:", role);            
            // Set the user role
            setUserRole(role);
        }
    }, []);
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
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className='navig-menu'>
            <div className="logo-cont">
                <img className='nav-logo' src={logo} alt="Logo" />
            </div>
            <div className='navs'>
                <NavLink className='nav' exact to="/docs" activeClassName="active">{t('navigationMenu.documents')}</NavLink>
                <NavLink className='nav' to="/meals" activeClassName="active">{t('navigationMenu.menu')}</NavLink>
                <NavLink className='nav' to="/transport" activeClassName="active">{t('navigationMenu.transport')}</NavLink>
                {userRole === "teacher" && (
                    <NavLink className='nav' to="/upload" activeClassName="active">{t('navigationMenu.uploadDocument')}</NavLink>
                )}
            </div>
            <div>
                <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>

            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <NavLink className='nav' exact to="/docs" activeClassName="active">{t('navigationMenu.documents')}</NavLink>
                <NavLink className='nav' to="/meals" activeClassName="active">{t('navigationMenu.menu')}</NavLink>
                <NavLink className='nav' to="/transport" activeClassName="active">{t('navigationMenu.transport')}</NavLink>
                {userRole === "teacher" && (
                    <NavLink className='nav' to="/upload" activeClassName="active">{t('navigationMenu.uploadDocument')}</NavLink>
                )}
                <div className="profile-lang">
                    <NavLink className='profile' to="/profile">
                        <img className='prof-img' src={user.profileImage} alt="Profile" />
                    </NavLink>
                    <div className="logout">
                        <button className='gestion-btn' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFDA6F" className="bi bi-power" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1z" />
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile-lang">
                <div className='lang lang-nav'>
                    <LanguageDropdown className="lang-bg-gris" />
                </div>
            </div>
            <div className="profile-lang log-mobile">
                <NavLink className='profile' to="/profile">
                    <img className='prof-img' src={user.profileImage} alt="Profile" />
                </NavLink>
                <div className="logout log-mobile">
                    <button className='gestion-btn' onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFDA6F" className="bi bi-power" viewBox="0 0 16 16">
                            <path d="M7.5 1v7h1V1z" />
                            <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationMenu;
