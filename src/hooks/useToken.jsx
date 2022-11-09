import { useEffect, useState } from 'react';

const useToken = () => {
  // console.log(newLogin);

  const [token, setToken] = useState(null);
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const getTokenFromLS = () => {
    const token = localStorage.getItem('auth-token');

    setToken(token);
    setTokenLoaded(true);
  };

  useEffect(() => {
    getTokenFromLS();
  }, []);

  return { token, tokenLoaded };
};

export default useToken;
