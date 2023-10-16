import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function ConfirmationPopup ({ isOpen, onClose, onCardDelete, card, buttonState }) {

   const handleSubmit = (e) => {
      e.preventDefault();
      onCardDelete(card);
   }

   let isValid = true;

   return(
      <PopupWithForm
         isOpen={isOpen}
         onClose={onClose}
         name={"confirm"}
         title={"Вы уверены?"}
         onSubmit={handleSubmit}
         isFormInvalid={isValid}
         buttonText={buttonState}
      />
   )
}

export default ConfirmationPopup;