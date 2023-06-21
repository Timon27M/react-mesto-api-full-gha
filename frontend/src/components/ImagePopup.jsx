function ImagePopup(props) {
    return (
        <>
        <div className={`popup popup_open-card ${props.card ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container-card">
          <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.link : ''}/>
          <p className="popup__name-image">{props.card ? props.card.name : ''}</p>
          <button
            className="popup__close-button popup__close-button_open-card"
            type="button" onClick={props.onClose}
          />
        </div>
      </div>
      </>
    )
}

export default ImagePopup;