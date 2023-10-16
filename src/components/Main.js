import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({onEditProfile, onAddPlace, onEditAvatar, children}) {

   const currentUser = React.useContext(CurrentUserContext);

   return (
      <main>
         <section className="profile">
            <div className="profile__content">
               <img 
               src={currentUser.avatar} 
               alt={currentUser.name} 
               className="profile__avatar" />
               <button 
                  type="button" 
                  className="profile__edit-avatar-button" 
                  onClick={onEditAvatar}
               />
               <div className="profile__info">
                  <div className="profile__wrapper">
                     <h1 className="profile__name">{currentUser.name}</h1>
                     <button 
                        type="button" 
                        aria-label="редактировать профиль" 
                        className="profile__edit-button link" 
                        onClick={onEditProfile} 
                     />
                  </div>
                  <p className="profile__description">{currentUser.about}</p>
               </div>
            </div>
            <button 
               type="button" 
               aria-label="добавить карточку" 
               className="profile__add-button link" 
               onClick={onAddPlace}
            />
         </section>
         <section className="elements">
            {children}
         </section>
      </main>
   )
}

export default Main;