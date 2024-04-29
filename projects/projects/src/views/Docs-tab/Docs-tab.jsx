import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavigationMenu from '../../shared/Navbar/Navbar';
import dateUp from '../../assets/images/calendar-up.png';
import dateDown from '../../assets/images/calendar-down.png';
import axios from 'axios';
import './Docs-tab.css'
import './Docs-tab.css';
import '../../Admin/Mobile-admin-style.css';
const DocsUserTable = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isStatusFiltered, setIsStatusFiltered] = useState(false);
    const [docData, setDocData]=useState([]);
   const downloadDocument = async (docId) => {
    if (!docId) {
        console.error('Document ID is undefined');
        return;
    }

    try {
        // Send a POST request with the docId in the request body
        const response = await axios.post(
            'http://localhost:3000/user/download-file',
            { docId },
            {
                // Specify the response type as 'blob' to handle the file download
                responseType: 'blob',
            }
        );

        // Create a blob URL for the file
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));

        // Create an anchor element to trigger the download
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', `document_${docId}.pdf`); // Set the file name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        link.remove(); // Clean up the link element

        console.log(`Successfully downloaded document with id ${docId}`);
    } catch (error) {
        console.error(`Error downloading document with id ${docId}:`, error);
    }
};

    
    useEffect(()=>{
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
                const response = await fetch('http://localhost:3000/user/get-docs', requestOptions); 
                const data = await response.json();
                setDocData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    },[]);

    const filteredData = docData.filter((doc) => {
        // Use optional chaining and nullish coalescing operators to safely handle undefined properties
        const nameMatch = (doc.name?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());
        const submittedByMatch = (doc.submittedBy?.toLowerCase() ?? '').includes(searchTerm.toLowerCase());
    
        // Check if the document matches the filter criteria
        if (filterStatus !== 'All' && doc.status !== filterStatus) {
            return false;
        }
        if (filterType !== 'All' && doc.docType !== filterType) {
            return false;
        }
        if (searchTerm && !(nameMatch || submittedByMatch)) {
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
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='doc-user-tab'>
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
                        <span className='nb-total'>{t('docsTab.totalDocuments', { count: sortedData.length })}</span>
                    </div>
                </div>
                {/* Filters */}
                <div className='filters'>
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

                    <button className='filter date-filter' onClick={() => handleSort('selectedDate')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    <button className='filter date-filter' onClick={() => handleSort('uploadedAt')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    </div>
                    <div className='filters2'>
                    <select className='filter select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">{t('docsTab.filters.allStatus')}</option>
                        <option value="accepted">{t('docsTab.filters.approved')}</option>
                    </select>
                    <select className='filter select-filter' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">{t('docsTab.filters.allTypes')}</option>
                        <option value="cours">{t('docsTab.filters.cours')}</option>
                        <option value="tp">{t('docsTab.filters.tp')}</option>
                        <option value="td">{t('docsTab.filters.td')}</option>
                        <option value="exam">{t('docsTab.filters.exam')}</option>
                        <option value="gradeReport">{t('docsTab.filters.gradeReport')}</option>
                        <option value="schedule">{t('docsTab.filters.schedule')}</option>
                        <option value="announcement">{t('docsTab.filters.announcement')}</option>
                    </select>
</div>
                </div>
                {/* Table */}
                <div className='d-flex flex-column users-tab-wrapper'>
                    <table className='users-tab'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{t('docsTab.documentName')}</th>
                                <th>{t('docsTab.creationDate')}</th>
                                <th>{t('docsTab.submissionDate')}</th>
                                <th>{t('docsTab.documentStatus')}</th>
                                <th>{t('docsTab.documentType')}</th>
                                <th>{t('docsTab.submittedBy')}</th>
                                <th>{t('docsTab.download')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((doc) => (
                                <tr key={doc._id} >
                                    <td ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFDA6F" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                    </svg></td>
                                    <td >{doc.fullName}</td>
                                    <td >{doc.selectedDate}</td>
                                    <td >{doc.uploadedAt}</td>
                                    <td >{doc.status}</td>
                                    <td >{doc.docType}</td>
                                    <td >{doc.submittedBy}</td>
                                    <td>
                                        <button className='gestion-btn' onClick={() => downloadDocument(doc._id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2D60B1" class="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg></button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default DocsUserTable;

