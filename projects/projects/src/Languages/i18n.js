import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// les traductions en français
const resources = {
    fr: {
        translation: {
            lang:{
                french:'Français',
                english:'Anglais'
            },
            login: {
                welcome: 'Bienvenue !',
                emailPlaceholder: 'Email',
                passwordPlaceholder: 'Mot de passe',
                forgotPassword: 'Mot de passe oublié ?',
                resetPassword: 'Rénitialiser le mot de passe',
                signIn: 'Se Connecter',
                incorrectCredentials: 'Identifiant ou mot de passe incorrect.',
                noAccount: 'Vous n’avez pas de compte ?',
                createAccount: 'Créer un compte'
            },
            signUp: {
                welcome: 'S\'inscrire !',
                emailPlaceholder: 'Email',
                passwordPlaceholder: 'Mot de passe',
                userType: 'Type',
                student: 'Etudiant',
                teacher: 'Enseignant',
                department: 'Département',
                math:'Mathematique',
                info:'Informatique',
                phy: 'Physique',
                ch: 'Chimie',
                bio: 'Biologie',
                gio: 'Géologie',
                signUpButton: 'S\'inscrire',
                error:'Un compte avec cette adresse mail existe déjà'
            },
            completeProfile: {
                welcome: 'Complétez votre profil !',
                fullNamePlaceholder: 'Nom et Prénom',
                uploadPhoto: 'Merci de joindre votre photo de profil',
                signUpButton: 'S\'inscrire',
                fillInformation: 'Veuillez remplir toutes les informations',
                errorCompletingProfile: 'Erreur lors de la complétion du profil',
                requiredField: 'Veuillez renseigner ce champ',
            },
            passwordReset: {
                welcome: 'Rénitialiser le mot de passe !',
                newPassword: 'Nouveau mot de passe',
                confirmPassword: 'Confirmer mot de passe',
                validate: 'Valider',
                passwordsDoNotMatch: 'Les mots de passe ne correspondent pas.',
                mailNoExist:"Ce compte n'existe pas",
                code:"Code incorrect"            },
            verifyAccount: {
                verifyEmail: 'Vérifiez votre adresse mail !',
                checkEmail: 'Veuillez vérifier votre adresse mail',
                validate: 'Valider'
            },
            verifyAccountReset: {
                resetPassword: 'Rénitialiser le mot de passe !',
                checkEmail: 'Veuillez vérifier votre adresse mail'
            },
            verifyMessage: {
                accountCreated: 'Votre compte a été créé, vous recevrez un mail contenant le résultat!'
            },
            docsTab: {
                title: 'Liste des documents',
                searchBarPlaceholder: 'Rechercher...',
                totalDocuments: 'Total documents : {{count}}',
                documentName: 'Nom du document',
                creationDate: 'Date de création',
                submissionDate: 'Date de soumission',
                documentStatus: 'Statut du document',
                documentType: 'Type de document',
                submittedBy: 'Soumis par',
                documentManagement: 'Gestion du document',
                download: 'Télécharger',
                filters: {
                    allStatus: 'Tous les statuts',
                    pending: 'En attente',
                    approved: 'Approuvé',
                    allTypes: 'Tous les types',
                    td:"Traveaux dirigée",
                    cours:"Cours",
                    tp:"Traveaux pratiqes",
                    exam:"Examen",
                    gradeReport: 'Relevé des notes',
                    schedule: 'Emploi du temps',
                    announcement: 'Annonce'
                },
                popups: {
                    acceptMsg: 'Êtes-vous sûr de vouloir approuver ce document ?',
                    rejectMsg: 'Êtes-vous sûr de vouloir refuser ce document ?',
                    deleteMsg: 'Êtes-vous sûr de vouloir supprimer ce document ?',
                    acceptBtn: 'Approuver',
        rejectBtn: 'Rejeter',
        deleteBtn: 'Supprimer',
        cancelBtn: 'Annuler'
                }
            },
            navigationMenu: {
                documents: 'Documents',
                menu: 'Menu',
                transport: 'Transport',
                uploadDocument: 'Déposez un document',
            },
            profile: {
                title: 'Profil',
                fullName: 'Nom et Prénom',
                newFullName: 'Nouveau nom et prénom',
                email: 'Adresse Mail',
                newEmail: 'Nouveau mail',
                password: 'Mot de passe',
                newPassword: 'Nouveau mot de passe',
                confirmPassword: 'Confirmer mot de passe',
                changeProfilePicture: 'Modifier photo de profil',
                cancel: 'Annuler',
                save: 'Enregistrer',
                formSubmitted: 'Formulaire soumis !',
                error:"Une erreur s'est produite lors de la modification du profil",
                msg:"Votre profil a été modifié avec succès",
            },
            restoTab: {
                title: 'Menu restaurant de la semaine',
                meal: 'Repas',
                lunch: 'Déjeuner',
                dinner: 'Dîner',
                monday: 'Lundi',
                tuesday: 'Mardi',
                wednesday: 'Mercredi',
                thursday: 'Jeudi',
                friday: 'Vendredi',
                saturday: 'Samedi',
                sunday: 'Dimanche'
            },
            form: {
                errorMessage: 'Veuillez remplir tous les champs.',
                submitButton: 'Valider'
            },
            transportTable: {
                title: 'Horaires transports',
                line: 'Ligne',
                destination: 'Destination',
                firstDeparture: 'Premier départ',
                lastDeparture: 'Dernier départ',
                frequency: 'Fréquence',
                toStation: 'Vers station',
                toSuburb: 'Vers banlieue'
            },
            uploadFile: {
                title: "Dépôt fichier",
                fullNamePlaceholder: "Nom du document",
                docTypePlaceholder: "Type",
                gradeReport: "Relevé de notes",
                td:"Traveaux dirigée",
                cours:"Cours",
                tp:"Traveaux pratiqes",
                exam:"Examen",
                announcement: "Annonce",
                schedule: "Emploi du temps",
                fileName: "Nom du fichier",
                uploadText: "Merci de joindre le document",
                submit: "Déposer",
                error:"Une erreur s'est produite lors du téléchargement du fichier",
                msg:"Le document a été déposé avec succès",
            },
            usersTab: {
                title:"Liste des utilisateurs",
                totalUsersCount: 'Nombre total d\'utilisateurs : {{count}}',
                headers: {
                    id: 'ID',
                    name: 'Nom & Prénom',
                    accountStatus: 'Statut du compte',
                    userType: 'Type d\'utilisateur',
                    lastVisit: 'Date de creation',
                    manageUser: 'Gérer utilisateur'
                },
                filters: {
                    allStatus: 'Tous les statuts',
                    pending: 'En attente',
                    active: 'Actif',
                    allTypes: 'Tous les types',
                    student: 'Étudiant',
                    teacher: 'Enseignant'
                },
                popups: {
                    details: 'Détails',
                    id: 'ID',
                    email: 'Email',
                    department: 'département',
                    acceptMsg: 'Êtes-vous sûr de vouloir accepter cet utilisateur ?',
                    rejectMsg: 'Êtes-vous sûr de vouloir refuser cet utilisateur ?',
                    deleteMsg: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
                    acceptBtn: 'Accepter',
                    rejectBtn: 'Rejeter',
                    deleteBtn: 'Supprimer',
                    cancelBtn: 'Annuler'
                }
            }
            // autres traductions françaises ici
        }
    },
    en: {
        translation: {
            lang:{
                french:'French',
                english:'English'
            },
            login: {
                welcome: 'Welcome!',
                emailPlaceholder: 'Email',
                passwordPlaceholder: 'Password',
                forgotPassword: 'Forgot your password?',
                resetPassword: 'Reset password',
                signIn: 'Sign In',
                incorrectCredentials: 'Incorrect email or password.',
                noAccount: 'Don\'t have an account?',
                createAccount: 'Create an account'
            },
            signUp: {
                welcome: 'Sign Up!',
                emailPlaceholder: 'Email',
                passwordPlaceholder: 'Password',
                userType: 'Type',
                student: 'Student',
                teacher: 'Teacher',
                department: 'department',
                math:'Mathematics',
                info:'Computer Science',
                phy: 'Physics',
                ch: 'Chemistry',
                bio: 'Biology',
                gio: 'Geology',
                signUpButton: 'Sign Up',
                error:'An account with this email address already exists'
            },
            completeProfile: {
                welcome: 'Complete Your Profile!',
                fullNamePlaceholder: 'Full Name',
                uploadPhoto: 'Please upload your profile photo',
                signUpButton: 'Sign Up',
                fillInformation: 'Please fill in all the information',
                errorCompletingProfile: 'Error completing profile',
                requiredField: 'Please fill in this field',
            },
            passwordReset: {
                welcome: 'Reset password !',
                newPassword: 'New Password',
                confirmPassword: 'Confirm Password',
                validate: 'Validate',
                passwordsDoNotMatch: 'Passwords do not match.',
                mailNoExist:"This account does not exist",
                code:"Incorrect code"            },
            verifyAccount: {
                verifyEmail: 'Verify your email address!',
                checkEmail: 'Please check your email address',
                validate: 'Validate'
            },
            verifyAccountReset: {
                resetPassword: 'Reset password!',
                checkEmail: 'Please check your email address'
            },
            verifyMessage: {
                accountCreated: 'Your account has been created, you will receive an email containing the result!'
            },
            docsTab: {
                title: 'List of documents',
                searchBarPlaceholder: 'Search...',
                totalDocuments: 'Total documents: {{count}}',
                documentName: 'Document Name',
                creationDate: 'Creation Date',
                submissionDate: 'Submission Date',
                documentStatus: 'Document Status',
                documentType: 'Document Type',
                submittedBy: 'Submitted By',
                documentManagement: 'Document Management',
                download: 'Download',
                filters: {
                    allStatus: 'All statuses',
                    pending: 'Pending',
                    approved: 'Approved',
                    allTypes: 'All types',
                    td:"supervised series of works",
                cours:"Courses",
                tp:"Practical Work",
                exam:"Exam",
                    gradeReport: 'Grade report',
                    schedule: 'Schedule',
                    announcement: 'Announcement'
                },
                popups: {
                    acceptMsg: 'Are you sure you want to approve this document?',
                    rejectMsg: 'Are you sure you want to reject this document?',
                    deleteMsg: 'Are you sure you want to delete this document?',
                    acceptBtn: 'Approve',
                    rejectBtn: 'Reject',
                    deleteBtn: 'Delete',
                    cancelBtn: 'Cancel'
                }                
            },
            navigationMenu: {
                documents: 'Documents',
                menu: 'Menu',
                transport: 'Transport',
                uploadDocument: 'Upload a document',
            },
            profile: {
                title: 'Profile',
                fullName: 'Full Name',
                newFullName: 'New full name',
                email: 'Email',
                newEmail: 'New email',
                password: 'Password',
                newPassword: 'New password',
                confirmPassword: 'Confirm password',
                changeProfilePicture: 'Change profile picture',
                cancel: 'Cancel',
                save: 'Save',
                formSubmitted: 'Form submitted!',
                error:"An error occurred while editing the profile",
                msg:"Your profile has been successfully edited",
                        },
            restoTab: {
                title: 'Restaurant menu of the week',
                meal: 'Meal',
                lunch: 'Lunch',
                dinner: 'Dinner',
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                saturday: 'Saturday',
                sunday: 'Sunday'
            },
            form: {
                errorMessage: 'Please fill in all fields.',
                submitButton: 'Validate'
            },
            transportTable: {
                title: 'Transport schedules',
                line: 'Line',
                destination: 'Destination',
                firstDeparture: 'First departure',
                lastDeparture: 'Last departure',
                frequency: 'Frequency',
                toStation: 'To station',
                toSuburb: 'To suburb'
            },
            uploadFile: {
                title: "File upload",
                fullNamePlaceholder: "Document Name",
                docTypePlaceholder: "Type",
                gradeReport: "Grade Report",
                announcement: "Announcement",
                td:"supervised series of works",
                cours:"Courses",
                tp:"Practical Work",
                exam:"Exam",
                schedule: "Schedule",
                fileName: "File Name",
                uploadText: "Please attach the document",
                submit: "Upload" ,
                error:"An error occurred while uploading the file",
                msg:"The document has been successfully uploaded",
                        },
            usersTab: {
                title:'List of users',
                totalUsersCount: 'Total number of users: {{count}}',
                headers: {
                    id: 'ID',
                    name: 'Name & Surname',
                    accountStatus: 'Account Status',
                    userType: 'User Type',
                    lastVisit: 'Creation Date',
                    manageUser: 'Manage User'
                },
                filters: {
                    allStatus: 'All statuses',
                    pending: 'Pending',
                    active: 'Active',
                    allTypes: 'All types',
                    student: 'Student',
                    teacher: 'Teacher'
                },
                popups: {
                    id: 'ID',
                    email: 'Email',
                    details: 'Details',
                    department: 'department',
                    acceptMsg: 'Are you sure you want to accept this user?',
                    rejectMsg: 'Are you sure you want to reject this user?',
                    deleteMsg: 'Are you sure you want to delete this user?',
                    acceptBtn: 'Accept',
                    rejectBtn: 'Reject',
                    deleteBtn: 'Delete',
                    cancelBtn: 'Cancel'
                }
            }
            
            // other English translations here
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'fr', // langue par défaut
        fallbackLng: 'en', // langue de secours si la langue par défaut n'est pas disponible
        interpolation: {
            escapeValue: false // react déjà échappe les valeurs, donc pas besoin de les échapper ici
        }
    });

export default i18n;
