import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        id="popup__avatar-link"
        name="popupLinkAvatar"
        className="popup__input popup__input_avatar_link"
        ref={avatarRef}
      />
      <span className="popup__avatar-link-error popup__text-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
