import React, { useEffect, useState } from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonState }) {

   const currentUser = React.useContext(CurrentUserContext);

   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [nameDirty, setNameDirty] = useState(false);
   const [descriptionDirty, setDescriptionDirty] = useState(false);
   const [nameError, setNameError] = useState('Укажите имя пользователя');
   const [descriptionError, setDescriptionError] = useState('Укажите описание пользователя');
   const [formValid, setFormValid] = useState(true);

   const blurHandler = (e) => {
      switch (e.target.name) {
         case 'name':
            setNameDirty(true)
            break
         case 'about':
            setDescriptionDirty(true)
            break
      }
   }

   useEffect(() => {
      if(isOpen) {
         setName(currentUser.name);
         setDescription(currentUser.about);

      } else {
         setName('');
         setDescription('');
         setNameError('');
         setDescriptionError('');
      }
   }, [currentUser, isOpen]);

   useEffect(() => {
      if(nameError || descriptionError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [nameError, descriptionError])

   const handleNameChange = (e) => {
      setName(e.target.value);
      if(e.target.value.length < 2 || e.target.value.length > 40) {
         setNameError('Имя пользователя должно быть длиннее 2 и короче 40 символов')
         if(!e.target.value) {
            setNameError('Укажите имя пользователя')
         }
      } else {
         setNameError('')
      }
   }

   const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
      if(e.target.value.length < 2 || e.target.value.length > 200) {
         setDescriptionError('Описание профиля должно быть длиннее 2 и короче 200 символов')
         if(!e.target.value) {
            setDescriptionError('Укажите описание профиля')
         }
      } else {
         setDescriptionError('')
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
   
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
         name,
         about: description,
      });
   }

   return(
      <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormInvalid={formValid}
      buttonText={buttonState}
      >
         <label className="popup__field">
            <input 
            id="name-input" 
            name="name" 
            type="text" 
            placeholder="Имя" 
            className="popup__input popup__input_type_name" 
            value={name}
            onBlur={e => blurHandler(e)}
            onChange={e => handleNameChange(e)} />
            <div className="name-input-error popup__input-error">
               {(nameDirty && nameError) && <span>{nameError}</span>}
            </div>
            
         </label>
         <label className="popup__field">
            <input 
            id="about-input" 
            name="about" 
            type="text" 
            placeholder="О себе" 
            className="popup__input popup__input_type_description" 
            value={description}
            onBlur={e => blurHandler(e)}
            onChange={e => handleDescriptionChange(e)} />
            <div className="name-input-error popup__input-error">
               {(descriptionDirty && descriptionError) && <span>{descriptionError}</span>}
            </div>
         </label>
      </PopupWithForm>
   )
}

export default EditProfilePopup;