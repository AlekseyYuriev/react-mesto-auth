import React from "react";
import headerLogo from "../images/logo.svg"

function Header({ userEmail, signOut, loggedIn, goToLogin, goToRegistration }) {
   return (
      <header className="header">
         <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
         <div className="header__content">
            {loggedIn && <p className="header__email">{userEmail}</p>}
            <button 
               className="header__logout"
               onClick={
                  loggedIn ? signOut : (window.location.href.endsWith('sign-in') ? goToRegistration : goToLogin)
               }>
               {loggedIn ? 'Выйти' : (window.location.href.endsWith('sign-in') ? 'Регистрация' : 'Войти')}
            </button>
         </div>
      </header>
   )
}

export default Header;