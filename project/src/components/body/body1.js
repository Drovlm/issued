import React, { useState, useEffect } from 'react';
import img from '../../Img/blank-profile-picture.jpg';
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialVkontakte } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import './Body.css';

const Body = ({ Search = {} }) => {
  const [item, setItem] = useState([]);
<Body Search={Search} />
  useEffect(() => {
    fetch('http://localhost:3000/project/src/Admin/API.php')
      .then(res => res.json())
      .then(result => {
        //console.log('Fetched data:', result); // Log fetched data
        setItem(result); // Update the state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="body">
      <div className="Cards">
      
{/* 
{item
  .filter((item) =>
    (!Search.last || item.last.toLowerCase().includes(Search.last.toLowerCase())) &&
    (!Search.name || item.name.toLowerCase().includes(Search.name.toLowerCase())) &&
    (!Search.issuey || item.issuey.toString().includes(Search.issuey.toString()))
  )
  .map((item) => (
*/ }

      {item
  .filter((item) =>
    (Search.last ? item.last.toLowerCase().includes(Search.last.toLowerCase()) : true) &&
    (Search.name ? item.name.toLowerCase().includes(Search.name.toLowerCase()) : true) &&
    (Search.issuey ? item.issuey.toString().includes(Search.issuey.toString()) : true)
  )
  .map((item) => (
            <div className="offic_info" key={item.id}>

            <div className="CoverP">
              <img className='imgP' src={img} alt="img" />
            </div>
            <div className="Pro">

            <p>{item.img}</p>
            <p className="Full_name" style={{fontSize:'25px', fontWeight:'700'}}>{item.last} {item.name} {item.father}</p>

                <div className="compl_info">
              <div className="stable_info">
                <h4>Дата рождение:</h4>
                <h4>Институт:</h4>
                <h4>Специальность:</h4>
                <h4>Год выпуска:</h4>
              </div>
           
                  <div className="change_info"> 
                  <h4>{item.date}</h4>
                  <h4>{item.institute}</h4>
                  <h4>{item.specialist}</h4>
                  <h4>{item.issuey}</h4>
                </div>
                </div>

                <div className="social_info">
                  {item.vkLink ? (
                  <a  style={{color:'rgb(76, 117, 163)'}} href={item.vkLink} target="_blank" rel="noopener noreferrer">
                  <SlSocialVkontakte />
                </a>
                  ) : (
                  <p>{item.vkLink}</p>
                  )}
                  {item.telegramLink ? (
                  <a style={{ color:'white'}} href={item.telegramLink} target="_blank" rel="noopener noreferrer">
                  <FaTelegramPlane />
                  </a>
                  ) : (
                  <p>{item.telegramLink}</p>
                  )}
                  {item.instagramLink ? (
                  <a style={{color:'rgb(228, 64, 95)'}} href={item.instagramLink} target="_blank" rel="noopener noreferrer">
                  <IoLogoInstagram />
                </a>
                  ) : (
                  <p>{item.instagramLink}</p>
                  )}
                  {item.facebookLink ? (
                  <a style={{color:'rgb(0, 128, 255)'}} href={item.facebookLink} target="_blank" rel="noopener noreferrer">
                  <TiSocialFacebook  />
                </a>
                  ) : (
                  <p>{item.facebookLink}</p>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;