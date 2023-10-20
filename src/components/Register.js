import React from "react";
import AuthForm from "./AuthForm";
import * as MestoAuth from '../utils/MestoAuth';
import { Link, useNavigate } from "react-router-dom";

function Register ( {formValue, handleChange} ) {

   const navigate = useNavigate();

   const handleRegister = (e) => {
      e.preventDefault();

      const { password, email } = formValue;
      MestoAuth.register(password, email).then((res) => {
         navigate('/sign-in', {replace: true});
      })
   }


   return (
      <AuthForm
         title={'Регистрация'}
         buttonText={'Зарегистрироваться'}
         formValue={formValue}
         handleChange={handleChange}
         onSubmit={handleRegister}
      >
         <span className="auth__question">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></span>
      </AuthForm>
   )
}

export default Register;