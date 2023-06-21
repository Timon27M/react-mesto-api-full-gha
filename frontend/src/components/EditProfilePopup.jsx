import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // функция изменения имени профиля
  function handleChangeName(e) {
    setName(e.target.value);
  }

  // функция изменения имени описания
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_info_name"
        id="popup__profile-name"
        type="text"
        name="popupName"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__profile-name-error popup__text-error" />
      <input
        className="popup__input popup__input_info_description"
        id="popup__profile-description"
        type="text"
        placeholder="Описание"
        name="popupDescription"
        minLength={2}
        maxLength={200}
        required=""
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__profile-description-error popup__text-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
