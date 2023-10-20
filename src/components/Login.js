import React from "react";
import AuthForm from "./AuthForm";
import * as MestoAuth from '../utils/MestoAuth';
import { useNavigate } from "react-router-dom";

function Login ( {formValue, handleChange, setFormValue, handleLoggedIn} ) {

   const navigate = useNavigate();

   const handleLogin = (e) => {
      e.preventDefault();
      if (!formValue.email || !formValue.password) {
         return
      }
      MestoAuth.login(formValue.email, formValue.password)
         .then((data) => {
            if (data.token){
               setFormValue({email: '', password: ''});
               handleLoggedIn();
               navigate('/', {replace: true});
            }
         })
         .catch(err => console.log(err))
   }

   return (
      <AuthForm
         title={'Вход'}
         buttonText={'Войти'}
         formValue={formValue}
         handleChange={handleChange}
         onSubmit={handleLogin}
      />
   )
}

export default Login;