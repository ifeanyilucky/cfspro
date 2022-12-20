import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../utils/axios';

const initialState = {
  investments: [],
  investment: null,
  deposits: [],
  deposit: null,
  withdrawalMethod: null,
  withdrawal: [],
  isLoading: false,
  error: false
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

    getDepositsSuccess(state, action) {
      state.isLoading = false;
      state.deposits = action.payload;
    },
    getDepositSuccess(state, action) {
      state.isLoading = false;
      state.deposit = action.payload;
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

// get all deposits by customer
export function getAllDeposits() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await api.getAllDeposits();
      dispatch(slice.actions.getDepositsSuccess(data.deposits));
    } catch (error) {
      dispatch(slice.actions.hasError());
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
export function requestWithdrawal(payload) {
  return async (dispatch) => {
    try {
      const response = api.requestWithdrawal(payload);
      dispatch(slice.actions.requestWithdrawalSuccess(response.data.withdrawal));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };
}

// get customers withdrawal
export function getWithdrawals() {
  return async (dispatch) => {
    try {
      const response = api.getWithdrawals();
      dispatch(slice.actions.getWithdrawalSuccess(response.data.withdrawals));
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

export const getStaticWithdrawals = (payload) => async (dispatch) => {
  dispatch(slice.actions.startLoading);
  try {
    const { data } = await api.deposit(payload);

    dispatch(slice.actions.addDeposit(data.deposits));
  } catch (error) {
    console.log(error);
  }
};
