function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container-${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form-${props.name}`}
          name="popupForm"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__save-button popup__save-button_${props.name}`}
            type="submit"
          >
            {props.buttonName}
          </button>
        </form>
        <button
          className={`popup__close-button popup__close-button_${props.name}`}
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
