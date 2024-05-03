import React, { useState } from "react";
import './Login.css';
import Register from '../register/Register';
import Validation from './LoginValidation';
import axios from 'axios';

const LogIn = ({ onClose, onLoginSuccess }) => {
  const [regopen, setRegOpen] = useState(false);
  const hand2 = () => {
    setRegOpen(false);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = useState ({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }  

  function handleSubmit(event) {
    event.preventDefault();
    setErrors(Validation(values));
    axios
      .post('http://localhost:8081/login', { email, password })
      .then((res) => {
        if (res.data.message === 'Login Successfully') {
          console.log('Login Successfully');
          console.log('Username:', res.data.name);
          console.log('Image:', res.data.img);
          console.log('Id:', res.data.id);
          onLoginSuccess(res.data.name, res.data.img, res.data.id);
        } else {
          console.log('Failed');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="auth-form">
      <div className="authFL">
        <div className="closeIcon">
          <p className="close" onClick={() => onClose()}>&times;</p>
        </div>
        <h1>Вход</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Электронная почта</label>
          <input type="email" placeholder="example@mail.com" id="email" name="email" onChange={(e) => { handleInput(e); setEmail(e.target.value)}}/>
          {errors.email && <span className='text-danger'> {errors.email} </span>}

          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" onChange={(e) => { handleInput(e); setPassword(e.target.value)}}/>
          {errors.password && <span className='text-danger'> {errors.password} </span>}

          <div className="authDiv">
            <button className="authBTN" type="submit">Авторизация</button>
          </div>
        </form>
        <p className="reglink" onClick={() => setRegOpen(true)}>Зарегистрироваться</p>
        {regopen && <Register onClose={hand2} />}
      </div>
    </div>  
  )
}

export default LogIn;