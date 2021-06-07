import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StatisticsAuthors = () => {
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

      // const getAllUsers = () => {
      //   return users.map((user) => {
      //     return user.degree;
      //   });
      // };
      // console.log(getAllUsers());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const countSubjectAreaMech = () => {
    return homePosts.posts
      .map((post) => {
        return post.subjectArea;
      })
      .filter((item) => item.includes('Механика')).length;
  };

  const countSubjectAreaElectro = () => {
    return homePosts.posts
      .map((post) => {
        return post.subjectArea;
      })
      .filter((item) => item.includes('Электрика')).length;
  };

  const countDoctors = (arr) => {
    return arr
      .map((item) => {
        return item.degree;
      })
      .filter((item) => item.includes('Доктор')).length;
  };

  const countCandidates = (arr) => {
    return arr
      .map((item) => {
        return item.degree;
      })
      .filter((item) => item.includes('Кандидат')).length;
  };

  const countNone = (arr) => {
    return arr
      .map((item) => {
        return item.degree;
      })
      .filter((item) => item.includes('фывыфвыфй')).length;
  };

  const countRussian = () => {
    return homePosts.posts
      .map((post) => {
        return post.lang;
      })
      .filter((item) => item.includes('Русский')).length;
  };

  const countEnglish = () => {
    return homePosts.posts
      .map((post) => {
        return post.lang;
      })
      .filter((item) => item.includes('Английский')).length;
  };

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
          <h3>Авторы</h3>

          <div className="statistics_block">
            <p>
              Количество статей <span>по предметной области:</span>
            </p>
            <p>
              Механика: <strong>{countSubjectAreaMech(homePosts)}</strong>
            </p>
            <p>
              Электрика:{' '}
              <strong>{countSubjectAreaElectro(homePosts)}</strong>
            </p>
          </div>

          <div className="statistics_block">
            <p>
              Количество статей <span>на следующих языках:</span>
            </p>
            <p>
              Русский: <strong>{countRussian(homePosts)}</strong>
            </p>
            <p>
              Английский: <strong>{countEnglish(homePosts)}</strong>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatisticsAuthors;
