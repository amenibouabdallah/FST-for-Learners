import React from 'react';
import logo from '../../assets/images/logo.png'
import Menu from '../../assets/images/Menu.png'
import Transport from '../../assets/images/Transport.png'
import Users from '../../assets/images/Users.png'
import Upload from '../../assets/images/Upload.png'
import Documents from '../../assets/images/Documents.png'
import adminprofile from '../../assets/images/admin-profile.png'
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Supprimer les informations d'authentification de l'utilisateur
        // Par exemple, en supprimant le token d'authentification du localStorage
        localStorage.removeItem('token');

        // Rediriger l'utilisateur vers la page de connexion
        navigate('/');
    };

    return (
        <div className='Sidebar'>
            <div className='nav-item'>
                <img className='white-logo' src={logo} alt="" />
            </div>
            <div className='nav-item'>
                <button className='gestion-btn' onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" class="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z" />
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                </svg></button>
            </div>
            <div className='nav-items'>
                <Link className='nav-item' to="/admin">

                    <img className='sidebar-icon' src={adminprofile} alt="" />

                    <p className='sidebar-item'>Profil</p>
                </Link>
                <Link className='nav-item' to="/admin/users">

                    <img className='sidebar-icon' src={Users} alt="" />

                    <p className='sidebar-item'>Utilisateurs</p>
                </Link>
                <Link className='nav-item' to="/admin/docs">

                    <img className='sidebar-icon' src={Documents} alt="" />

                    <p className='sidebar-item'>Documents</p>
                </Link>
                <Link className='nav-item' to="/admin/meals">

                    <img className='sidebar-icon' src={Menu} alt="" />

                    <p className='sidebar-item'>Menu</p>
                </Link>
                <Link className='nav-item' to="/admin/transport">

                    <img className='sidebar-icon' src={Transport} alt="" />

                    <p className='sidebar-item'>Transport</p>
                </Link>
                <Link className='nav-item' to="/admin/upload">

                    <img className='sidebar-icon' src={Upload} alt="" />

                    <p className='sidebar-item'>Dépôt fichiers</p>
                </Link>
            </div>
        </div>

    );

};
export default Sidebar