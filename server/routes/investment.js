const router = require('express').Router();
const {
  deposit,
  requestWithdrawal,
  createWithdrawalMethod,
  getWithdrawalMethod,
  requestWithdrawalOtp,
  getDeposits,
  getWithdrawals
} = require('../controllers/investment');
const auth = require('../middlewares/authentication');

router.route('/deposits').post(auth, deposit);
router.route('/deposits').get(auth, getDeposits);
router.route('/withdrawals').get(auth, getWithdrawals);
router.route('/request-otp').get(requestWithdrawalOtp);
router.route('/withdrawal-method').post(auth, createWithdrawalMethod);
router.route('/withdrawal-method').get(auth, getWithdrawalMethod);

router.route('/request-withdrawal').post(auth, requestWithdrawal);

module.exports = router;
