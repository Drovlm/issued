import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../Img/MIREA_Gerb_Colour.png';
import LogIn from '../login/LogIn';
import Register from '../register/Register';
import img from '../../Img/blank-profile-picture.jpg';
import { TiThMenu } from "react-icons/ti";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', img: '' });
  const [record, setRecords] = useState([]);
  const [images, setImages] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleRegOpen = () => {
    setRegOpen(true);
  };

  const handleLoginSuccess = async (name, img) => {
    setIsLoggedIn(true);
    setUserInfo({ name, img });
    setModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({ name: '', img: '' });
  };



  useEffect(() => {
    fetch('http://localhost:3000/project/src/API.php')
      .then(res => res.json())
      .then(data => {
        setRecords(data);
        setImages(data); 
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div className="header">
      <div className="navbar">
        <a href="https://www.mirea.ru/">
          <img className="img" src={logo} />
        </a>
        <h1>Выпускники РТУ МИРЭА</h1>
      </div>

      <div className="navbar-sign">
        {isLoggedIn ? (
          <>
            <div className="user-info">
              <p className="user-name">{userInfo.name}</p>
            </div>
              <img className='imgHeader' src={userInfo.img ? `http://localhost:3000/project/src/API.php/uploads/${userInfo.img}` : img}  />
              <div className='menuOption'>
              <div className="Option"><TiThMenu /></div> 
              </div>
            {/*<button className="logoutBTN" onClick={handleLogout}>Выйти</button>*/}
          </>
        ) : (
          <>
            <p onClick={handleModalOpen}>
              {userInfo.name ? ` ${userInfo.name}` : 'Войти'}
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
