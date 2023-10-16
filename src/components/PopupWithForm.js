import React from "react";

function PopupWithForm({ name, title, isOpen, children, onClose, onSubmit, isFormInvalid, buttonText }) {

   return (
      <aside 
         className={isOpen ? `popup popup_type_${name} popup_opend` : `popup popup_type_${name}`} 
         onClick={onClose}>
         <div className="popup__container" onClick={(e => e.stopPropagation())}>
            <button 
               type="button" 
               aria-label="закрыть" 
               className="popup__close-button popup__close-button_type_profile" 
               onClick={onClose} />
            <h3 className="popup__title">{title}</h3>
            <form 
               name={name} 
               className="popup__form popup__form_type_delete"
               onSubmit={onSubmit}
            >
               {children}
               <button 
                  disabled={!isFormInvalid} 
                  className={isFormInvalid ? `popup__save-button popup__submit-button` : `popup__save-button popup__save-button_disabled`} 
                  type="submit"
                  onSubmit={onSubmit}
               >
                  {buttonText}
               </button>
            </form>
         </div>
      </aside>
   )
}

export default PopupWithForm;