import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registration, login } from "../../Services/UserService";
import jwt from 'jwt-decode'
import '../../index.css'
import { getCurrentUser } from "../../Services/UserService";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(!getCurrentUser()){
        return;
    }
    navigate('/');
  });

  const checkFormIsValid = () => {
    if(name && surname && email && username && password) {
      return checkEmailIsValid() ? true : false;
    }
    setErrorMessage("All form fields must be filled out!");
    return false;
  }

  const checkEmailIsValid = () => {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(email.match(pattern)){
      setErrorMessage('');
      return true;
    }
    setErrorMessage("E-Mail is not valid!")
    return false;
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const surnameChangeHandler = (event) => {
    setSurname(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    if(checkFormIsValid()) {

      const data = { name, surname, email, username, password };

      const result = await registration(data);
      if(result.status !== 200) {
        return await result.json().then((result) => setErrorMessage(result.message))
      }
      
      await login({username, password})
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(jwt(user.token)));
          navigate('/');
          window.location.reload(false);
        });
    }
  };

  return (
    <form className="login-form" onSubmit={registerHandler}>
      <h2>Registration</h2>
      <hr />
      <div className="input-container">
        <label htmlFor="name">Name</label>
        <input name="name" type="text" required onChange={nameChangeHandler} />

        <label htmlFor="surname">Surname</label>
        <input
          name="surname"
          type="text"
          required
          onChange={surnameChangeHandler}
        />

        <label htmlFor="e-mail">E-Mail</label>
        <input
          name="e-mai"
          type="text"
          required
          onChange={emailChangeHandler}
        />

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
      <Link to={"/login"} className="link">
        Already have an account?
      </Link>
    </form>
  );
};

export default Register;
