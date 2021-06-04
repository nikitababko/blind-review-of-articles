import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authors } from 'redux/actions/authAction';
import pencilDocCircle from '../../images/pencil-doc-circle.png';
import pencil from '../../images/pencil.png';

const Login = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    fullname: '',
    degree: '',
    rank: '',
    placeOfWork: '',
    currentCity: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, degree, rank, placeOfWork, currentCity } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authors(userData));
    // console.log(userData);
  };

  return (
    <div className="reviewing-articles">
      <form onSubmit={handleSubmit}>
        <div className="title-wrapper d-flex">
          <div className="">
            <h1>
              Добро пожаловать в систему слепого{' '}
              <span>рецензирования научных статей</span>!
            </h1>
            <h2>
              Вы находитесь на странице формирования БД. Пожалуйста,
              введите данные в поля ниже
            </h2>
          </div>
          <img src={pencilDocCircle} alt="pencil-doc-circle" />
        </div>
        <div className="d-flex pencil-block">
          <img src={pencil} alt="pencil" />
          <h3>Авторы</h3>
        </div>

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
            placeholder="Зайцев Вячеслав Александрович"
          />

          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ''}
          </small>
        </div>

        {/* Степень */}
        <div className="degree-rank">
          <span className="span">Степень</span>
          <label className="col" htmlFor="doctor">
            <input
              className="mr-3"
              type="radio"
              id="doctor"
              name="degree"
              value="Доктор наук"
              onChange={handleChangeInput}
            />
            <span>Доктор наук</span>
          </label>
          <label className="col" htmlFor="candidate">
            <input
              className="mr-3"
              type="radio"
              id="candidate"
              name="degree"
              value="Кандидат наук"
              onChange={handleChangeInput}
            />
            <span>Кандидат наук</span>
          </label>
          <label className="col" htmlFor="none">
            <input
              className="mr-3"
              type="radio"
              id="none"
              name="degree"
              value="Без степени"
              onChange={handleChangeInput}
            />
            <span>Без степени</span>
          </label>
        </div>

        {/* Звание */}
        <div className="degree-rank">
          <span className="span">Звание</span>
          <label className="col" htmlFor="professor">
            <input
              className="mr-3"
              type="radio"
              id="professor"
              name="rank"
              value="Профессор"
              onChange={handleChangeInput}
            />
            <span class="checkmark"></span>
            <span>Профессор</span>
          </label>
          <label className="col" htmlFor="docent">
            <input
              className="mr-3"
              type="radio"
              id="docent"
              name="rank"
              value="Доцент"
              onChange={handleChangeInput}
            />
            <span>Доцент</span>
          </label>
          <label className="col" htmlFor="seniorLecturer">
            <input
              className="mr-3"
              type="radio"
              id="seniorLecturer"
              name="rank"
              value="Старший преподаватель"
              onChange={handleChangeInput}
            />
            <span>Старший преподаватель</span>
          </label>
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
            placeholder="СГУВТ"
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
            placeholder="Новосибирск"
          />

          <small className="form-text text-danger">
            {alert.currentCity ? alert.currentCity : ''}
          </small>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50"
            disabled={
              fullname && degree && rank && placeOfWork && currentCity
                ? false
                : true
            }
          >
            Внести запись
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
