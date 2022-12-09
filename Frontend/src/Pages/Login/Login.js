import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Services/UserService";
import jwt from 'jwt-decode'
import { getCurrentUser } from "../../Services/UserService";
import '../../index.css'

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(!getCurrentUser()){
        return;
    }
    navigate('/');
  });

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const checkFormIsValid = () => {
    if(username && password) {
      return true;
    }
    setErrorMessage("All form fields must be filled out!");
    return false;
  }

  const loginHandler = async (event) => {
    event.preventDefault();
    if(checkFormIsValid()) {
      const data = { username, password };

      const user = await login(data);

      if(!user.token){
        return setErrorMessage("Wrong username or password!");
      }

      localStorage.setItem("user", JSON.stringify(jwt(user.token)));
      navigate('/');
      window.location.reload(false);
    }
  };

  return (
    <form className="login-form" onSubmit={loginHandler}>
      <h2>Login</h2>
      <hr />
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          required
          onChange={usernameChangeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          required
          onChange={passwordChangeHandler}
        />
      </div>
      { errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-container">
        <input type="submit" />
      </div>
      <Link to={"/registration"} className="link">
        Create a new account
      </Link>
    </form>
  );
};

export default Login;
