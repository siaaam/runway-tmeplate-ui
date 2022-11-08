import { createContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, tokenLoaded } = useToken();

  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { id, email, username } = res.data;
      setUser({ id, email, username });
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (tokenLoaded) {
      loadUser();
    }
  }, [token, tokenLoaded]);

  const saveAuthInfo = (userinfo) => {
    const jwt = userinfo.jwt;
    const userDetails = userinfo.user;
    localStorage.setItem('auth-token', jwt);
    const { id, username, email } = userDetails;

    setUser({
      id,
      username,
      email,
    });
  };

  const removeToken = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value = { saveAuthInfo, user, removeToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
