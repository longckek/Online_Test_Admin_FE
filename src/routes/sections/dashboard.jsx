import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
// COURSE
const CourseListPage = lazy(() => import('src/pages/dashboard/course/list'));
const CourseCreatePage = lazy(() => import('src/pages/dashboard/course/new'));
const CourseEditPage = lazy(() => import('src/pages/dashboard/course/edit'));
const CourseDetailsPage = lazy(() => import('src/pages/dashboard/course/details'));
// ACTIVATION CODE
const ActivationCodeListPage = lazy(() => import('src/pages/dashboard/activation-code/list'));
const ActivationCodeDetailsPage = lazy(() => import('src/pages/dashboard/activation-code/details'));
// CONTEST
const ContestListPage = lazy(() => import('src/pages/dashboard/contest/list'));
const ContestCreatePage = lazy(() => import('src/pages/dashboard/contest/new'));
const ContestEditPage = lazy(() => import('src/pages/dashboard/contest/edit'));
// ROUND
const RoundListPage = lazy(() => import('src/pages/dashboard/round/list'));
// ACADEMIC TRANSCRIPT
const AcademicTranscriptListPage = lazy(() =>
  import('src/pages/dashboard/academic-transcript/list')
);
const AcademicTranscriptDetailsPage = lazy(() =>
  import('src/pages/dashboard/academic-transcript/details')
);
// SYNC DATA
const SyncDataTestOutlinePage = lazy(() => import('src/pages/dashboard/sync-data/test-outline'));
const SyncDataRoundPage = lazy(() => import('src/pages/dashboard/sync-data/round'));
const SyncDataTestFormGroupPage = lazy(() =>
  import('src/pages/dashboard/sync-data/test-form-group')
);

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      // <AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      // </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Navigate to={PATH_AFTER_LOGIN} replace />,
      },
      {
        path: 'course',
        children: [
          { element: <CourseListPage />, index: true },
          { path: 'list', element: <CourseListPage /> },
          { path: ':id', element: <CourseDetailsPage /> },
          { path: 'new', element: <CourseCreatePage /> },
          { path: ':id/edit', element: <CourseEditPage /> },
        ],
      },
      {
        path: 'activation-code',
        children: [
          { element: <ActivationCodeListPage />, index: true },
          { path: 'list', element: <ActivationCodeListPage /> },
          { path: ':id', element: <ActivationCodeDetailsPage /> },
        ],
      },
      {
        path: 'contest',
        children: [
          { element: <ContestListPage />, index: true },
          { path: 'list', element: <ContestListPage /> },
          { path: 'new', element: <ContestCreatePage /> },
          { path: ':id/edit', element: <ContestEditPage /> },
        ],
      },
      {
        path: 'round',
        children: [
          { element: <RoundListPage />, index: true },
          { path: 'list', element: <RoundListPage /> },
        ],
      },
      {
        path: 'academic-transcript',
        children: [
          { element: <AcademicTranscriptListPage />, index: true },
          { path: 'list', element: <AcademicTranscriptListPage /> },
          { path: ':id', element: <AcademicTranscriptDetailsPage /> },
        ],
      },
      {
        path: 'sync-data',
        children: [
          { element: <SyncDataTestOutlinePage />, index: true },
          { path: 'test-outline', element: <SyncDataTestOutlinePage /> },
          { path: 'round', element: <SyncDataRoundPage /> },
          { path: 'test-form-group', element: <SyncDataTestFormGroupPage /> },
        ],
      },
    ],
  },
];
