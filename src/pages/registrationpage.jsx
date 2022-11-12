import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { axiosInstance } from '../utils/axiosAPI';

const schema = yup
  .object({
    username: yup.string().required('username is required'),
    email: yup
      .string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

const Registration = () => {
  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { username, password, email } = data;

    try {
      const res = await axiosInstance.post('auth/local/register', {
        username,
        email,
        password,
      });
      saveAuthInfo(res.data);
      navigate('/blog');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <div className="container d-flex flex-column" style={{ width: '400px' }}>
      <h2 style={{ margin: ' 100px auto 0 auto' }}>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column">
          <label htmlFor="username">Username</label>
          <input {...register('username')} />
        </div>
        <p className="text-danger">{errors.username?.message}</p>

        <div className="d-flex flex-column">
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <p className="text-danger">{errors.email?.message}</p>
        <div className="d-flex flex-column">
          <label>Password</label>
          <input {...register('password')} />
        </div>
        <p className="text-danger">{errors.password?.message}</p>
        <div className="d-flex flex-column mb-3">
          <label>Confirm Password</label>
          <input {...register('confirmPassword')} />
        </div>
        <p className="text-danger">{errors.confirmPassword?.message}</p>

        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
