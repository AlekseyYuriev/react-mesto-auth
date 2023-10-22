import React from "react";

function InfoTooltip ({ isOpen, onClose, union, unionErr, isAuthComplete }) {
   return (
      <aside 
         className={isOpen ? `popup popup_type_info popup_opend` : `popup popup_type_info`} 
         onClick={onClose}>
         <div className="popup__container popup__container_type_info" onClick={(e => e.stopPropagation())}>
            <button 
               type="button" 
               aria-label="закрыть" 
               className="popup__close-button popup__close-button_type_profile" 
               onClick={onClose} />
            <img 
               src={isAuthComplete ? union : unionErr} 
               alt={isAuthComplete ? 'галочка' : 'крестик'}
               className="popup__image popup__image_type_info" />
            <h3 className="popup__title popup__title_type_info">{isAuthComplete ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
         </div>
      </aside>
   )
}

export default InfoTooltip;