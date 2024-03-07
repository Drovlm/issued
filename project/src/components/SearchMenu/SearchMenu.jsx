import React, { useState, useEffect } from "react";
import './SearchMenu.css';
import axios from "axios";

const SearchMenu = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [req, setReq] = useState({
    Institutes:"",
    Specialist:""
});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3000/project/src/Inst.php");
    setUsers(result.data.reverse());
  };

  const selectInstetut = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
    var data = value;

    var response = fetch("http://localhost:3000/project/src/Specialist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data }),
      }).then(function(response){
        return response.json();
      })
      .then(function(myJson) 
      {
        setReq(myJson)
      })
  };

  const selectSpecialist = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
  };
  
  <select onChange={selectSpecialist} name="specialist" class="form-control">
    <option value="">Select a Specialist</option>
    {req &&
      req.length > 0 &&
      req.map((ite, index) => (
        <option key={index} value={index}>
          {ite.Specialist}
        </option>
      ))}
  </select>

         {/*useEffect(() => {
    fetch('http://localhost:3000/project/src/Inst.php')
      .then(res => res.json())
      .then(result => {
        setItem(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/}


  {/*useEffect(() => {
    fetch('http://localhost:3000/project/src/Specialist.php')
      .then(res => res.json())
      .then(result => {
        setIte(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/}

  return (
    <div className='OfMenu'>
      <div className="menu">
        <div className="CloseIcon">
          <p className="Close" onClick={() => onClose()}>×</p>
        </div>
        
        <div className="container">

        <h1>Институт</h1>
       <div>
       <select name="after_field"   onChange={selectInstetut}>
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
          <button className='searchBTN'>Применить фильтры</button>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;