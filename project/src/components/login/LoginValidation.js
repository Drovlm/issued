function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    
    
    if (values.email == "") {
        error.email = "Почта не указана"
    } else if (!email_pattern.test(values.email)) {
        error.email = "Аккаунт не найден"
    } else {
        error.email = ""
    }

    if (values.password == "") {
        error.password = "Введите пароль";
      } else if (!password_pattern.test(values.password)) {
        error.password = "Неверный пароль";
      } else {
        error.password = "";
      }
      return error;
}

export default Validation;
