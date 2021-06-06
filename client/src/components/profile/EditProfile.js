import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: '',
    degree: '',
    rank: '',
    placeOfWork: '',
    currentCity: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: '',
  };
  const [userData, setUserData] = useState(initState);
  const {
    fullname,
    degree,
    rank,
    placeOfWork,
    currentCity,
    mobile,
    address,
    website,
    story,
    gender,
  } = userData;

  const [avatar, setAvatar] = useState('');

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Закрыть
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Изменить</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">ФИО</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: '50%',
                right: '5px',
                transform: 'translateY(-50%)',
              }}
            >
              {/* {fullname.length}/25 */}
            </small>
          </div>
        </div>

        {/* Степень */}
        <div className="form-group">
          <label htmlFor="degree">Степень</label>
          <input
            type="text"
            name="degree"
            id="degree"
            value={degree}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rank">Звание</label>
          <input
            type="text"
            name="rank"
            id="rank"
            value={rank}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="placeOfWork">Место работы</label>
          <input
            type="text"
            name="placeOfWork"
            id="placeOfWork"
            value={placeOfWork}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentCity">Город проживания</label>
          <input
            type="text"
            name="currentCity"
            id="currentCity"
            value={currentCity}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Телефон</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Адрес</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Сайт</label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            className="form-control"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="story">Биография</label>
          <textarea
            name="story"
            id="story"
            value={story}
            cols="30"
            rows="4"
            className="form-control"
            onChange={handleInput}
          />

          <small className="text-danger d-block text-right">
            {story.length}/200
          </small>
        </div>

        {/* <label htmlFor="gender">Пол</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="custom-select text-capitalize"
            onChange={handleInput}
          >
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
            <option value="other">Другое</option>
          </select>
        </div> */}

        <button className="btn btn-info w-100 save" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
