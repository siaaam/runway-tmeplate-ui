import { createContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [newLogin, setNewLogin] = useState(false);

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const { token, tokenLoaded } = useToken();

  const loadUser = async () => {
    try {
      const res = await axios.get(
        'http://localhost:1337/api/users/me?populate=blogs',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { id, email, username, blogs } = res.data;
      setUser({ id, email, username, blogs });
      // setNewLogin(true);
      setUserLoaded(true);
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

    // setNewLogin(true);
  };

  const removeToken = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
    // setNewLogin(false);
  };

  const value = { saveAuthInfo, user, removeToken, userLoaded };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
