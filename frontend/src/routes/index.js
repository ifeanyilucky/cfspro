import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import AdminDashboardLayout from '../layouts/adminDashboard';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const adminRoles = ['admin'];
  const userRoles = ['customer'];
  return useRoutes([
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },

        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    { path: '/ref', element: <ReferralPage /> },
    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={userRoles}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <GeneralApp />, path: '/' },
        { path: 'deposit', element: <Deposit /> },
        { path: 'deposit/payment', element: <Payment /> },
        { path: 'buy-plan', element: <BuyPlan /> },
        { path: 'my-plan', element: <MyPlan /> },
        { path: 'withdraw', element: <Withdraw /> },
        { path: 'withdraw/confirm', element: <WithdrawalStep2 /> },
        { path: 'support', element: <Support /> },
        { path: 'account-setting', element: <UserAccount /> },
        { path: 'account-history', element: <Transaction /> },
        { path: 'referrals', element: <Referrals /> },
        { path: 'plans', element: <Plans /> },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> }
          ]
        }
      ]
    },
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={adminRoles}>
            <AdminDashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/admin/overview" replace /> },
        { element: <AdminOverview />, path: 'overview' },
        { element: <DepositRequest />, path: 'deposit-request' },
        { element: <DepositRequestDetail />, path: 'deposit-request/:id' },
        { element: <UserList />, path: 'all-user' },
        { element: <Investments />, path: 'investments' },
        { element: <SendEmail />, path: 'send-email' },
        { element: <Commission />, path: 'commission' },
        { element: <WithdrawalRequest />, path: 'withdrawal-request' }
      ]
    },

    { path: '404', element: <NotFound /> },
    // Main Routes

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS
const ReferralPage = Loadable(lazy(() => import('../pages/ReferralPage')));

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword2')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Deposit = Loadable(lazy(() => import('../pages/dashboard/Deposit')));
const Payment = Loadable(lazy(() => import('../pages/dashboard/Payment')));
const BuyPlan = Loadable(lazy(() => import('../pages/dashboard/BuyPlan')));
const MyPlan = Loadable(lazy(() => import('../pages/dashboard/MyPlan')));
const Support = Loadable(lazy(() => import('../pages/dashboard/Support')));
const Withdraw = Loadable(lazy(() => import('../pages/dashboard/Withdraw')));
const WithdrawalStep2 = Loadable(lazy(() => import('../pages/dashboard/WithdrawalStep2')));
const Transaction = Loadable(lazy(() => import('../pages/dashboard/Transaction')));
const Referrals = Loadable(lazy(() => import('../pages/dashboard/Referrals')));
const Plans = Loadable(lazy(() => import('../pages/dashboard/Plans')));

// ADMIN DASHBOARD
const AdminOverview = Loadable(lazy(() => import('../pages/admin/Overview')));
const DepositRequest = Loadable(lazy(() => import('../pages/admin/DepositRequest')));
const Investments = Loadable(lazy(() => import('../pages/admin/Investments')));
const SendEmail = Loadable(lazy(() => import('../pages/admin/SendEmail')));
const UserList = Loadable(lazy(() => import('../pages/admin/UserList')));
const Commission = Loadable(lazy(() => import('../pages/admin/Commission')));
const WithdrawalRequest = Loadable(lazy(() => import('../pages/admin/WithdrawalRequest')));
const DepositRequestDetail = Loadable(lazy(() => import('../pages/admin/DepositRequestDetail')));

const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
// Main
const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColors')));
const Typography = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationTypography')));
const Shadows = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationShadows')));
const Grid = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationGrid')));
const Icons = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationIcons')));
const Accordion = Loadable(lazy(() => import('../pages/components-overview/material-ui/Accordion')));
const Alert = Loadable(lazy(() => import('../pages/components-overview/material-ui/Alert')));
const Autocomplete = Loadable(lazy(() => import('../pages/components-overview/material-ui/Autocomplete')));
const Avatar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Avatar')));
const Badge = Loadable(lazy(() => import('../pages/components-overview/material-ui/Badge')));
const Breadcrumb = Loadable(lazy(() => import('../pages/components-overview/material-ui/Breadcrumb')));
const Buttons = Loadable(lazy(() => import('../pages/components-overview/material-ui/buttons')));
const Checkbox = Loadable(lazy(() => import('../pages/components-overview/material-ui/Checkboxes')));
const Chip = Loadable(lazy(() => import('../pages/components-overview/material-ui/chips')));
const Dialog = Loadable(lazy(() => import('../pages/components-overview/material-ui/dialog')));
const Label = Loadable(lazy(() => import('../pages/components-overview/material-ui/Label')));
const List = Loadable(lazy(() => import('../pages/components-overview/material-ui/Lists')));
const Menu = Loadable(lazy(() => import('../pages/components-overview/material-ui/Menus')));
const Pagination = Loadable(lazy(() => import('../pages/components-overview/material-ui/Pagination')));
const Pickers = Loadable(lazy(() => import('../pages/components-overview/material-ui/pickers')));
const Popover = Loadable(lazy(() => import('../pages/components-overview/material-ui/Popover')));
const Progress = Loadable(lazy(() => import('../pages/components-overview/material-ui/progress')));
const RadioButtons = Loadable(lazy(() => import('../pages/components-overview/material-ui/RadioButtons')));
const Rating = Loadable(lazy(() => import('../pages/components-overview/material-ui/Rating')));
const Slider = Loadable(lazy(() => import('../pages/components-overview/material-ui/Slider')));
const Snackbar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Snackbar')));
const Stepper = Loadable(lazy(() => import('../pages/components-overview/material-ui/stepper')));
const Switches = Loadable(lazy(() => import('../pages/components-overview/material-ui/Switches')));
const Table = Loadable(lazy(() => import('../pages/components-overview/material-ui/table')));
const Tabs = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tabs')));
const Textfield = Loadable(lazy(() => import('../pages/components-overview/material-ui/textfield')));
const Timeline = Loadable(lazy(() => import('../pages/components-overview/material-ui/Timeline')));
const Tooltip = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tooltip')));
const TransferList = Loadable(lazy(() => import('../pages/components-overview/material-ui/transfer-list')));
const TreeView = Loadable(lazy(() => import('../pages/components-overview/material-ui/TreeView')));
const DataGrid = Loadable(lazy(() => import('../pages/components-overview/material-ui/data-grid')));
//
const CopyToClipboard = Loadable(lazy(() => import('../pages/components-overview/extra/CopyToClipboard')));
const Upload = Loadable(lazy(() => import('../pages/components-overview/extra/Upload')));
const Carousel = Loadable(lazy(() => import('../pages/components-overview/extra/Carousel')));
const Animate = Loadable(lazy(() => import('../pages/components-overview/extra/animate')));
