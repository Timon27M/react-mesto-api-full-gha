import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, setIsLoggedIn, email }) {

  const exitClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }
  return (
    <header className="header">
      <div className="header__logo" />
      {isLoggedIn ? (
        <div className='header__info'>
        <p className="header__email">{email}</p>
        <Link to="/sign-in" className="header__link" onClick={exitClick}>Выйти</Link>
      </div>
      ) : (
        <Routes>
          <Route path="/sign-in" element={
          <Link to="/sign-up" className="header__link">Регистрация</Link>
          } />
          <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__link">Войти</Link>
        } />
        </Routes>
      )}
    </header>
  );
}

export default Header;
