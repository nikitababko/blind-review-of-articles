import React from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';
import Search from './Search';

import pencilDoc from '../../images/pencil-doc.png';

const Header = () => {
  return (
    <div className="header bg-light">
      <nav
        className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-center align-middle"
      >
        <Link to="/" className="logo">
          {/* <h1
            className="navbar-brand p-0 m-0"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Главная
          </h1> */}
          {/* <img src={pencilDoc} alt="pencil-doc" /> */}
        </Link>

        {/* <Search /> */}

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
