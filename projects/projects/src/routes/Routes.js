import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your views
import SignIn from '../views/SignIn/SignIn';
import SignUp from '../views/SignUp/SignUp';
import CompleteProfile from '../views/CompleteProfile/CompleteProfile';
import VerifyAccount from '../views/VerifyAccount/VerifyAccount';
import VerifyMessage from '../views/VerifyMessage/VerifyMessage';
import PasswordResetMail from '../views/PasswordResetMail/PasswordResetMail';
import VerifyAccountReset from '../views/VerifyAccountReset/VerifyAccountReset';
import PasswordReset from '../views/PasswordReset/PasswordReset';
import MealTable from '../Admin/Resto-tab/Resto-tab';
import TransportTable from '../Admin/Transport-tab/Transport-tab';
import UserMealTable from '../views/Resto-tab/Resto-tab';
import TransportTableUser from '../views/Transport-tab/Transport-tab';
import UploadFileAdmin from '../Admin/Upload-file/Upload';
import UploadFileUser from '../views/Upload-file/Upload';
import ProfilePage from '../views/Profile/Profile';
import AdminProfile from '../Admin/Profile/Profile';
import UsersTable from '../Admin/Users-tab/Users-tab';
import DocsTable from '../Admin/Docs-tab/Docs-tab';
import DocsUserTable from '../views/Docs-tab/Docs-tab';
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';
const MainRoutes = () => {
    return (
        <Routes>
           <Route
    path="/"
    element={<UnprotectedRoute element={<SignIn />} />}
/>
<Route
    path="/register"
    element={<UnprotectedRoute element={<SignUp />} />}
/>
<Route
    path="/register/account"
    element={<UnprotectedRoute element={<CompleteProfile />} />}
/>
<Route
    path="/account/verify-account"
    element={<UnprotectedRoute element={<VerifyAccount />} />}
/>
<Route
    path="/account/verify-message"
    element={<UnprotectedRoute element={<VerifyMessage />} />}
/>
<Route
    path="/account/reset/request"
    element={<UnprotectedRoute element={<PasswordResetMail />} />}
/>
<Route
    path="/account/reset/verify"
    element={<UnprotectedRoute element={<VerifyAccountReset />} />}
/>
<Route
    path="/account/reset"
    element={<UnprotectedRoute element={<PasswordReset />} />}
/>

            {/* Protected routes for user type */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute element={<ProfilePage />} allowedUserTypes={['student', 'teacher']} />
                }
            />
            <Route
                path="/meals"
                element={
                    <ProtectedRoute element={<UserMealTable />} allowedUserTypes={['student', 'teacher']} />
                }
            />
            <Route
                path="/transport"
                element={
                    <ProtectedRoute element={<TransportTableUser />} allowedUserTypes={['student', 'teacher']} />
                }
            />
            <Route
                path="/upload"
                element={
                    <ProtectedRoute element={<UploadFileUser />} allowedUserTypes={['student', 'teacher']} />
                }
            />
            <Route
                path="/docs"
                element={
                    <ProtectedRoute element={<DocsUserTable />} allowedUserTypes={['student', 'teacher']} />
                }
            />

            {/* Protected routes for admin type */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute element={<AdminProfile />} allowedUserTypes={['admin']} />
                }
            />
            <Route
                path="/admin/meals"
                element={
                    <ProtectedRoute element={<MealTable />} allowedUserTypes={['admin']} />
                }
            />
            <Route
                path="/admin/transport"
                element={
                    <ProtectedRoute element={<TransportTable />} allowedUserTypes={['admin']} />
                }
            />
            <Route
                path="/admin/upload"
                element={
                    <ProtectedRoute element={<UploadFileAdmin />} allowedUserTypes={['admin']} />
                }
            />
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute element={<UsersTable />} allowedUserTypes={['admin']} />
                }
            />
            <Route
                path="/admin/docs"
                element={
                    <ProtectedRoute element={<DocsTable />} allowedUserTypes={['admin']} />
                }
            />
        </Routes>
    );
};

export default MainRoutes;
