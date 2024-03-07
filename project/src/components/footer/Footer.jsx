import React from "react";
import './Footer.css';
import img from '../../Img/MIREA_Gerb_Colour.png';
import { SlSocialVkontakte } from "react-icons/sl";
import { SiTelegram } from "react-icons/si";
import { ImYoutube } from "react-icons/im";


const Footer = () => {
    return(
            <div>
                <div className="footer">
                
                    <div className="contants">
                        <div className="con">
                            <div className="phoad">
                    <a href="https://www.mirea.ru/"><img className='imgF' src={img} alt="img" /></a>
                    <div className="AdresEN">
                        <h1>Москва, Пр-т Вернадского, д. 78</h1>
                        <h1>+7 (499) 600-80-80</h1>
                        <h1>rector@mirea.ru</h1>
                    </div>
                    </div>

                    <div className="Cont">
                    <a href="https://vk.com/mirea_official" target="_blank" rel="noopener noreferrer"><SlSocialVkontakte className="h1"/></a>
                    <a href="http://telegram.me/rtumirea_official" target="_blank" rel="noopener noreferrer"><SiTelegram className="h2"/></a>
                    <a href="https://www.youtube.com/channel/UClVZx_AWcLq8cXViG9NSXAA" target="_blank" rel="noopener noreferrer"><ImYoutube className="h3"/></a>
                    </div>
                        
                        </div>
                        <div className="CCC">
                            <h1>© 2024 МИРЭА - Российский технологический университет</h1>
                            <h1>Все права на материалы сайта mirea.ru принадлежат РТУ МИРЭА. Правила использования сайта.</h1>
                        </div>
                    
                    
                    </div>
                </div>

            </div>



    )
}
export default Footer;