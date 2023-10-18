import React from "react";
import AuthForm from "./AuthForm";

function Register () {
   
   return (
      <AuthForm
         title={'Регистрация'}
         buttonText={'Зарегистрироваться'}
      >
         <span className="auth__question">Уже зарегистрированы? <a href='#' className="auth__link">Войти</a></span>
      </AuthForm>
   )
}

export default Register;