import React from "react";

function AuthForm ({ title, buttonText, children, formValue, handleChange, onSubmit }) {

   return (
      <section className="auth">
      <div className="auth__content">
      <h1 className="auth__title">{title}</h1>
         <form 
            className="auth__form"
            onSubmit={onSubmit}
         >
            <label>
               <input
                  name="email"
                  type="email"
                  required
                  value={formValue.email}
                  className="auth__input" 
                  placeholder="Email"
                  onChange={handleChange}
               />
            </label>
            <label>
            <input
               name="password"
               type="password"
               required
               value={formValue.password}
               className="auth__input" 
               placeholder="Пароль"
               onChange={handleChange}
            />
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