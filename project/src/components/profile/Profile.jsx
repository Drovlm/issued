import React from 'react'
import './Profile.css';
import video from "../../vedio/background_vid.mp4";
import img from '../../Img/blank-profile-picture.jpg';

function profile() {
  return (
    <div className='general_profile'>
        <div className='profile_page'>
            <div className='general_info'>
                <div className='video_background'>
                <video className='video' src={video} />
                </div>

                <div className='img_profile'>
                <img className='img_P' src={img} alt="img" />
                </div>

                <div className='informations'>

                  <div className='NGA'>
                  <h1>Фамилия Имя</h1>
                  <p className='name'>Группа:</p>
                  <p className='name'>Возраст:</p>
                  </div>

                  <div className='CS'>
                  
                  <p className='name'>Состояние:</p>
                  <p className='name'>Курс:</p>
                </div>

                </div>
                
            </div>

        </div>
    </div>
  )
}

export default profile
