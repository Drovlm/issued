import React, { useState, useEffect } from 'react';
import img from '../../Img/blank-profile-picture.jpg';
import { IoLogoInstagram } from "react-icons/io";
import { SlSocialVkontakte } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import './Body.css';
import './Searchbar.css'; 
import './story.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchMenu from '../SearchMenu/SearchMenu';


const Body = ({ Search = {} }) => {
  const { users, req, selectedInstitute, selectedSpecialist, loadUsers, selectInstetut, selectSpecialist, } = SearchMenu();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  /*const [ setSelectedInstitute] = useState('');*/
  /*const [setSelectedSpecialist] = useState('');*/
  const [images, setImages] = useState([]);
  const [imageStry, setImageStry] = useState([]);
  const onClose = () => {
    setMenuOpen(false);
    setStoryOpen(false);
  }

useEffect(() => {
    fetch('http://localhost:3000/project/src/Admin/API.php')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setRecords(data);
        data.forEach(item => {
          if (item.img) {
            const decodedImageData = atob(item.img);
            item.img = decodedImageData;
          }
        });
        setImages(data);

        data.forEach(item => {
          if (item.story_image) {
            const decodedImageData = atob(item.story_image);
            item.story_image = decodedImageData;
          }
        });
        setImageStry(data);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []); 

const filter = () => {
    setRecords(
      data.filter(
        (f) =>
          (f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.issuey.toString().includes(searchQuery.toString())) &&
          (selectedInstitute ? f.institute === selectedInstitute : true) &&
          (selectedSpecialist ? f.specialist === selectedSpecialist : true)
      )
    );
  };

    {/*FOR REAL TIME SEARCH */}
      {/*const filter = (event) => {
      setRecords(data.filter(f => f.name.toLowerCase().includes(event.target.value)))
      setRecords(data.filter(f => f.last.toLowerCase().includes(event.target.value)))
        setRecords(data.filter(f => f.issuey.toLowerCase().includes(event.target.value)))
        setRecords(data.filter(f =>  selectedInstitute ? f.institute === selectedInstitute : true)) &&
        setRecords(data.filter(f =>  selectedSpecialist ? f.specialist === selectedSpecialist : true))
        }

  const [search, setSearch] = useState({
    last: '',
    name: '',
    issuey: '',
    institute:'',
    specialist:'',
  })

  const onSearch = (searchCriteria) => {
    setRecords(
      data.filter(
        (f) =>
          (searchCriteria.last ? f.last.toLowerCase().includes(searchCriteria.last.toLowerCase()) : true) &&
          (searchCriteria.name ? f.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) : true) &&
          (searchCriteria.issuey ? f.issuey.toString().includes(searchCriteria.issuey.toString()) : true) &&
          (selectedInstitute ? f.institute === selectedInstitute : true) &&
          (selectedSpecialist ? f.specialist === selectedSpecialist : true)
      )
    );
  };*/}

  const [itemStates, setItemStates] = useState({});
  
  const toggleItemStory = (itemId) => {
    setItemStates(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId] // Toggle the state for the specific item
    }));
  };

  const [isMenuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  const [isStoryOpen, setStoryOpen] = useState(false);
  const toggleStory = () => {
    setStoryOpen(!isStoryOpen);
  }

  return ( 
    <div className="body">
      <div className="SearchBar">

            {/*SEARCH BY CLICKING on "faSearch" ICON*/}
       <input className="SearchS" type="text" placeholder="Фамилия" onChange={(e) => setSearchQuery(e.target.value)}/>
        <input className="SearchN" type="text" placeholder="Имя" onChange={(e) => setSearchQuery(e.target.value)} />
        <input className="SearchN" type="number" placeholder="Год выпуска" onChange={(e) => setSearchQuery(e.target.value)} />
       

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
}} /> */}


        <div className="butt">
          <div className="h1" onClick={filter}> <FontAwesomeIcon icon={faSearch} /></div>
          <div onClick={toggleMenu} className="h2"><FontAwesomeIcon icon={faFilter} /></div>
        </div>
    
        {isMenuOpen && (
          <div className='OfMenu'>
      <div className="menu">
        <div className="CloseIcon">
        <p className="Close" onClick={onClose}>×</p>
        </div>
        
        <div className="container">

        <h1>Институт</h1>
       <div>
       <select name="after_field" onChange={selectInstetut}>
       <option value="">Выберите институт</option>
            {users.map((user, index) => (
              <option value={user.id}>{user.Institutes}</option>
            ))}
          </select>
       </div>

       <div class="col-sm-3">
       <h1>Специальность</h1>
        <select onChange={selectSpecialist} name="Specialist">
        <option value="">Выберите специалиста</option>
          {req && req.length>0 && req.map((user, index) => (
              <option value={user.id}>{user.Specialist}</option>  
            ))}
         </select>
      </div>
</div>   
        <div className="gro">
          <h1>Год выпуска</h1>
          <input className='text_y' type="number"></input>
        </div>
        <div className='BlockSBTN'>
          <button onClick={() => { filter(); onClose(); }} className='searchBTN'>Применить фильтры</button>
        </div>
      </div>
    </div>
        )}

      </div>
      <div className="Cards">
        {records.map((item) => (
          <div className="offic_info" key={item.id}>
            <div className="CoverP">
            <img className='imgP' src={item.img ? `data:image/jpeg;base64,${btoa(item.img)}` : img} />

              {item.story_image || item.story_text ? <div className='storyeffect' onClick={() => toggleItemStory(item.id)} ></div> : null}
              {itemStates[item.id] && (
                <div className='OfStory'>
                  <div className="story">
                    <div className="CloseIcon">
                      <p className="Close" onClick={onClose}>×</p>
                      <div className="story_show"> 
                      <div style={{display:'block'}}>
                  <p className="story_name" style={{fontSize:'20px', fontWeight:'700', padding:'10px'}}>{item.last} {item.name} {item.father}</p>
                  </div>
                  <div className='img_of_story' src={item.story_image ? `data:image/jpeg;base64,${btoa(item.story_image)}` : img} />
                  <div className='text_of_story'>
                  <h4 style={{padding:'15px'}}>{item.story_text}</h4>
                  </div>
                </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="Pro">
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
