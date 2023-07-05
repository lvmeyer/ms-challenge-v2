import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useLoginMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';
import { toast } from 'react-toastify';
import "./Login.css";

export const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
  
    try {
      // const res = await fetch('/api/v1/auth/login', {
      //   mode: 'cors',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const res = await login({ email, password }).unwrap();
      
      dispatch(setCredentials({ ...res }));
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmitLogin}
      className="login-body">
        
        <div className="email-container">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email Address"
            type="email"
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              value={password}
              required					
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              type={hidePassword ? "password" : "text"}
            />
            {!hidePassword ? (
              <BsEye
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            ) : (
              <BsEyeSlash
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            )}
          </div>
        </div>

        <div className="remember-me-container">
          <div>
            <input name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Keep me signed in</label>
          </div>
				{isLoading && <h2>Loading...</h2>}
        </div>

        <div className="login-btn-container">
          <input value="Login" type="submit" />
        </div>

        <Link className="new-account" to="/signup">
          Create a new account?
        </Link>
      </form>
    </div>
  );
};
