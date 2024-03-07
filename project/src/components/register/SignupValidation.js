function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}/
    
    if (values.name === "") {
        error.name = "Имя обязательно"
    } else {
        error.name = ""
    }

    if (values.date === "") {
        error.date = "Укажите дату рождения"
    } else {
        error.date = ""
    }

    if (values.last === "") {
        error.last = "Фамилия обязательно"
    } else {
        error.last = ""
    }

    if (values.email === "") {
        error.email = "Почта не указана"
    } else if (!email_pattern.test(values.email)) {
        error.email = "Почта не совпал"
    } else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Введите пароль"
    } else if (!password_pattern.test(values.password)) {
        error.password = "Пароль не совпал"
    } else {
        error.password = ""
    }

    if (values.institute === "") {
        error.institute = "Укажите институт"
    } else {
        error.institute = ""
    }

    if (values.specialist === "") {
        error.specialist = "Укажите специалист"
    } else {
        error.specialist = ""
    }

    if (values.issuey === "") {
        error.issuey = "Укажите год выпуска"
    } else {
        error.issuey = ""
    }

    return error;

}

export default Validation;
