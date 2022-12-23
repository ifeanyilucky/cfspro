// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig =
  // GENERAL
  // ----------------------------------------------------------------------
  {
    customer: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.app,
        icon: ICONS.dashboard
      },
      { title: 'Deposit', path: PATH_DASHBOARD.deposit, icon: ICONS.ecommerce },
      { title: 'Withdraw', path: PATH_DASHBOARD.withdraw, icon: ICONS.ecommerce },
      // { title: 'Profit History', path: PATH_DASHBOARD.ecommerce, icon: ICONS.ecommerce },
      { title: 'My plan', path: PATH_DASHBOARD.myPlan, icon: ICONS.booking },
      { title: 'Trading plans', path: PATH_DASHBOARD.plans, icon: ICONS.booking },
      { title: 'Transactions', path: PATH_DASHBOARD.transaction, icon: ICONS.ecommerce },
      { title: 'Referrals', path: PATH_DASHBOARD.referrals, icon: ICONS.booking }
    ]
  };

// MANAGEMENT
// ----------------------------------------------------------------------
// {
//   items: [
//     // MANAGEMENT : USER
//     {
//       title: 'user',
//       path: PATH_DASHBOARD.user.root,
//       icon: ICONS.user,
//       children: [
//         { title: 'profile', path: PATH_DASHBOARD.user.profile },
//         { title: 'cards', path: PATH_DASHBOARD.user.cards },
//         { title: 'list', path: PATH_DASHBOARD.user.list },
//         { title: 'create', path: PATH_DASHBOARD.user.newUser },
//         { title: 'edit', path: PATH_DASHBOARD.user.editById },
//         { title: 'account', path: PATH_DASHBOARD.user.account }
//       ]
//     },

//     // MANAGEMENT : E-COMMERCE
//     {
//       title: 'e-commerce',
//       path: PATH_DASHBOARD.eCommerce.root,
//       icon: ICONS.cart,
//       children: [
//         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
//         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
//         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
//         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
//         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
//         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
//         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
//       ]
//     }
//   ]
// }

// APP
// ----------------------------------------------------------------------

export default sidebarConfig;
