import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_KEY });

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem('accessToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return req;
});

export const loginUser = (values) => axiosInstance.post('/login', values);
export const registerUser = (values) => axiosInstance.post('/register', values);
export const getAccount = (userId) => axiosInstance.get(`/account/${userId}`);
export const deposit = (payload) => axiosInstance.post('/deposits', payload);
export const getAllDeposits = () => axiosInstance.get('/deposits');
export const getWithdrawalMethod = () => axiosInstance.get('/withdrawal-method');
export const requestWithdrawalOTP = () => axiosInstance.get('/request-otp');
export const createWithdrawals = (payload) => axiosInstance.post('/withdrawal-method', payload);
export const updateAccount = (payload) => axiosInstance.patch('/account/update', payload);

export const getWithdrawals = () => axiosInstance.get('/withdrawals');
export const requestWithdrawal = (payload) => axiosInstance.post('/request-withdrawal', payload);

// ADMIN REQUESTS
export const getStaticDeposits = () => axiosInstance.get('/static/deposits');
export const getStaticWithrawal = () => axiosInstance.get('/static/withdrawals');
export const updateDeposit = (values, id) => axiosInstance.patch(`/static/update-deposit/${id}`, values);
export const updateWithdrawal = (values, id) => axiosInstance.patch(`/static/update-withdrawal/${id}`, values);
export const getUserList = () => axiosInstance.get('/static/users');
export const deleteUser = (id) => axiosInstance.delete(`/static/users/delete/${id}`);
export const editUser = (payload, id) => axiosInstance.patch(`/users/edit/${id}`, { payload });
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log(error);
//     Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   }
// );

export default axiosInstance;
