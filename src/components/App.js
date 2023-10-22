import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ConfirmationPopup from './ConfirmationPopup';
import avatar from '../images/avatar.png';
import union from '../images/Union.png';
import unionErr from '../images/UnionErr.png';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as MestoAuth from '../utils/MestoAuth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState({
    isOpen: false,
    card: {}
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [submitButtonState, setSubmitButtonState] = useState('');

  const [currentUser, setcurrentUser] = useState({
    "name": 'Жак-Ив Кусто',
    "about": 'Исследователь океана',
    "avatar": avatar
  });

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [isAuthComplete, setIsAuthComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api.getUserData()
      .then((currentUser) => {
        setcurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(err);
      })
  
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })

    tokenCheck();
  }, [])

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      MestoAuth.checkToken(token)
        .then((res) => {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate('/', {replace: true});
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const signOut = () => {
    localStorage.removeItem('token');
    handleLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  const goToRegistration = () => {
    navigate('/sign-up', {replace: false})
    setFormValue({email: '', password: ''});
  }

  const goToLogin = () => {
      navigate('/sign-in', {replace: false})
      setFormValue({email: '', password: ''});
  }

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
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  useEffect(()=>{
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen.isOpen || selectedCard || isInfoTooltipOpen){
      document.addEventListener('keydown', closeByEsc);
    }else{
      document.removeEventListener('keydown', closeByEsc);
    }    
  },[isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isConfirmationPopupOpen.isOpen, selectedCard, closeByEsc, isInfoTooltipOpen]);

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

  function handleLoggedIn (isLogged) {
    setLoggedIn(isLogged);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          userEmail={email}
          signOut={signOut}
          loggedIn={loggedIn}
          goToRegistration={goToRegistration}
          goToLogin={goToLogin}
        />
        <Routes>
          <Route path='/mesto-react' element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-up" replace />} />
          <Route 
            path='/' 
            element={
              <ProtectedRouteElement
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                userName={currentUser.name}
                userDescription={currentUser.about} 
                userAvatar={currentUser.avatar}
                cards={cards}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleDeleteClick={handleDeleteClick}
                loggedIn={loggedIn}
                element={Main}
              />}
            />
          <Route 
            path='/sign-up' 
            element={<Register
            formValue={formValue}
            handleChange={handleChange}
            setIsAuthComplete={setIsAuthComplete}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen}
            setFormValue={setFormValue}
            setEmail={setEmail}
          />} />
          <Route 
            path='/sign-in' 
            element={<Login
            formValue={formValue}
            setFormValue={setFormValue}
            handleChange={handleChange}
            handleLoggedIn={handleLoggedIn}
            setEmail={setEmail}
            setIsAuthComplete={setIsAuthComplete}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen}
            />} />
          <Route path='*' element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />} />
        </Routes>
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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          union={union}
          unionErr={unionErr}
          isAuthComplete={isAuthComplete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
