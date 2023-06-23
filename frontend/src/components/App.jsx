import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import UnionGood from "../image/Uniongood.jpg";
import UnionBad from "../image/Unionbad.jpg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipLink, setInfoTooltipLink] = useState("");

  const navigate = useNavigate();

  // useEffect для получения профиля при загрузке
  useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  // useEffect для получения карточек при загрузке
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  // useEffect для проверки токена
  useEffect(() => {
    checkToken();
  }, []);

  // функция получения проверки
  function checkToken() {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      auth
        .getUserInfo(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  // функция регистрации (отправка данных на сервер)
  function registerAuth(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        setInfoTooltipLink(UnionGood);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsInfoTooltipOpen(true);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipLink(UnionBad);
      });
  }

  // функция авторизации
  function loginAuth(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setEmail(email);
      });
  }

  // функции изменения стейта
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  // функция добавления и снятия лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .disLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((items) => {
          return items.filter((item) => {
            if (item._id !== card._id) {
              return item;
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция отправки измененого профиля на сервер
  function handleUpdateUser(objUserInfo) {
    api
      .setUserInfo(objUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция отправки измененого аватара на сервер
  function handleUpdateAvatar(objUserAvatar) {
    api
      .setUserAvatar(objUserAvatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция отпровки новой карточки на сервер
  function addCardInApi(objCard) {
    api
      .addCard(objCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          email={email}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register registerAuth={registerAuth} />}
          />
          <Route path="/sign-in" element={<Login loginAuth={loginAuth} />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          imageLink={infoTooltipLink}
          text={infoTooltipText}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={addCardInApi}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
