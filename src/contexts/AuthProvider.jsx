import { createContext, useState, useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  const register = async ({ name, email, password }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_ROOT}/v1/auth/register`, {
      name,
      email,
      password,
    });
    setUser(response.data.user);
    setIsAuthenticated(true);
    setToken(response.data.tokens.access);
    sessionStorage.setItem('auth', JSON.stringify(true));
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('token', JSON.stringify(response.data.tokens.access));
  };

  const signIn = async ({ email, password }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_ROOT}/v1/auth/login`, {
      email,
      password,
    });

    setUser(response.data.user);
    setIsAuthenticated(true);
    setToken(response.data.tokens.access);
    sessionStorage.setItem('auth', JSON.stringify(true));
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('token', JSON.stringify(response.data.tokens.access));
  };

  const onSuccess = async ({ code }) => {
    const tokens = await axios.post(`${import.meta.env.VITE_API_ROOT}/v1/auth/google`, {
      code,
    });

    setUser(tokens.data.user);
    setIsAuthenticated(true);
    setToken(tokens.data.token.access);
    sessionStorage.setItem('auth', JSON.stringify(true));
    sessionStorage.setItem('user', JSON.stringify(tokens.data.user));
    sessionStorage.setItem('token', JSON.stringify(tokens.data.token.access));
  };

  const onFailure = (res) => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth');
  };

  const login = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    // clientId: '411973116754-0r47rdg5s8fmpn6ldpkis8o89a8uktes.apps.googleusercontent.com',
    isSignedIn: true,
    flow: 'auth-code',
  });

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  useEffect(() => {
    // Check if user is authenticated on page refresh
    const savedAuth = JSON.parse(sessionStorage.getItem('auth'));
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    const savedToken = JSON.parse(sessionStorage.getItem('token'));
    setIsAuthenticated(savedAuth);
    setToken(savedToken);
    setUser(savedUser || {});
  }, []);

  const getAccessToken = () => {
    return token;
  };

  const AuthenticatedFetch = async (method, url, data) => {
    const res = await axios(`${import.meta.env.VITE_API_ROOT}${url}`, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token.token}`,
      },
      data,
    });
    return res;
  };

  const UnauthenticatedFetch = async (method, url, data) => {
    const res = await axios(`${import.meta.env.VITE_API_ROOT}${url}`, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      data,
    });
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        user,
        login,
        register,
        signIn,
        getAccessToken,
        AuthenticatedFetch,
        UnauthenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export const useAuth = () => useContext(AuthContext);
