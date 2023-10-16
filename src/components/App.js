import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/Api';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ConfirmationPopup from './ConfirmationPopup';
import avatar from '../images/avatar.png';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState({
    isOpen: false,
    card: {}
  });
  const [submitButtonState, setSubmitButtonState] = useState('');

  const [currentUser, setcurrentUser] = useState({
    "name": 'Жак-Ив Кусто',
    "about": 'Исследователь океана',
    "avatar": avatar
  });

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setSubmitButtonState('Сохранить');
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setSubmitButtonState('Сохранить');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setSubmitButtonState('Сохранить');
  }

  function handleDeleteClick(card) {
    setIsConfirmationPopupOpen({
      isOpen: true,
      card: card
    });
    setSubmitButtonState('Да');
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);  
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  }

  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  useEffect(()=>{
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen.isOpen || selectedCard){
      document.addEventListener('keydown', closeByEsc);
    }else{
      document.removeEventListener('keydown', closeByEsc);
    }    
  },[isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isConfirmationPopupOpen.isOpen, selectedCard, closeByEsc]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Проверяем, ставили ли мы лайк на карточку, отправляем запрос в API и получаем обновлённые данные карточки
    if(isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

function handleCardDelete(card) {
  setSubmitButtonState('Удаление...');
  api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonState('Да');
    })
}

  useEffect(() => {
    api.getUserData()
      .then((currentUser) => {
        setcurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleUpdateUser = (userInfo) => {
    setSubmitButtonState('Сохранение...');
    api.setUserData(userInfo)
      .then((newUserInfo) => {
        setcurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitButtonState('Сохранить');
      })
  }

  const handleUpdateAvatar = (avatarLink) => {
    setSubmitButtonState('Сохранение...');
    api.updateAvatar(avatarLink)
      .then((newAvatar) => {
        setcurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitButtonState('Сохранить');
      })
  }
  
  const handleAddPlaceSubmit = (cardInfo) => {
    setSubmitButtonState('Добавление карточки...');
    api.createNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitButtonState('Сохранить');
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          userName={currentUser.name}
          userDescription={currentUser.about} 
          userAvatar={currentUser.avatar} >
            {cards.map((item) => (
              <Card
                key={item._id}
                card={item}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </Main>
        <Footer />
        <ImagePopup
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          buttonState={submitButtonState} 
        /> 
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          buttonState={submitButtonState} 
        />
        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen.isOpen}
          card={isConfirmationPopupOpen.card} 
          onClose={closeAllPopups} 
          onCardDelete={handleCardDelete}
          buttonState={submitButtonState}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          buttonState={submitButtonState} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
