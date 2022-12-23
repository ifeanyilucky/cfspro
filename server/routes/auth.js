const router = require('express').Router();
const {
  login,
  register,
  account,
  updateAccount,
  resetPassword,
  resetPasswordRequest,
} = require('../controllers/auth');
const auth = require('../middlewares/authentication');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/account/:id').get(auth, account);
router.route('/account/update').patch(auth, updateAccount);
router.route('/reset-password-request').post(resetPasswordRequest);
router.route('/reset-password/:token').patch(resetPassword);

module.exports = router;
