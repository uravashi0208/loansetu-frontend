import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication/Register')));
const AuthforgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication/ForgotPassword')));
const AuthOtp = Loadable(lazy(() => import('views/pages/authentication/authentication/OtpPage')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication/ResetPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/forgot-password',
      element: <AuthforgotPassword />
    },
    {
      path: '/otp',
      element: <AuthOtp />
    },
    {
      path: '/reset-password',
      element: <AuthResetPassword />
    }
  ]
};

export default AuthenticationRoutes;
