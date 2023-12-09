import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
// GOOGLE
const GoogleLoginPage = lazy(() => import('src/pages/auth/google/login'));
const GoogleCallback = lazy(() => import('src/pages/auth/google/callback'));

// ----------------------------------------------------------------------

const authGoogle = {
  path: 'google',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <GoogleLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'callback',
      element: <GoogleCallback />,
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authGoogle],
  },
];
