const {
  getDeposits,
  getWithdrawals,
  updateDeposit,
  updateWithdrawal,
  getUsers,
  updateUser,
  deleteUser,
  getReferralBonus,
  getInvestments,
} = require('../controllers/static');
const auth = require('../middlewares/authentication');
const router = require('express').Router();

router.route('/users').get(auth, getUsers);
router.route('/deposits').get(auth, getDeposits);
router.route('/update-deposit/:id').patch(auth, updateDeposit);
router.route('/withdrawals').get(auth, getWithdrawals);
router.route('/update-withdrawal/:id').patch(auth, updateWithdrawal);
router.route('/users/delete/:id').delete(auth, deleteUser);
router.route('/users/edit/:id').patch(auth, updateUser);
router.route('/referral-bonus').get(auth, getReferralBonus);
router.route('/investments').get(auth, getInvestments);
module.exports = router;
