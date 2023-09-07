import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleResetPassword = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/reset-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.resetToken) {
          setResetToken(result.resetToken);
          await sendResetEmail(email, result.resetToken);
          toast.success('Password reset email sent. Please check your inbox.');
        } else {
          toast.error('User does not have a resetToken.');
        }
      } else {
        toast.error('Failed to send reset email.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An error occurred while resetting password.');
    }

    setIsLoading(false);
  };

  const sendResetEmail = async (email, resetToken) => {
    const templateParams = {
      to_email: email,
      message: 'Click the link to reset your password.',
      lien: `http://localhost/resetPasswordForm/${resetToken}`,
    };

    try {
      await emailjs.send(
        'service_yt1fbg8',
        'template_qky9zqn',
        templateParams,
        'mig4vOijtEYmzZkvj'
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
