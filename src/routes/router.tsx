import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loading/Splash';
import PageLoader from 'components/loading/PageLoader';
import { useUser } from './context/UserContext';

const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));
const UserProfile = lazy(() => import('pages/user_info/UserProfile'));
const AccountSettings = lazy(() => import('pages/user_info/AccountSettings'));
const Users = lazy(() => import('pages/users/Users'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  if (loading) {
    return <Splash />;
  }
  if (!user) {
    return (
      <>
        <Navigate to={paths.login} /> || <Navigate to={paths.signup} />
      </>
    );
  }
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  if (loading) {
    return <Splash />;
  }
  if (user) {
    return <Navigate to={paths.dashboard} />;
  }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.user_info,
            element: (
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.accountSettings,
            element: (
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.users,
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: (
              <AuthRoute>
                <Login />
              </AuthRoute>
            ),
          },
          {
            path: paths.signup,
            element: (
              <AuthRoute>
                <Signup />
              </AuthRoute>
            ),
          },
          // {
          //   path: paths.forgotPassword,
          //   element: <Signup />,
          // },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.error404} replace />,
      },
    ],
  },
]);

export default router;
