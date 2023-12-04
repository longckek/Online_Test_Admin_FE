import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
// const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
// const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
// const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// COURSE
const CourseListPage = lazy(() => import('src/pages/dashboard/course/list'));
const CourseCreatePage = lazy(() => import('src/pages/dashboard/course/new'));
const CourseEditPage = lazy(() => import('src/pages/dashboard/course/edit'));
const CourseDetailsPage = lazy(() => import('src/pages/dashboard/course/details'));
// ACTIVATION CODE
const ActivationCodeListPage = lazy(() => import('src/pages/dashboard/activation-code/list'));
const ActivationCodeCreatePage = lazy(() => import('src/pages/dashboard/activation-code/new'));
const ActivationCodeDetailsPage = lazy(() => import('src/pages/dashboard/activation-code/details'));
// CONTEST
const ContestListPage = lazy(() => import('src/pages/dashboard/contest/list'));
const ContestCreatePage = lazy(() => import('src/pages/dashboard/contest/new'));
const ContestEditPage = lazy(() => import('src/pages/dashboard/contest/edit'));
// ROUND
const RoundListPage = lazy(() => import('src/pages/dashboard/round/list'));
const RoundCreatePage = lazy(() => import('src/pages/dashboard/round/new'));
const RoundEditPage = lazy(() => import('src/pages/dashboard/round/edit'));
// ACADEMIC TRANSCRIPT
const AcademicTranscriptListPage = lazy(() => import('src/pages/dashboard/academic-transcript/list'));
const AcademicTranscriptCreatePage = lazy(() => import('src/pages/dashboard/academic-transcript/new'));
const AcademicTranscriptEditPage = lazy(() => import('src/pages/dashboard/academic-transcript/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

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
      { element: <IndexPage />, index: true },
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
          { path: 'new', element: <ActivationCodeCreatePage /> },
        ],
      },
      {
        path: 'contest',
        children: [
          { element: <ContestListPage />, index: true },
          { path: 'list', element: <ContestListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ContestCreatePage /> },
          { path: ':id/edit', element: <ContestEditPage /> },
        ],
      },
      {
        path: 'round',
        children: [
          { element: <RoundListPage />, index: true },
          { path: 'list', element: <RoundListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <RoundCreatePage /> },
          { path: ':id/edit', element: <RoundEditPage /> },
        ],
      },
      {
        path: 'academic-transcript',
        children: [
          { element: <ContestListPage />, index: true },
          { path: 'list', element: <AcademicTranscriptListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <AcademicTranscriptCreatePage /> },
          { path: ':id/edit', element: <AcademicTranscriptEditPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
