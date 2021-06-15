import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Followers from './Followers';
import Following from './Following';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Изменить профиль
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            {/* <div className="follow_btn">
              <span
                className="mr-4"
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} Подписчики
              </span>
              <span
                className="ml-4"
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} Подписки
              </span>
            </div> */}

            <h6>
              <span className="font-weight-bold">ФИО:</span>{' '}
              {user.fullname}
              <br />
              <span className="font-weight-bold">Степень:</span>{' '}
              {user.degree}
              <br />
              <span className="font-weight-bold">Звание:</span> {user.rank}
              <br />
              <span className="font-weight-bold">
                Предметная область:
              </span>{' '}
              {user.subjectArea}
              <br />
              <span className="font-weight-bold">Адрес:</span>{' '}
              {user.address}
              <br />
              <span className="font-weight-bold">
                Город проживания:
              </span>{' '}
              {user.currentCity}
              <br />
              <span className="font-weight-bold">Телефон:</span>{' '}
              {user.mobile}
              <br />
              <span className="font-weight-bold">Email:</span> {user.email}
              <br />
              <span className="font-weight-bold">Сайт:</span>{' '}
              {user.website ? user.website : 'Отсутствует'}
            </h6>
            <br />
            <p className="story">Биография</p>
            <p>{user.story}</p>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
