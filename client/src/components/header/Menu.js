import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';

import pencilDoc from '../../images/pencil-doc.png';

const Menu = () => {
  const navLinks = [
    { label: 'Home', text: 'Главная', icon: 'home', path: '/' },
    {
      label: 'Message',
      text: 'Обратная связь',
      icon: 'headset_mic',
      path: '/message',
    },
    // { label: 'Discover', icon: 'explore', path: '/discover' },
    {
      label: 'Articles',
      text: 'Рецензирование статей',
      icon: 'explore',
      path: '/articles',
    },
    {
      label: 'Statistics',
      text: 'Статистика',
      icon: 'equalizer',
      path: '/statistics',
    },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        <img src={pencilDoc} alt="pencil-doc" />

        {navLinks.map((link, index) => (
          <li
            className={`nav-item px-2 ${isActive(link.path)}`}
            key={index}
          >
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
              <span>{link.text}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span
              className="material-icons"
              style={{ color: notify.data.length > 0 ? '#ff8672' : '' }}
            >
              notifications
            </span>

            <span className="notify_length">{notify.data.length}</span>
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(75px)' }}
          >
            <NotifyModal />
          </div>
        </li>

        {/* <div className="nav-link">
          Здравствуйте,{' '}
          {auth.user.role === 'admin' ? 'Администратор' : 'Пользователь'}
        </div> */}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link
              className="dropdown-item"
              to={`/profile/${auth.user._id}`}
            >
              Профиль
            </Link>

            <Link className="dropdown-item" to={`/message`}>
              Обратная связь
            </Link>

            {/* <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? 'Светлая тема' : 'Темная тема'}
            </label> */}

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Выйти
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
