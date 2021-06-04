import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: '',
    username: '',
    email: '',
    degree: '',
    rank: '',
    placeOfWork: '',
    currentCity: '',
    password: '',
    cf_password: '',
    gender: '',
  };
  const [userData, setUserData] = useState(initialState);
  const {
    fullname,
    username,
    email,
    degree,
    rank,
    placeOfWork,
    currentCity,
    password,
    cf_password,
  } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page auth_page--register">
      <form onSubmit={handleSubmit}>
        {/* <h3 className="text-uppercase text-center mb-4">Диплом</h3> */}

        <div className="form-group">
          <label htmlFor="fullname">ФИО</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChangeInput}
            value={fullname}
            style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="username">Никнейм</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChangeInput}
            value={username.toLowerCase().replace(/ /g, '')}
            style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.username ? alert.username : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email адрес</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={handleChangeInput}
            value={email}
            style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.email ? alert.email : ''}
          </small>
        </div>

        {/* Степень */}
        <div className="form-group">
          <label htmlFor="degree">Степень</label>
          <input
            type="text"
            className="form-control"
            id="degree"
            name="degree"
            onChange={handleChangeInput}
            value={degree}
            style={{ background: `${alert.rank ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.degree ? alert.degree : ''}
          </small>
        </div>

        {/* Звание */}
        <div className="form-group">
          <label htmlFor="rank">Звание</label>
          <input
            type="text"
            className="form-control"
            id="rank"
            name="rank"
            onChange={handleChangeInput}
            value={rank}
            style={{ background: `${alert.rank ? '#fd2d6a14' : ''}` }}
          />

          <small className="form-text text-danger">
            {alert.rank ? alert.rank : ''}
          </small>
        </div>

        {/* Место работы */}
        <div className="form-group">
          <label htmlFor="placeOfWork">Место работы</label>
          <input
            type="text"
            className="form-control"
            id="placeOfWork"
            name="placeOfWork"
            onChange={handleChangeInput}
            value={placeOfWork}
            style={{
              background: `${alert.placeOfWork ? '#fd2d6a14' : ''}`,
            }}
          />

          <small className="form-text text-danger">
            {alert.placeOfWork ? alert.placeOfWork : ''}
          </small>
        </div>

        {/* Город проживания */}
        <div className="form-group">
          <label htmlFor="currentCity">Город проживания</label>
          <input
            type="text"
            className="form-control"
            id="currentCity"
            name="currentCity"
            onChange={handleChangeInput}
            value={currentCity}
            style={{
              background: `${alert.currentCity ? '#fd2d6a14' : ''}`,
            }}
          />

          <small className="form-text text-danger">
            {alert.currentCity ? alert.currentCity : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Пароль</label>

          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
              style={{
                background: `${alert.password ? '#fd2d6a14' : ''}`,
              }}
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Скрыть' : 'Показать'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="cf_password">Подтвердите пароль</label>

          <div className="pass">
            <input
              type={typeCfPass ? 'text' : 'password'}
              className="form-control"
              id="cf_password"
              onChange={handleChangeInput}
              value={cf_password}
              name="cf_password"
              style={{
                background: `${alert.cf_password ? '#fd2d6a14' : ''}`,
              }}
            />

            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? 'Скрыть' : 'Показать'}
            </small>
          </div>

          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ''}
          </small>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Мужчина:{' '}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Женщина:{' '}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="other">
            Другое:{' '}
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Регистрация
        </button>

        <p className="my-2">
          Уже есть аккаунт?{' '}
          <Link to="/" style={{ color: 'crimson' }}>
            Можете войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
