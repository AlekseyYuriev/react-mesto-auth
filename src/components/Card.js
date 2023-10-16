import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onDeleteClick}) {

   const currentUser = React.useContext(CurrentUserContext);
   const isOwn = card.owner._id === currentUser._id
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = ( 
      `element__like-button ${isLiked && 'element__like-button_active'}` 
   );

   function handleClick() {
      onCardClick(card);
   }

   function handleLikeClick() {
      onCardLike(card);
   }

   function handleDeleteClick() {
      onDeleteClick(card);
   }

   return (
      <div className="element">
         {isOwn && <button 
            type="reset" 
            aria-label="удалить карточку" 
            className="element__delete-button"
            onClick={handleDeleteClick}
         />}
         <img 
            src={card.link} 
            alt={card.name} 
            className="element__image"
            onClick={handleClick}
            />
         <div className="element__group">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__counter">
               <button 
                  type="button" 
                  aria-label="лайкнуть карточку" 
                  className={cardLikeButtonClassName}
                  onClick={handleLikeClick}
                  />
               <p className="element__like-number">{card.likes.length}</p>
            </div>
         </div>
      </div>
   )
}

export default Card;