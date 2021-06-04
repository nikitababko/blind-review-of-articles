import React, { useEffect } from 'react';

import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import ReviewingArticles from '../components/home/ReviewingArticles';
import AuthorArticle from '../components/home/AuthorArticle';
import Article from '../components/home/Article';
import RightSideBar from '../components/home/RightSideBar';

import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading.gif';

let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="home row mx-0 d-flex flex-column">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#description">
            Рецензенты
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#characteristics">
            Авторы
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#articles">
            Статьи
          </a>
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane fade show active" id="description">
          <ReviewingArticles />
        </div>
        <div class="tab-pane fade" id="characteristics">
          <AuthorArticle />
        </div>
        <div class="tab-pane fade" id="articles">
          <Article />
        </div>
      </div>

      {/* <div className="col-md-12 m-auto">
        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">Статей нет</h2>
        ) : (
          <Posts />
        )}
      </div> */}

      {/* <div className="col-md-4">
        <RightSideBar />
      </div>  */}
    </div>
  );
};

export default Home;
