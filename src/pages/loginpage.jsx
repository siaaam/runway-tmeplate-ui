import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      });
      const info = res.data;
      saveAuthInfo(info);
      setUser({
        id: info.user.id,
        email: info.user.id,
        password: info.user.id,
      });
      navigate('/blog');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <div
      name="signin"
      className="container d-flex flex-column"
      style={{ width: '400px' }}
    >
      <h2 style={{ margin: ' 100px auto 0 auto' }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column">
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <p className="text-danger">{errors.email?.message}</p>
        <div className="d-flex flex-column mb-3">
          <label>Password</label>
          <input {...register('password')} />
        </div>
        <p className="text-danger">{errors.password?.message}</p>
        <button className="btn btn-secondary" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Login;
