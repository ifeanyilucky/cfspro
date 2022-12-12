// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
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

  ecommerce: path(ROOTS_DASHBOARD, 'ecommerce'),
  analytics: path(ROOTS_DASHBOARD, 'analytics'),
  banking: path(ROOTS_DASHBOARD, 'banking'),
  booking: path(ROOTS_DASHBOARD, 'booking')
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
