import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { useSnackbar } from 'notistack';
import { MIconButton } from '../components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import jwtDecode from 'jwt-decode';
import { PATH_DASHBOARD, PATH_ADMIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const { userId } = jwtDecode(accessToken);

          const response = await axios.get(`/account/${userId}`);
          const { user } = response.data;
          console.log(user);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload) => {
    const { data } = await axios.post('/login', payload);

    const { token, user } = data;

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
    if (user.role === 'admin') {
      navigate(PATH_ADMIN.overview, { replace: true });
    }
  };

  const register = async (payload) => {
    const response = await axios.post('/register/', { ...payload });
    const { token, user } = response.data;

    window.localStorage.setItem('accessToken', token);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = async (payload) => {
    const response = await axios.patch('/account/update', payload);
    const { user } = response.data;
    dispatch({
      type: 'UPDATE',
      payload: user
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
