import React, { useState, useEffect } from "react";
import { Logout } from "../../auth/Logout/Logout";
import "./Profile.css";
import { ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { EditProduct } from "./Product/EditProduct";

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setNewFirstName(data.firstname);
        setNewLastName(data.lastname);
        setNewEmail(data.email);

        console.log('firstName lastName', data);
      });
  }, []);

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleEditEmail = () => {
    setEditingEmail(true);
  };

const handleSaveName = () => {
  const data = {
    firstname: newFirstName,
    lastname: newLastName,
  };

  fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/users/updateprofile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(updatedUser => {
      setUser(updatedUser);
      setEditingName(false);
      
      window.location.reload();

    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
};

const handleSaveEmail = () => {
  const data = {
    email: newEmail,
  };

  fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/users/update-email', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(updatedUser => {
      console.log('updateUser', updatedUser);
      console.log('SUCCESS:');
      
      setUser(updatedUser);
      setEditingEmail(false);

      // window.location.reload();

    })
    .catch(error => {
      console.error('Error updating email:', error);
      console.log(error);
    });
};


  return (
    <div className="container">
      <div className="list-group w-50">
        <h2>Account</h2>
        <div className="list-group-item d-flex align-items-center">
          <div className="col">
            Full Name: {editingName ? (
              <>
                <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
              </>
            ) : (
              <>
                {user.firstname} {user.lastname}
              </>
            )}
          </div>
          {editingName ? (
            <>
              <button type="button" className="btn btn-success mx-2" onClick={handleSaveName}>Save</button>
              <button type="button" className="btn btn-danger" onClick={() => setEditingName(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="btn btn-success" onClick={handleEditName}>Edit</button>
          )}
        </div>

        <div className="list-group-item d-flex align-items-center">
          <div className="col">
            Email: {editingEmail ? (
              <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            ) : (
              user.email
            )}
          </div>
          {editingEmail ? (
            <>
              <button type="button" className="btn btn-success mx-2" onClick={handleSaveEmail}>Save</button>
              <button type="button" className="btn btn-danger" onClick={() => setEditingEmail(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="btn btn-success" onClick={handleEditEmail}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};
