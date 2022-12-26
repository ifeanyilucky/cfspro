import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_KEY });

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem('accessToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return req;
});
// AUTHENTICATION
export const loginUser = (values) => axiosInstance.post('/login', values);
export const registerUser = (values) => axiosInstance.post('/register', values);
export const resetPasswordRequest = (email) => axiosInstance.post('/reset-password-request', email);
export const resetPassword = (password, token) => axiosInstance.patch(`/reset-password/${token}`, password);
export const changePassword = (values) => axiosInstance.patch('/account/change-password', values);
// -----------------------------------------------------------------------------

export const getAccount = (userId) => axiosInstance.get(`/account/${userId}`);
export const deposit = (payload) => axiosInstance.post('/deposits', payload);
export const getAllDeposits = () => axiosInstance.get('/deposits');
export const getWithdrawalMethod = () => axiosInstance.get('/withdrawal-method');
export const requestWithdrawalOTP = () => axiosInstance.get('/request-otp');
export const createWithdrawals = (payload) => axiosInstance.post('/withdrawal-method', payload);
export const updateAccount = (payload) => axiosInstance.patch('/account/update', payload);
export const newInvestment = (values) => axiosInstance.post('/investments/new', { ...values });
export const fetchInvestments = () => axiosInstance.get('/investments');
export const getWithdrawals = () => axiosInstance.get('/withdrawals');
export const requestWithdrawal = (payload) => axiosInstance.post('/request-withdrawal', payload);
export const fetchTransaction = () => axiosInstance.get('/transaction');
// ADMIN REQUESTS
export const getStaticDeposits = () => axiosInstance.get('/static/deposits');
export const getStaticWithdrawal = () => axiosInstance.get('/static/withdrawals');
export const getStaticInvestments = () => axiosInstance.get('/static/investments');
export const updateStaticInvestment = (id, values) => axiosInstance.patch(`/static/investments/edit/${id}`, values);
export const updateDeposit = (values, id) => axiosInstance.patch(`/static/update-deposit/${id}`, values);
export const updateWithdrawal = (values, id) => axiosInstance.patch(`/static/update-withdrawal/${id}`, values);
export const getUserList = () => axiosInstance.get('/static/users');
export const getUser = (id) => axiosInstance.get(`/static/users/${id}`);
export const deleteUser = (id) => axiosInstance.delete(`/static/users/delete/${id}`);
export const editUser = (payload, id) => axiosInstance.patch(`/static/users/edit/${id}`, { ...payload });
export const fetchInvestment = (id) => axiosInstance.get(`/static/investments/${id}`);
export const fetchDeposit = (id) => axiosInstance.get(`/static/deposits/${id}`);
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error);
//     Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   }
// );

export default axiosInstance;
