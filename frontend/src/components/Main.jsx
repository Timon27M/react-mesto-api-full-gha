import { useState, useEffect, useContext } from "react";
import api from "../utils/Api.js";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";

function Main(props) {
  // подписываем на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={props.onEditProfile}
              type="button"
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button"
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              likes={card.likes}
              card={card}
              onCardClick={props.onCardClick}
              imgLink={card.link}
              cardName={card.name}
              likeNumber={card.likes.length}
              onCardLike={props.onCardLike}
              cardId={card.owner._id}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
