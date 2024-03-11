import React, { useState, useEffect } from 'react';
import './Header.css';
import './Story.css';
import logo from '../../Img/MIREA_Gerb_Colour.png';
import LogIn from '../login/LogIn';
import Register from '../register/Register';
import img from '../../Img/blank-profile-picture.jpg';
import { TiThMenu } from "react-icons/ti";
import { MdDelete } from 'react-icons/md';
import { FiFilePlus } from "react-icons/fi";
import axios from 'axios';

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', img: '', id: '' });
  const [records, setRecords] = useState([]);
  const [image, setImage] = useState(null);
  const [story, setStory] = useState('');
  const [images, setImages] = useState(null);

  const onClose = () => {
    setStoryPOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleRegOpen = () => {
    setRegOpen(true);
  };

  const handleLoginSuccess = async (name, img, id) => {
    setIsLoggedIn(true);
    setUserInfo({ name, img, id });
    setModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({ name: '', img: '', id:'' });
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

  const [isStoryPOpen, setStoryPOpen] = useState(false);
  const toggleMenu = () => {
    setStoryPOpen(!isStoryPOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', userInfo.id); 
    formData.append('story_img', story);
    
    axios.post('http://localhost:8081/add-story', formData)
      .then((res) => {
        alert('Story added successfully.');
        setStory('');
      })
      .catch((err) => {
        alert('Error: Unable to add story. Please try again.');
        console.error(err);
      });
  }

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
            <img onClick={toggleMenu} className='imgHeader' src={userInfo.img ? `http://localhost:3000/project/src/API.php/uploads/${userInfo.img}` : img} />

            {isStoryPOpen && (
  <div className='StorySection'>
    <div className="storywin">
      <div className="CloseBTN">
        <p className="CloseX" onClick={onClose}>×</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="StoryImage" action="" onClick={() => document.querySelector(".input-filed").click()}>
          <input htmlFor="sty" id="sty" type="file" accept="image/*" className="input-filed" hidden
            onChange={({ target: { files } }) => {
              if (files) {
                setImage(URL.createObjectURL(files[0]));
              } }}/>
          {image ? (
            <img className="imgSTY" src={image} />
          ) : (
            <>
              <FiFilePlus color="#1475cf" size={120} />
            </>
          )}
        </div>
        <div className="optinsSTY">
          <div className="trashSTY">
            <MdDelete style={{ marginTop: '4px' }} onClick={() => { setImage(null); }} />
          </div>
        </div>
        <div className="authSTY">
          <button className="ShareBTn" type="submit">Опубликовать</button>
        </div>
      </form>
    </div>
  </div>
)}

            <div className='menuOption'>
              <div className="Option"><TiThMenu /></div>
            </div>

            <button className="logoutBTN" onClick={handleLogout}>Выйти</button>
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