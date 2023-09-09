import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../../Services/UserService";
import { useSelector } from "react-redux";
import RegisterForm from "../../Components/Forms/RegisterForm";
import { useForm } from "react-hook-form";
import ValidationPatters from "../../Base/ValidationPatters";
import strings from "../../localization";
import { login } from "../../Services/SecurityService";
import LoaderContext from "../../Context/LoaderContext";
import { Divider } from "@mui/material";

const formRules = {
  'name': { required: true },
  'surname': { required: true },
  'email': {required: { value: true, message: strings.forms.common.thisFieldIsRequired},
        pattern: { value: ValidationPatters.EMAIL, message: strings.forms.common.emailFormatError }},
  'username': { required: true },
  'password': { required: true }
}

const Register = () => {

  const navigate = useNavigate();
  const authUser = useSelector((state) => state.AuthReducer.authUser);
  const {setLoading} = useContext(LoaderContext)

  const form = useForm(); 
  const { data, handleSubmit, getValues, setValue, setError, formState: { errors } } = form;

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(!authUser.id){
        return;
    }
    navigate('/');
  });

  const onSubmit = (data) => {
    setLoading(true);
    registration(data).then(response => {
      
      if(response.status !== 200) {
        setLoading(false);
        return setErrorMessage(response?.data?.message)
      }
          
      login({username: data?.username, password: data?.password}).then((response) => {
        if(response?.data && response?.data?.token) {          
          localStorage.setItem("token", response.data.token);
        }
        navigate('/');
        window.location.reload(false);
      }).finally(() => setLoading(false));
    });
  };

  return (
    <div className="register-form" style={{marginTop: '20px'}}>
      <div className="register-form-container">

        <div style={{textAlign: 'center', fontSize: '24px'}}>{strings.pages.register.registration}</div>
        <Divider />

        <RegisterForm
          formRules={formRules}
          values={getValues()}
          setValue={setValue}
          errors={errors} data={data} form={form}
          onSubmit={handleSubmit(onSubmit)} />

        { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }

        <Link to={"/login"} className="link">
          {strings.pages.register.alreadyHaveAccount}
        </Link>
      </div>
    </div>
  );
};

export default Register;
