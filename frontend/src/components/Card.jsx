import {CurrentUserContext} from "../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.cardId === currentUser._id;


// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.likes.some(i => i._id === currentUser._id);


// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = ( 
  `element__button ${isLiked && 'element__button_active'}` 
);

// фунуция добавления лайка и дизлайка карточке
function handleLikeClick() {
  props.onCardLike(props.card);
}

function handleDeleteCardClick() {
  props.onCardDelete(props.card)
}

  return (
    <article id="element" className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={props.imgLink}
        alt={props.cardName}
      />
      <div className="element__info">
        <h2 className="element__paragraph">{props.cardName}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="element__like-number">{props.likeNumber}</p>
        </div>
      </div>
      {/* <button type="button" className="element__button-delete" /> */}
      {isOwn && <button className='element__button-delete' type="button" onClick={handleDeleteCardClick} />} 
    </article>
  );
}

export default Card;
