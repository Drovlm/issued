import React, { useState } from 'react';
import './Header.css';
import img from '../../Img/MIREA_Gerb_Colour.png';
import LogIn from '../login/LogIn';
import Register from '../register/Register';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleRegOpen = () => {
    setRegOpen(true);
  };

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
    setModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="header">
      <div className="navbar">
        <a href="https://www.mirea.ru/">
          <img className="img" src={img} alt="img" />
        </a>
        <h1>Выпускники РТУ МИРЭА</h1>
      </div>

      <div className="navbar-sign">
        {isLoggedIn ? (
          <>
            <p>{username}!</p>
            <button className="logoutBTN" onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <p onClick={handleModalOpen}>
              {username ? `Привет ${username}!` : 'Войти'}
            </p>
            <button className="regBTN" onClick={handleRegOpen}>Зарегистрироваться</button>
          </>
        )} 

        {modalOpen && (
          <LogIn
            onClose={() => setModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {regOpen && <Register onClose={() => setRegOpen(false)} />}
      </div>
    </div>
  );
};

export default Header;