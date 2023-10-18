import React from "react";

function AuthForm ({ title, buttonText, children }) {

   return (
      <section className="auth">
      <div className="auth__content">
      <h1 className="auth__title">{title}</h1>
         <form className="auth__form">
            <label>
               <input
                  name="email"
                  type="email"
                  className="auth__input" 
                  placeholder="Email"/>
            </label>
            <label>
            <input
               name="password"
               type="password"
               className="auth__input" 
               placeholder="Пароль"/>
            </label>
            <button
               type="submit"
               className="auth__button"
               >
                  {buttonText}
            </button>
            {children}
         </form>
      </div>
      </section>
   )
}

export default AuthForm;