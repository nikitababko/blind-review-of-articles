import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StatisticsArticles = () => {
  const { auth } = useSelector((state) => state);
  const { homePosts } = useSelector((state) => state);

  // const static = (degree) => {
  //   return degree
  // }

  // const token = auth.token;
  // axios.defaults.headers.common['Authorization'] = token;

  const [users, setUsers] = useState([]);

  const handleSubmit = async () => {
    try {
      // const registerData = {
      //   name: 'Nikita',
      //   _id: '60b4795875016c21fcc68175',
      // };

      const res = await axios.post(`/api/user/getAllUsers`);

      const users = res.data;

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  // const countTest = (elements) => {
  //   console.log(Number(elements));
  // };

  const countSuccessArticles = () => {
    return homePosts.posts
      .map((element) => element.likes)
      .map((element) => element.length)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    // .join();
    // .split(',');
    // .filter((element) => element.includes('1'));
  };

  // const test = () => {

  // }

  // if (countSuccessArticles()) {
  //   console.log(countSuccessArticles().Number());
  // }

  // console.log(countSuccessArticles());
  // console.log(Number(countSuccessArticles()));
  // console.log(homePosts.posts[0].likes);

  return (
    <div className="reviewing-articles">
      <form>
        <div className="title-wrapper d-flex">
          <div className="">
            <h1>Модуль статистики</h1>
            <h2>
              Вы находитесь на странице статистики. Пожалуйста,
              ознакомьтесь с результатами вычислений ниже
            </h2>
          </div>
        </div>
        <div className="d-flex flex-column pencil-block statistics">
          <h3>Итоги рецензирования</h3>

          <div className="statistics_block">
            <p>
              Число принятых статей{' '}
              <strong>
                {homePosts.length ? countSuccessArticles(homePosts) : 0}
              </strong>
            </p>
            <p>
              Число не принятых статей <strong>0</strong>
            </p>
            <p>
              Отправленные на доработку статьи <strong>0</strong>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatisticsArticles;
