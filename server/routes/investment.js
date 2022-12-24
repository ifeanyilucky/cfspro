const router = require('express').Router();
const {
  deposit,
  requestWithdrawal,
  createWithdrawalMethod,
  getWithdrawalMethod,
  requestWithdrawalOtp,
  getDeposits,
  getWithdrawals,
  createInvestment,
  getInvestments,
  getTransaction,
} = require('../controllers/investment');
const auth = require('../middlewares/authentication');

router.route('/investments/new').post(auth, createInvestment);
router.route('/investments').get(auth, getInvestments);
router.route('/investments/:id').get(auth, getInvestments);
router.route('/deposits').post(auth, deposit);
router.route('/deposits').get(auth, getDeposits);
router.route('/withdrawals').get(auth, getWithdrawals);
router.route('/request-otp').get(requestWithdrawalOtp);
router.route('/withdrawal-method').post(auth, createWithdrawalMethod);
router.route('/withdrawal-method').get(auth, getWithdrawalMethod);
router.route('/transaction').get(auth, getTransaction);

router.route('/request-withdrawal').post(auth, requestWithdrawal);

module.exports = router;
