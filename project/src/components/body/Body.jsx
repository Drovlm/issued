import React, { useState, useEffect } from 'react';
import img from '../../Img/blank-profile-picture.jpg';
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialVkontakte } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import './Body.css';
import './Searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchMenu from '../SearchMenu/SearchMenu';

const Body = ({ Search = {} }) => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState ([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/project/src/API.php')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setRecords(data);
      })
      .catch(err => console.log(err));
  }, []);
  const filter = () => {
    setRecords(
      data.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.issuey.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  {/*FOR REAL TIME SEARCH */}
  {/*const filter = (event) => {
setRecords(data.filter(f => f.name.toLowerCase().includes(event.target.value)))
setRecords(data.filter(f => f.last.toLowerCase().includes(event.target.value)))
setRecords(data.filter(f => f.issuey.toLowerCase().includes(event.target.value)))
} */}

  const [search, setSearch] = useState({
    last: '',
    name: '',
    issuey: '',
  });

  console.log('Search state:', search); 
    const [MSearch, setMenuOpen] = useState(false);
    const MenuOpen = () => {
    setMenuOpen(false);
    }

  return ( 
    <div className="body">
          <div>
            {/*SEARCH BY CLICKING on "faSearch" ICON*/}
<div className="SearchBar">
<input className="SearchS" type="text" placeholder="Фамилия"
onChange={(e) => setSearchQuery(e.target.value)}/>

<input className="SearchN" type="text" placeholder="Имя"
  onChange={(e) => setSearchQuery(e.target.value)} />

<input className="SearchN" type="number" placeholder="Год выпуска"
  onChange={(e) => setSearchQuery(e.target.value)} />


  {/* REAL TI<E SEARCH */}
{/*<input className="SearchS" type="text" placeholder="Фамилия" onChange={(e) => {
  setSearch({ ...search, last: e.target.value });
  setRecords(data.filter(f => f.last.toLowerCase().includes(e.target.value.toLowerCase())));
}} />
<input className="SearchN" type="text" placeholder="Имя" onChange={(e) => {
  setSearch({ ...search, name: e.target.value });
  setRecords(data.filter(f => f.name.toLowerCase().includes(e.target.value.toLowerCase())));
}} />
<input className="SearchN" type="number" placeholder="Год выпуска" onChange={(e) => {
  setSearch({ ...search, issuey: e.target.value });
  setRecords(data.filter(f => f.issuey.toLowerCase().includes(e.target.value.toLowerCase())));
}} />*/}

<div className="butt">
<div className="h1" onClick={filter}> <FontAwesomeIcon icon={faSearch} /></div>
<div onClick={() => setMenuOpen(true)} className="h2"><FontAwesomeIcon icon={faFilter} /></div>
{MSearch &&
      <SearchMenu onClose={MenuOpen}>

      </SearchMenu>
      }
    
</div>
</div>
</div>
      <div className="Cards">

      {records
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