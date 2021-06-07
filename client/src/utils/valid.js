const valid = ({
  fullname,
  username,
  email,
  degree,
  rank,
  placeOfWork,
  currentCity,
  password,
  cf_password,
}) => {
  const err = {};

  if (!fullname) {
    err.fullname = 'Пожалуйста добавьте ФИО.';
  } else if (fullname.length > 45) {
    err.fullname = 'ФИО может содержать до 45 символов.';
  }

  if (!username) {
    err.username = 'Пожалуйста добавьте никнейм.';
  } else if (username.replace(/ /g, '').length > 25) {
    err.username = 'Имя пользователя может содержать до 25 символов.';
  }

  if (!email) {
    err.email = 'Пожалуйста добавьте Email.';
  } else if (!validateEmail(email)) {
    err.email = 'Формат Email некорректный.';
  }

  if (!degree) {
    err.degree = 'Пожалуйста добавьте ученую степень.';
  } else if (degree.replace(/ /g, '').length > 25) {
    err.degree = 'Ученая степень может содержать до 25 символов.';
  }

  if (!rank) {
    err.rank = 'Пожалуйста добавьте звание.';
  } else if (rank.replace(/ /g, '').length > 25) {
    err.rank = 'Звание может содержать до 25 символов.';
  }

  if (!placeOfWork) {
    err.placeOfWork = 'Пожалуйста добавьте место работы.';
  } else if (placeOfWork.replace(/ /g, '').length > 25) {
    err.placeOfWork = 'Место работы может содержать до 25 символов.';
  }

  if (!currentCity) {
    err.currentCity = 'Пожалуйста добавьте город проживания.';
  } else if (currentCity.replace(/ /g, '').length > 25) {
    err.currentCity = 'Город проживания может содержать до 25 символов.';
  }

  if (!password) {
    err.password = 'Пожалуйста добавьте пароль.';
  } else if (password.length < 6) {
    err.password = 'В пароле должно быть не менее 6 символов.';
  }

  if (password !== cf_password) {
    err.cf_password = 'Пароли должны совпадать.';
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
