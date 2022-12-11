const router = require('express').Router();
const { login, register, account, updateAccount } = require('../controllers/auth');
const auth = require('../middlewares/authentication');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/account/:id').get(auth, account);
router.route('/account/update').patch(auth, updateAccount);

module.exports = router;
