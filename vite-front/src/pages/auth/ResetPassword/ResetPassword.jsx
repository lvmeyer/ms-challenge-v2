import { Link } from 'react-router-dom';
import { BsEyeSlash } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-hot-toast';



export const ResetPassword = () => {

    const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/v1/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        await sendResetEmail(email);
        toast.success('Password reset email sent. Please check your inbox.');
      } else {
        toast.error('Failed to send reset email.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An error occurred while resetting password.');
    }
  
    setIsLoading(false);
  };
  

  const sendResetEmail = async (email) => {
    const templateParams = {
      to_email: email,
      message: 'Click the link to reset your password.', // Customize your email message here
      to_name: 'User',
    };

    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        templateParams,
        'your_user_id'
      );
    } catch (error) {
      console.error('Error sending reset email:', error);
      throw new Error('Failed to send reset email.');
    }
  };

  return (
    <div className="vh-100">
        <div className="login-container">
            <h2>Reset Password</h2>
            <p>Enter your email to receive a password reset link.</p>
            <div className="email-container mb-4">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button onClick={handleResetPassword} disabled={isLoading}>
                Reset Password
            </button>
        </div>
    </div>
  );
};

