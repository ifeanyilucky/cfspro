import { createSlice } from '@reduxjs/toolkit';
import { PATH_DASHBOARD } from 'src/routes/paths';
import * as api from '../../utils/axios';

const initialState = {
  investments: [],
  investment: null,
  deposits: [],
  deposit: null,
  withdrawalMethod: null,
  withdrawal: [],
  isLoading: false,
  error: false,
  transaction: []
};

const slice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    addDeposit(state, action) {
      state.isLoading = false;
      state.deposits = [...state.deposits, action.payload];
    },

    getTransactionSuccess(state, action) {
      state.isLoading = false;
      state.transaction = action.payload;
    },
    getDepositsSuccess(state, action) {
      state.isLoading = false;
      state.deposits = action.payload;
    },
    getDepositSuccess(state, action) {
      state.isLoading = false;
      state.deposit = action.payload;
    },
    addInvestmentSuccess(state, action) {
      state.isLoading = false;
      state.investments = [...state.investments, action.payload];
    },
    getInvestmentsSuccess(state, action) {
      state.isLoading = false;
      state.investments = action.payload;
    },
    getInvestmentSuccess(state, action) {
      state.isLoading = false;
      state.investment = action.payload;
    },
    getWithdrawalMethodSuccess(state, action) {
      state.isLoading = false;
      state.withdrawalMethod = action.payload;
    },
    requestWithdrawalSuccess(state, action) {
      state.isLoading = false;
      state.deposits = [...state.withdrawal, action.payload];
    },
    getWithdrawalSuccess(state, action) {
      state.isLoading = false;
      state.withdrawal = action.payload;
    }
  }
});

export default slice.reducer;

// -------------------------------------------------------------
// CUSTOMER ACTIONS
export function createInvestment(values, setSubmitting, navigate) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading);
    setSubmitting(true);
    try {
      const { data } = await api.newInvestment(values);
      dispatch(slice.actions.addInvestmentSuccess(data.investment));
      navigate(PATH_DASHBOARD.transaction);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };
}

// get all transaction by customer
export function getTransaction() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.fetchTransaction();
      dispatch(slice.actions.getTransactionSuccess(data.transactions));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// get all deposits by customer
export function getAllDeposits() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.getAllDeposits();
      dispatch(slice.actions.getDepositsSuccess(data.deposits));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// get all customer's investment
export function getAllInvestments() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.fetchInvestments();
      dispatch(slice.actions.getInvestmentsSuccess(data.investment));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getWithdrawalMethod() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.getWithdrawalMethod();
      dispatch(slice.actions.getWithdrawalMethodSuccess(response.data.withdrawalMethod));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

// request withdrawal by customer
export function requestWithdrawal(payload, setSubmitting, navigate) {
  setSubmitting(true);
  return async (dispatch) => {
    try {
      const response = api.requestWithdrawal(payload);
      dispatch(slice.actions.requestWithdrawalSuccess(response.data.withdrawal));
      setSubmitting(false);
      navigate(PATH_DASHBOARD.transaction);
    } catch (error) {
      dispatch(slice.actions.hasError());
      setSubmitting(false);
    }
  };
}

// get customers withdrawal
export function getWithdrawals() {
  return async (dispatch) => {
    try {
      const { data } = await api.getWithdrawals();
      dispatch(slice.actions.getWithdrawalSuccess(data.withdrawals));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

// withdrawal method
export function createWithdrawalMethod(payload) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.createWithdrawals(payload);
      dispatch(slice.actions.getWithdrawalMethodSuccess(response.data.withdrawalMethod));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

export const addDeposit = (payload) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const response = await api.deposit(payload);
    console.log(response);
    dispatch(slice.actions.addDeposit(response.data.deposits));
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------------------------------
// ADMIN ACTIONS
export function getStaticDeposits() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.getStaticDeposits();
      dispatch(slice.actions.getDepositsSuccess(data.deposits));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}
// get single admin customer deposit detail
export function getStaticDeposit(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.fetchDeposit(id);
      dispatch(slice.actions.getDepositSuccess(data.deposit));
    } catch (error) {
      console.log(error);
    }
  };
}
export const getStaticWithdrawals = () => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const { data } = await api.getStaticWithdrawal();

    dispatch(slice.actions.getWithdrawalSuccess(data.withdrawals));
  } catch (error) {
    console.log(error);
  }
};

export const getStaticInvestments = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const { data } = await api.getStaticInvestments();
    dispatch(slice.actions.getInvestmentsSuccess(data.investments));
  } catch (error) {
    console.log(error);
  }
};
// -----------------------------------
