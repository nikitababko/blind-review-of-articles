import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Status from '../components/home/Status';
import Posts from '../components/home/Posts';

import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading.gif';
import RightSideBar from 'components/home/RightSideBar';

let scroll = 0;

const Home = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const res = await axios.post(`/api/user_posts/get_all_posts`, null, {
        headers: { Authorization: auth.token },
      });

      setAllPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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

  // console.log(allPosts);

  return (
    <div className="home row mx-0 d-flex flex-column">
      <div className="col-md-12 m-auto">
        {/* <Status /> */}
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">Статей нет</h2>
        ) : (
          <Posts />
        )}
      </div>

      <div className="col-md-4">{/* <RightSideBar /> */}</div>
    </div>
  );
};

export default Home;
