import React, { useState, useEffect } from 'react';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../shared/Sidebar/Sidebar';
import trash from '../../assets/images/trash.png';
import refuse from '../../assets/images/Refuser.png';
import approuver from '../../assets/images/Approuver.png';
import dateUp from '../../assets/images/calendar-up.png';
import dateDown from '../../assets/images/calendar-down.png';
import approve from '../../assets/images/approve.png';
import supprimer from '../../assets/images/supprimer.png';
import reject from '../../assets/images/reject.png';
import './Users-tab.css';
import '../Mobile-admin-style.css';
import axios from 'axios';
const UsersTable = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isStatusFiltered, setIsStatusFiltered] = useState(false);
    const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
    const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [userIdToConfirm, setUserIdToConfirm] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState([]); // State to hold the fetched user data

    // Fetch user data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
 
                    }),
                };
                const response = await fetch('http://localhost:3000/admin/get-users', requestOptions); 
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleActionConfirmation = (action, id) => {
        if (action === 'accept') {
            setShowAcceptConfirmation(true);
        } else if (action === 'reject') {
            setShowRejectConfirmation(true);
        } else if (action === 'delete') {
            setShowDeleteConfirmation(true);
        }
        setUserIdToConfirm(id);
    };
    
    const handleRowClick = (userId) => {
        setSelectedUserId(userId);
        setShowPopup(true);
    };

    const handleConfirmAction = async(action) => {
        // Implement logic based on the action
      const  responseConfirmation = await axios.post('http://localhost:3000/admin/handle-confirm-action',{action, userIdToConfirm});
      console.log(responseConfirmation.data);
        hideAllConfirmations();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

            }),
        };
        const updatedResponse = await fetch('http://localhost:3000/admin/get-users', requestOptions); 
        const dataa = await updatedResponse.json();
        setUserData(dataa);
    };

    const hideAllConfirmations = () => {
        setShowAcceptConfirmation(false);
        setShowRejectConfirmation(false);
        setShowDeleteConfirmation(false);
        setUserIdToConfirm(null);
    };

    const handleCancelAction = () => {
        hideAllConfirmations();
    };

    const filteredData = userData.filter((user) => {
        if (filterStatus !== 'All' && user.status !== filterStatus) {
            return false;
        }
        if (filterType !== 'All' && user.userType !== filterType) {
            return false;
        }
        if (searchTerm && !user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortColumn) {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];
            
            // Handle string comparison
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            // Compare the values
            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            
            // Return 0 if values are equal
            return 0;
        }
        // No sort column specified, return 0
        return 0;
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setIsNameSorted((prevState) => !prevState);
        setIsStatusFiltered((prevState) => !prevState);
    };
    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='admin-head'>
                    <div className='title1'>
                        <h2>{t('usersTab.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                {/* Search and Total Users */}
                <div className='recherche-nb'>
                    <div className='recherche-wrapper'>
                        <input
                            className='recherche'
                            type="text"
                            placeholder={t('docsTab.searchBarPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icone-recherche" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>

                    <div>
                        <span className='nb-total'>{t('usersTab.totalUsersCount', { count: sortedData.length })}</span>

                    </div>
                </div>
                {/* Filters */}
                <div className='filtres filters'>
                <div className='filters1'>
                    <button className='filter name-filter' onClick={() => handleSort('fullName')}>
                        {isNameSorted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                                <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z" />
                                <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z" />
                                <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z" />
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                            </svg>

                        )}
                    </button>


                    <button className='filter date-filter' onClick={() => handleSort('dateCreated')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    </div>
                    <div className='filters2'>
                    <select className='filter select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">{t('usersTab.filters.allStatus')}</option>
                        <option value="pending">{t('usersTab.filters.pending')}</option>
                        <option value="active">{t('usersTab.filters.active')}</option>
                    </select>
                    <select className='filter select-filter' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="All">{t('usersTab.filters.allTypes')}</option>
                        <option value="student">{t('usersTab.filters.student')}</option>
                        <option value="teacher">{t('usersTab.filters.teacher')}</option>
                    </select>
                    </div>
                </div>
                {/* Table */}
                <div className='d-flex flex-column users-tab-wrapper'>
                    <table className='users-tab'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{t('usersTab.headers.name')}</th>
                                <th>{t('usersTab.headers.accountStatus')}</th>
                                <th>{t('usersTab.headers.userType')}</th>
                                <th>{t('usersTab.headers.lastVisit')}</th>
                                <th>{t('usersTab.headers.manageUser')}</th>
                            </tr>
                        </thead>
                        <tbody>
    {sortedData.map((user) => (
        <tr key={user.id}> 
            <td onClick={() => handleRowClick(user.id)}>
                <img className="prof-img-tab" src={user.profileImage} alt="Profile" />
            </td>
            <td onClick={() => handleRowClick(user.id)}>{user.fullName}</td>
            <td onClick={() => handleRowClick(user.id)}>{user.status}</td>
            <td onClick={() => handleRowClick(user.id)}>{user.userType}</td>
            <td onClick={() => handleRowClick(user.id)}>{user.dateCreated}</td>
            <td>
                {user.status === 'pending' && (
                    <>
                        <button
                            className="gestion-btn"
                            onClick={() => handleActionConfirmation('accept', user.id)}
                        >
                            <img className="gestion-icon" src={approuver} alt="Accept" />
                        </button>
                        <button
                            className="gestion-btn"
                            onClick={() => handleActionConfirmation('reject', user.id)}
                        >
                            <img className="gestion-icon" src={refuse} alt="Reject" />
                        </button>
                    </>
                )}
                {
                    user.status==='active'&&(
                        <button
                        className="gestion-btn"
                        onClick={() => handleActionConfirmation('delete', user.id)}
                    >
                        <img className="gestion-icon" src={trash} alt="Delete" />
                    </button>
                    )
                }
               
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                    {showAcceptConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('usersTab.popups.acceptMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={approve} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('accept')}>{t('usersTab.popups.acceptBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showRejectConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('usersTab.popups.rejectMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={reject} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('reject')}>{t('usersTab.popups.rejectBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showDeleteConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('usersTab.popups.deleteMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={supprimer} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('delete')}>{t('usersTab.popups.deleteBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showPopup && (
                        <div className="dark-overlay">
                            <div className='confirmation-popup1'>
                                {selectedUserId && (
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-end mb-3'>
                                            <button className='gestion-btn' onClick={() => setShowPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg></button>
                                        </div>
                                        <div className='d-flex justify-content-around mb-5'>
                                            <div className='pop-img'>
                                                <img className='pop-prof-img' src={userData[selectedUserId - 1].profileImage} alt="Profile" />
                                            </div>
                                            <div className='pop-up-right'>
                                                <p className='pop-nom'>{userData[selectedUserId - 1].fullName}</p>
                                                <p className='pop-type'>{userData[selectedUserId - 1].userType}</p>
                                            </div>
                                        </div>
                                        <div className='mb-5'>
                                            <p className='details'>{t('usersTab.popups.details')}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.id')}:</span>{userData[selectedUserId - 1].id}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.email')} :</span>{userData[selectedUserId - 1].email}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.department')} :</span>{userData[selectedUserId - 1].department}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default UsersTable;
