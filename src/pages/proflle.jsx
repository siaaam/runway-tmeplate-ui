import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ marginTop: '70px' }}>
      <div className="container d-flex flex-column ">
        <h2>Hey There!</h2>
        <p>Name : {user.username} </p>
        <p>Email : {user.email} </p>
      </div>
    </div>
  );
};

export default Profile;
