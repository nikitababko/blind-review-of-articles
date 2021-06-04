import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { articles } from 'redux/actions/authAction';
import pencilDocCircle from '../../images/pencil-doc-circle.png';
import pencil from '../../images/pencil.png';

const Articles = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    authors: '',
    subjectArea: '',
    volume: '',
    lang: '',
    organization: '',
    currentCity: '',
  };
  const [userData, setUserData] = useState(initialState);
  const {
    name,
    authors,
    subjectArea,
    volume,
    lang,
    organization,
    currentCity,
  } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(articles(userData));
    console.log(userData);
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
          <h3>Статьи</h3>
        </div>

        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChangeInput}
            value={name}
            style={{ background: `${alert.name ? '#fd2d6a14' : ''}` }}
            placeholder="Механика твердого тела"
          />

          <small className="form-text text-danger">
            {alert.name ? alert.name : ''}
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="authors">Авторы</label>
          <input
            type="text"
            className="form-control"
            id="authors"
            name="authors"
            onChange={handleChangeInput}
            value={authors}
            style={{ background: `${alert.authors ? '#fd2d6a14' : ''}` }}
            placeholder="Зайцев Вячеслав Александрович, Смирнов Виктор Владиславович"
          />

          <small className="form-text text-danger">
            {alert.authors ? alert.authors : ''}
          </small>
        </div>

        {/* Предметная область */}
        <div className="form-group">
          <label htmlFor="subjectArea">Предметная область</label>
          <input
            type="text"
            className="form-control"
            id="subjectArea"
            name="subjectArea"
            onChange={handleChangeInput}
            value={subjectArea}
            style={{
              background: `${alert.subjectArea ? '#fd2d6a14' : ''}`,
            }}
            placeholder="Механика"
          />

          <small className="form-text text-danger">
            {alert.subjectArea ? alert.subjectArea : ''}
          </small>
        </div>

        {/* Объем */}
        <div className="form-group">
          <label htmlFor="volume">Объем</label>
          <input
            type="text"
            className="form-control"
            id="volume"
            name="volume"
            onChange={handleChangeInput}
            value={volume}
            style={{
              background: `${alert.volume ? '#fd2d6a14' : ''}`,
            }}
            placeholder="Количество страниц"
          />

          <small className="form-text text-danger">
            {alert.volume ? alert.volume : ''}
          </small>
        </div>

        {/* Язык */}
        <div className="form-group">
          <label htmlFor="lang">Язык</label>
          <input
            type="text"
            className="form-control"
            id="lang"
            name="lang"
            onChange={handleChangeInput}
            value={lang}
            style={{
              background: `${alert.lang ? '#fd2d6a14' : ''}`,
            }}
            placeholder="Русский"
          />

          <small className="form-text text-danger">
            {alert.lang ? alert.lang : ''}
          </small>
        </div>

        {/* Организация */}
        <div className="form-group">
          <label htmlFor="organization">Организация</label>
          <input
            type="text"
            className="form-control"
            id="organization"
            name="organization"
            onChange={handleChangeInput}
            value={organization}
            style={{
              background: `${alert.organization ? '#fd2d6a14' : ''}`,
            }}
            placeholder="СГУВТ"
          />

          <small className="form-text text-danger">
            {alert.organization ? alert.organization : ''}
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
              name &&
              authors &&
              subjectArea &&
              volume &&
              lang &&
              organization &&
              currentCity
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

export default Articles;
