import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import emailjs from '@emailjs/browser'

export const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);

  const navigate = useNavigate();

  const [signupCredential, setSignupCredential] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  });

  const registerUser = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_GW_HOSTNAME+"/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupCredential),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Traitez la réponse du serveur ici
        handleSubmitMail(data.email);
      } else {

        console.error("Échec de la demande de registre");
      }
    } catch (error) {
      console.error("Erreur lors de la demande de registre:", error);
    }
  };

  const signupHandler = async () => {
    setSignUpLoading(true);
    try {
      // Effectuer la demande de registre
      await registerUser();
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error occurred while registering");
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleSubmitMail = (email) => {

    const content = "Hello, thank you for your registration ! You can now log in to your account.";

    const templateParams = {
      to_email: email,
      message: content,
      to_name: "Pierre"
    };

    emailjs.send("service_yt1fbg8", "template_lrt115o", templateParams, "mig4vOijtEYmzZkvj")
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
  }

  return (
    <div className="vh-100">
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupHandler();
        }}
        className="signup-body"
      >
        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input
            required
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Enter Email"
            type="email"
          />
        </div>

        <div className="password-container">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <input
              required
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  password: e.target.value,
                })
              }
              id="password"
              minLength="8"
              placeholder="Enter Password"
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

        <div className="confirm-password-container">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="input-container">
            <input
              required
              id="confirm-password"
              onChange={(e) =>
                setSignupCredential({
                  ...signupCredential,
                  confirmPassword: e.target.value,
                })
              }
              minLength="8"
              placeholder="Enter Password Again"
              type={hidePassword ? "password" : "text"}
            />
            {!hidePassword ? (
              <BsEye
                className="hide-show-password-eye"
                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
              />
            ) : (
              <BsEyeSlash
                className="hide-show-password-eye"
                onClick={() => setHidePassword(!hidePassword)}
              />
            )}
          </div>
        </div>

        <div className="name-container">
          <label htmlFor="first-name">First Name</label>
          <input
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                firstname: e.target.value,
              })
            }
            id="first-name"
            placeholder="Enter First Name"
            type="text"
          />
        </div>

        <div className="name-container">
          <label htmlFor="last-name">Last Name</label>
          <input
            onChange={(e) =>
              setSignupCredential({
                ...signupCredential,
                lastname: e.target.value,
              })
            }
            id="last-name"
            placeholder="Enter Last Name"
            type="text"
          />
        </div>

        <div className="remember-me-container">
          <div>
            <input required name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">
              I accept all terms and conditions
            </label>
          </div>
        </div>

        <div className="signup-btn-container">
          <input value="Sign Up" type="submit" />
        </div>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
    </div>
  );
};

