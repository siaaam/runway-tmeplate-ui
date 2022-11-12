import axios from 'axios';

export const axiosPrivateInstance = (token) =>
  axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
