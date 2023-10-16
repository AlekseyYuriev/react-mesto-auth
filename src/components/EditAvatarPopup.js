import { useEffect, useRef } from 'react';
import PopupWithForm from "../components/PopupWithForm";
import { useForm } from "react-hook-form";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonState}) {

   useEffect(() => {
      if(!isOpen) {
         errors.link = '';
         reset();
      } else {
         reset();
      }
   }, [isOpen]);

   const avatarInfo = useRef();

   const {
      register, 
      handleSubmit, 
      formState: { errors, isValid }, 
      reset,
   } = useForm({mode: 'onBlur'});

   const textRegister = register('link', {
      required: {
         value: true,
         message: "Поле обязательно для заполнения",
      },
      pattern: {
         value: /^(https:|http:|www\.)\S*/gm,
         message: "Введите URL",
      },
   })

   const onSubmit = (data) => {

      onUpdateAvatar({
         link: data.link
      });
   } 

   return(
      <PopupWithForm
         name={"avatar"}
         title={"Обновить аватар"}
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit(onSubmit)}
         isFormInvalid={isValid}
         buttonText={buttonState}
      >
         <label className="popup__field">
            <input 
               ref={avatarInfo} 
               id="link-avatar" 
               className="popup__input popup__input_type_link" 
               placeholder="Ссылка на картинку аватара" 
               {...textRegister}
            />
            <div className="name-input-error popup__input-error">
               {errors.link && <span>{errors.link.message}</span>}
            </div>
         </label>
      </PopupWithForm>
   )
}

export default EditAvatarPopup;