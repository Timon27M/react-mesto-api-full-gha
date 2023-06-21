const InfoTooltip = ({ isOpen, onClose, imageLink, text }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ''}`}>
      <div className="infoTooltip">
        <img className="infoTooltip__image" src={imageLink} />
        <p className="infoTooltip__text">{text}</p>
        <button className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
