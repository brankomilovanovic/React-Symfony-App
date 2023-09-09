import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Services/SecurityService";
import LoginForm from "../../Components/Forms/LoginForm";
import { useForm } from "react-hook-form";
import { getCurrentUser, getUser } from "../../Services/UserService";
import { setUser } from "../../Actions/AuthActions";
import LoaderContext from "../../Context/LoaderContext";
import strings from "../../localization";
import { Divider } from "@mui/material";

const formRules = {
  'username': { required: true },
  'password': { required: true }
}

const Login = () => {

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.AuthReducer.authUser);
  const dispatch = useDispatch();
  const {setLoading} = useContext(LoaderContext)

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm(); 
  const { data, handleSubmit, getValues, setValue, setError, formState: { errors } } = form;

  useEffect(() => {
    if(!authUser.id){
        return;
    }
    navigate('/');
  });

  const onSubmit = (data) => {
   setLoading(true);
   login(data).then((response) => {

      if(!response?.data || !response.data.token) {
        setLoading(false);
        return setErrorMessage(strings.pages.login.wrongUsernameOrPassword);
      }

      localStorage.setItem("token", response.data.token);
      
      getCurrentUser({extend: true}).then((response) => {
        dispatch(setUser(response.data))
        navigate('/');
      }).finally(() => setLoading(false));
    });
  }

  return (
    <div className="login-form">
      <div className="login-form-container">

        <div style={{textAlign: 'center', fontSize: '24px'}}>{strings.forms.common.login}</div>
        <Divider />

        <LoginForm
          formRules={formRules}
          values={getValues()}
          setValue={setValue}
          errors={errors} data={data} form={form}
          onSubmit={handleSubmit(onSubmit)} />

        { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }

        <Link to={"/registration"} className="link">
          {strings.pages.login.createNewAccount}
        </Link>
      </div>
    </div>
  );
};

export default Login;
