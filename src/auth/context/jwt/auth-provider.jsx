import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && isValidToken(accessToken)) {
        const token = {
          accessToken,
          refreshToken,
        };
        setSession(token);

        // const response = await axios.get(endpoints.auth.me);

        // // const user = response.data.result;
        // if (user.role.id !== 1) {
        //   await axios.post(endpoints.auth.signOut);
        //   setSession(null);
        //   router.replace(paths.auth.google.signIn);
        // }
        // dispatch({
        //   type: 'INITIAL',
        //   payload: {
        //     user: {
        //       ...user,
        //     },
        //   },
        // });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post(endpoints.auth.signIn, data);

    const { token, user } = response.data.result;

    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post(endpoints.auth.signOut);
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
