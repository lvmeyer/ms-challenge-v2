import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Login.css';


export const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { resetToken } = useParams();



  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (password.length < 4 || confirmPassword.length < 4) {
      setError("At least 4 caracteres.");
      setMessage('');
    } else if (password !== confirmPassword) {
      setError("Passwords does not match.");
      setMessage('');
    } else {
      try {
        const response = await fetch(import.meta.env.VITE_GW_HOSTNAME + `/api/v1/reset-password-form/${resetToken}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, resetToken }),
        });
  
        if (response.ok) {
          setMessage("Success.");
          setError('');
        
        } else {
          setError("Échec de la réinitialisation du mot de passe.");
          setMessage('');
        }
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        setError("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
        setMessage('');
      }
    }
  };
  

  return (
    <div className="vh-100">
      <div className="login-container">
        <h2>Reset your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="password-container mb-4">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="password-container mb-4">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {error && <div className="error">{error}</div>}
          {message && <div className="message">{message}</div>}
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};
