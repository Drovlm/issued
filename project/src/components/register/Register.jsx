import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Registre.css';
import LogIn from '../login/LogIn';
import Validation from './SignupValidation';
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import './Uploader.css'

export const Register = ({ onClose }) => {

  const [modalopen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Нет выбранного файла");

  const hand = () => {
    setModalOpen(false);
  }

  const [values, setValues] = useState({
    name: '',
    last: '',
    father: '',
    date: '',
    email: '',
    password: '',
    institute: '',
    specialist: '',
    issuey: '',
    img: '',
    vkLink: '',
    telegramLink: '',
    instagramLink: '',
    facebookLink: '',
})

  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: event.target.value}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  setErrors(Validation(values));
  if (
    !errors.name &&
    !errors.last &&
    !errors.date &&
    !errors.email &&
    !errors.password &&
    !errors.institute &&
    !errors.specialist &&
    !errors.issuey
  ) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('last', values.last);
    formData.append('father', values.father);
    formData.append('date', values.date);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('institute', values.institute);
    formData.append('specialist', values.specialist);
    formData.append('issuey', values.issuey);
    

  axios.post('http://localhost:8081/register', values)
 
  .then((res) => {
    alert('Регистрация прошла успешно.');
  })
  .catch((err) => {
    alert('Ошибка регистрации. Пожалуйста, попробуйте снова.');
    console.error(err);
  });
}
};
  
 const [users, setUsers] = useState([]);
  const [req, setReq] = useState({
    Institutes:"",
    Specialist:""
});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3000/project/src/Admin/Inst.php");
    setUsers(result.data.reverse());
  };

  const selectInstetut = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    req[name] = value;
    var data = value;

    var response = fetch("http://localhost:3000/project/src/Admin/Specialist.php", {
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

function handleInputInstitute(event) {
  if (selectInstetut) {
    handleInput(event);
    selectInstetut(event);
  }
}

function handleInputSpecialiste(event) {
  if (selectSpecialist) {
    handleInput(event);
    selectSpecialist(event);
  }
}

function handleIChange(event) {
  if (setModalOpen) {
    handleInput(event);
    setModalOpen(event);
  }
}

    return (
        <div className="auth-form">
            <div className="authF">
            <div className="closeIcon" onClick={() => onClose()}>
                <p className="close">&times;</p>
            </div>
            <h1>Зарегистрироваться</h1>
        <form  className="register-form" onSubmit={handleSubmit}>
        <div className="regupload">
      <div className="binfo">
        <div style={{textAlign:'start'}}>
        <label htmlFor="name"><strong>Имя</strong><p style={{color:'red'}}>*</p></label>
        {errors.name && <span className='text-dangerr'> {errors.name} </span>}
        </div>
        <input className="input" name='name' id="name" onChange={handleInput}/>
       
        <div style={{textAlign:'start'}}>
        <label htmlFor="last"><strong>Фамилия</strong><p style={{color:'red'}}>*</p></label>
        {errors.last && <span className='text-dangerr'> {errors.last} </span>}
        </div>
        <input className="input" name='last' id="last" onChange={handleInput}/> 
       

        <label htmlFor="father"><strong>Отчество</strong></label>
        <input className="input" name='father' id="father" onChange={handleInput}/> 

        <div style={{textAlign:'start'}}>
        <label htmlFor="date"><strong>Дата рождение</strong><p style={{color:'red'}}>*</p></label>
        {errors.date && <span className='text-dangerr'> {errors.date} </span>}
        </div>
        <input type='date' id="date" name='date' onChange={handleInput}/>
     


        {/*<label htmlFor="date"><strong>Пол</strong></label>
        <input type="checkbox" name="myCheckbox" />
    <input type="checkbox" name="myCheckbox" />*/}
        <div style={{textAlign:'start'}}>
        <label htmlFor="email"><strong>Электронной почты</strong><p style={{color:'red'}}>*</p></label>
        {errors.email && <span className='text-dangerr'> {errors.email} </span>}
        </div>
        <input type="email" placeholder="example@mail.com" id="email" name="email" onChange={handleInput}/>
        
        <div style={{textAlign:'start'}}>
        <label htmlFor="password"><strong>Пароль</strong><p style={{color:'red'}}>*</p></label>
        {errors.password && <span className='text-dangerr'> {errors.password} </span>}
        </div>
        <input type="password" id="password" name="password" onChange={handleInput} />
        
        
        <div className="education_info">
        <div style={{textAlign:'start'}}>
               <label htmlFor="institute"><strong>Институт</strong><p style={{color:'red'}}>*</p></label>
               {errors.institute && <span className='text-dangerr'> {errors.institute} </span>}
               </div>
               {/*<input className="input" name='institute' id="institute" onChange={handleInput}/>*/}
               <select className="input" name='institute' id="institute" onChange={handleInputInstitute}>
               <option value="">Выберите институт</option>
            {users.map((user, index) => (
              <option value={user.id}>{user.Institutes}</option>
            ))}
            </select>
               
               <div style={{textAlign:'start'}}>
               <label htmlFor="specialist"><strong>Специальность</strong><p style={{color:'red'}}>*</p></label>
               {errors.specialist && <span className='text-dangerr'> {errors.specialist} </span>}
               </div>
               {/*<input type="specialist" id="specialist" name="specialist" onChange={handleInput} />*/}
              <select  type="specialist" id="specialist" name="specialist"  onChange={handleInputSpecialiste}>
               <option value="">Выберите специалиста</option>
          {req && req.length>0 && req.map((user, index) => (
              <option value={user.id}>{user.Specialist}</option>
            ))}
          </select>
               
               <div style={{textAlign:'start'}}>
               <label htmlFor="issuey"><strong>Год выпуска</strong><p style={{color:'red'}}>*</p></label>
               {errors.issuey && <span className='text-dangerr'> {errors.issuey} </span>}
               </div>
               <input type="number" id="issuey" name="issuey" onChange={handleInput} />
               
                 </div>
        </div>

         <main className="main">
          <div className="photoupl">
            <div className="minform" action="" onClick={() => document.querySelector(".input-filed").click()}>
                <input  htmlFor="img" id="img" type="file" accept="image/*" className="input-filed" hidden
                  onChange={({ target: { files } }) => {
                  files[0] && setFileName(files[0].name);
                    if (files) {
                      setImage(URL.createObjectURL(files[0]));
                    } }}/>
                {image ? (
                    <img className="imgUpl" src={image}  alt={fileName}
                    /> )
                    : ( <> <MdCloudUpload color="#1475cf" size={40} />
                        <p className="imgText">Добавить фотографию</p>
                    </>
                )}
            </div>
                <div className="optins">
            <section className="uploaded-row">
                    {fileName}  
            </section>
            <div className="trash">
            <MdDelete style={{marginTop: '4px'}}
                        onClick={() => { setFileName("Нет выбранного файла");
                            setImage(null);
                        }}
                    />
                    </div>
                    </div> 
                    </div>

                    <div className="authlink">
                    <p style={{color:'black'}}>Личные сайты</p>
                      
                    <div className="external-links">

                    <label htmlFor="vkLink">Vkontakte:</label>
                    <input type="text" id="vkLink" name="vkLink" onChange={handleInput} />

                    <label htmlFor="telegramLink">Telegram:</label>
                    <input type="text" id="telegramLink" name="telegramLink" onChange={handleInput} />    

                    <label htmlFor="instagramLink">Instagram:</label>
                    <input type="text" id="instagramLink" name="instagramLink" onChange={handleInput} />

                    <label htmlFor="facebookLink">Facebook:</label>
                    <input type="text" id="facebookLink" name="facebookLink" onChange={handleInput} />
                    </div>
                    </div> 

                    <div className="authsignup">
                    <div className="authDiv">
                    <button className="authBTN" type="submit">Авторизация</button>
                    </div>

                    <p className="loglink" >
                      Уже есть аккаунт? <span className="loglinkBTN" onClick={setModalOpen}>Войти здесь.</span> </p>
                    {modalopen &&
                    <LogIn onClose={hand}>

                    </LogIn>
                    }
                    </div>
        </main>
        
        </div>       
   </form>

   </div>
   </div>
    )
}

export default Register;