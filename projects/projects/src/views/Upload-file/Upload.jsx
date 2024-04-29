// Composant UploadFileUser
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavigationMenu from '../../shared/Navbar/Navbar';
import upload from '../../assets/images/upload-img.png'
import './Upload.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import the named export

function UploadFileUser() {
    const { t } = useTranslation();

    const [fullName, setFullName] = useState('');
    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };

    const [DocDepose, setDocDepose] = useState(null);
    const [fileName, setFileName] = useState('');
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDocDepose(file);
        setFileName(file ? file.name : '');
    };

    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const [docType, setDocType] = useState('');
    const handleDocTypeChange = (event) => {
        setDocType(event.target.value);
    };
    

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!DocDepose) {
            console.log('Aucun fichier sélectionné.');
            return;
        }
        const token=localStorage.getItem('token');
        const decodedToken= jwtDecode(token);
        const uploadedBy= decodedToken.userId;
        
        const formData = new FormData();
    formData.append('file', DocDepose);
    formData.append('fullName', fullName);
    formData.append('docType', docType);
    formData.append('selectedDate', selectedDate);
    formData.append('uploadedBy', uploadedBy);

    try{
            const response = await axios.post('http://localhost:3000/user/upload', formData,{
                headers : {
                    'Contet-Type':'multipart/form-data'
                }
            });
            console.log(response);
        }catch(error){
            console.log(error);
    
        }
        // Votre logique de soumission du formulaire ici
        console.log('Formulaire soumis avec succès !');
        console.log('Nom du document:', fullName);
        console.log('Type de document:', docType);
        console.log('Date sélectionnée:', selectedDate);
        console.log('Fichier sélectionné:', DocDepose);
        console.log('Nom du fichier:', fileName);
    };

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='user-upload'>
                <div className='upload-img-cont'>
                    <img className='upload-img' src={upload} alt="" />
                </div>
                <div className='upload-form-cont'>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input upload'
                            type="text"
                            value={fullName}
                            onChange={handleNameChange}
                            placeholder={t('uploadFile.fullNamePlaceholder')}
                            required
                        />
                        <select className='login-input form-select upload' value={docType} onChange={handleDocTypeChange} required>
                            <option value="" disabled>{t('uploadFile.docTypePlaceholder')}</option>
                            <option value="td">{t('uploadFile.td')}</option>
                            <option value="tp">{t('uploadFile.tp')}</option>
                            <option value="cours">{t('uploadFile.cours')}</option>
                            <option value="exam">{t('uploadFile.exam')}</option>

                        </select>
                        <input
                            className='login-input upload cal'
                            type="date"
                            id="dateInput"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                        <label className="file-input">
                            <input
                                type="file"
                                id="DocDepose"
                                name="DocDepose"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                                required
                            />

                            <span className="file-input-label upload"> <p className='upload-text'>{fileName ? `${t('uploadFile.fileName')}: ${fileName}` : t('uploadFile.uploadText')}</p> <br /> <svg id="Group_8205" data-name="Group 8205" xmlns="http://www.w3.org/2000/svg" width="55.284" height="48.954" viewBox="0 0 55.284 48.954">
                                <g id="Group_8204" data-name="Group 8204">
                                    <g id="Group_8203" data-name="Group 8203">
                                        <circle id="Ellipse_18" data-name="Ellipse 18" cx="3.798" cy="3.798" r="3.798" transform="translate(17.039 12.08)" fill="#000" opacity="0.5" />
                                        <path id="Path_10237" data-name="Path 10237" d="M453.412,736.34a11.7,11.7,0,0,0-6.541-3.112V713.921a7.6,7.6,0,0,0-2.163-5.275,7.371,7.371,0,0,0-5.275-2.163h-30.6a7.6,7.6,0,0,0-5.275,2.163,7.371,7.371,0,0,0-2.163,5.275v31.493a7.6,7.6,0,0,0,2.163,5.275,7.37,7.37,0,0,0,5.275,2.163h29.594a11.161,11.161,0,0,0,14.982-16.511Zm-49.217-22.419a4.416,4.416,0,0,1,1.371-3.218,4.629,4.629,0,0,1,3.271-1.372h30.6a4.683,4.683,0,0,1,4.642,4.642v16.458l-7.807-7.807a1.416,1.416,0,0,0-2,0L422.5,734.441l-7.965-8.018a1.417,1.417,0,0,0-2,0l-8.335,8.44Zm4.589,36.24v-.105a4.629,4.629,0,0,1-3.271-1.372,4.813,4.813,0,0,1-1.319-3.27v-6.541l9.337-9.39,7.965,7.966a1.467,1.467,0,0,0,2,0l11.764-11.816,7.7,7.755-.475.158a4.895,4.895,0,0,0-.686.211c-.211.053-.422.158-.633.211a1.581,1.581,0,0,0-.422.211,4.913,4.913,0,0,0-.527.264l-.791.475c-.158.105-.264.158-.422.264-.105.053-.158.105-.264.158a6.372,6.372,0,0,0-1.266,1.108,11.16,11.16,0,0,0-3.271,7.913,11.6,11.6,0,0,0,.264,2.321c.053.211.105.369.158.58.158.528.317,1.055.528,1.583v.053a9.673,9.673,0,0,0,.686,1.266Zm42.571,0a8.345,8.345,0,0,1-11.658.106c-.211-.211-.422-.475-.633-.686-.158-.158-.317-.369-.475-.527a5.009,5.009,0,0,1-.527-.9c-.105-.211-.211-.369-.317-.58a4.452,4.452,0,0,1-.264-.9c-.053-.211-.158-.475-.211-.686a8.734,8.734,0,0,1-.158-1.688,8.467,8.467,0,0,1,2.427-5.908,8.156,8.156,0,0,1,5.908-2.427,8.468,8.468,0,0,1,5.908,2.427,8.246,8.246,0,0,1,2.427,5.908A8.437,8.437,0,0,1,451.355,750.161Z" transform="translate(-401.399 -706.483)" fill="#000" opacity="0.5" />
                                        <path id="Path_10238" data-name="Path 10238" d="M625.084,882.426a1.838,1.838,0,0,0-.475-.316,1.54,1.54,0,0,0-.475-.105h-.106a1.541,1.541,0,0,0-.475.105,1.247,1.247,0,0,0-.475.316l-3.271,3.271a1.417,1.417,0,0,0,2,2l.844-.844v5.8a1.424,1.424,0,0,0,2.849,0v-5.8l.844.844a1.417,1.417,0,0,0,2-2Z" transform="translate(-580.034 -850.3)" fill="#000" opacity="0.5" />
                                    </g>
                                </g>
                            </svg></span>
                        </label>
                        <button className='submit-button' type="submit">{t('uploadFile.submit')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadFileUser;
