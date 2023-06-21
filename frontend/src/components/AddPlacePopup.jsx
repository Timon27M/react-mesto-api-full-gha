import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = useState("");
  const [linkCard, setLinkCard] = useState("");

  useEffect(() => {
    setNameCard("");
    setLinkCard("");
  }, [props.isOpen]);

  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
  }

  function handleChangeLinkCard(e) {
    setLinkCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCards({
      name: nameCard,
      link: linkCard,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое Место"
      buttonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_card_name"
        id="popup__card-name"
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={nameCard}
        onChange={handleChangeNameCard}
      />
      <span className="popup__card-name-error popup__text-error" />
      <input
        className="popup__input popup__input_card_link"
        id="popup__card-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        value={linkCard}
        onChange={handleChangeLinkCard}
      />
      <span className="popup__card-link-error popup__text-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
