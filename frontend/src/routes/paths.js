// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';
const ROOT_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/forgot-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_ADMIN = {
  root: ROOT_ADMIN,
  overview: path(ROOT_ADMIN, '/overview'),
  depositRequest: path(ROOT_ADMIN, '/deposit-request'),
  allUser: path(ROOT_ADMIN, '/all-user'),
  investments: path(ROOT_ADMIN, '/investments'),
  sendEmail: path(ROOT_ADMIN, '/send-email'),
  commission: path(ROOT_ADMIN, '/commission'),
  withdrawalRequest: path(ROOT_ADMIN, '/withdrawal-request')
};

export const PATH_DASHBOARD = {
  app: ROOTS_DASHBOARD,
  deposit: path(ROOTS_DASHBOARD, 'deposit'),
  payment: path(ROOTS_DASHBOARD, 'deposit/payment'),
  myPlan: path(ROOTS_DASHBOARD, 'my-plan'),
  buyPlan: path(ROOTS_DASHBOARD, 'buy-plan'),
  support: path(ROOTS_DASHBOARD, 'support'),
  withdraw: path(ROOTS_DASHBOARD, 'withdraw'),
  withdrawConfirm: path(ROOTS_DASHBOARD, 'withdraw/confirm'),
  transaction: path(ROOTS_DASHBOARD, 'account-history'),
  referrals: path(ROOTS_DASHBOARD, 'referrals'),
  accountSetting: path(ROOTS_DASHBOARD, 'account-setting'),
  plans: path(ROOTS_DASHBOARD, 'plans')
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
