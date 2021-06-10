import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';

import Send from '../../../images/send.svg';
import LikeButton from '../../LikeButton';

import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
  raitingStarsPost,
} from '../../../redux/actions/postAction';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post, setCountComment, countComment }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  // Text comment
  const [commentText, setCommentText] = useState('');

  const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Рецензенту можно не больше 3 статей за раз рецензировать
  // const [countComment, setCountComment] = useState([]);
  console.log(countComment);

  // Raiting stars
  // const initialState = {
  //   literacy: '',
  //   relevance: '',
  //   uniqueness: '',
  //   utility: '',
  // };
  // const [raitingData, setRaitingData] = useState(initialState);

  // const { literacy, relevance, uniqueness, utility } = raitingData;

  // console.log(raitingData);

  // const handleRaiting = (e) => {
  //   const { name, value } = e.target;
  //   setRaitingData({ ...raitingData, [name]: value });
  // };
  const [literacy, setLiteracy] = useState('');
  const [relevance, setRelevance] = useState('');
  const [uniqueness, setUniqueness] = useState('');
  const [utility, setUtility] = useState('');

  const literacyRaiting = (newRating) => {
    setLiteracy(newRating);
  };

  const relevanceRaiting = (newRating) => {
    setRelevance(newRating);
  };

  const uniquenessRaiting = (newRating) => {
    setUniqueness(newRating);
  };

  const utilityRaiting = (newRating) => {
    setUtility(newRating);
  };
  const { detailPost } = useSelector((state) => state);

  // console.log(detailPost);

  const raitingStars = {
    literacy,
    relevance,
    uniqueness,
    utility,
  };

  // console.log(literacy);

  const handleRaitingStars = async () => {
    // localStorage.setItem('literacy', literacy);
    await dispatch(raitingStarsPost({ post, auth, raitingStars }));
  };

  const getliteracy = localStorage.getItem('literacy');

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    // handleRaitingStars();
    // console.log(124);

    localStorage.setItem('countComment', countComment);

    setCountComment(Number(countComment) + Number(1));

    setLoadLike(true);

    await dispatch(
      likePost({ post, auth, socket, raitingStars, commentText })
    );
    setLoadLike(false);
  };

  // useEffect(() => {
  //   localStorage.removeItem('countComment');
  // }, []);

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  const averageVal = (raitingStarsArr) => {
    return (
      raitingStarsArr
        .map((item) => {
          return item.reduce((a, b) => a + b) / raitingStarsArr.length;
        })
        .reduce((a, b) => a + b) / raitingStarsArr.length
    );
  };

  const postAverage = (post) => {
    return post.reduce((a, b) => a + b) / raitingStarsArr.length;
  };

  const raitingStarsArr = [
    post.literacy,
    post.relevance,
    post.uniqueness,
    post.utility,
  ];

  useEffect(() => {
    if (raitingStarsArr.length) {
      averageVal(raitingStarsArr);
    }
  }, [isLike, saved]);

  // const test = {
  //   0: 'Без степени',
  //   1: 'Кандидат наук',
  //   2: 'Доктор наук',
  // };

  // console.log(auth.user.placeOfWork);
  // console.log(post);
  // console.log(auth.user._id);

  return (
    <div className="card_footer">
      {/* {auth.user._id !== post.user._id && ( */}
      {(auth.user.gender === 'Рецензент' &&
        // auth.user.degree === 'Доктор наук' &&
        post.user.placeOfWork !== auth.user.placeOfWork &&
        countComment <= 2 &&
        post.user.specialty === auth.user.specialty) ||
      auth.user.role === 'admin' ? (
        <div className="card_icon_menu">
          <div className="raiting_stars">
            <div>
              {/* <button onClick={handleRaitingStars}>Click me</button> */}
              <strong>Грамотность:</strong>
              <ReactStars
                name="literacy"
                count={5}
                onChange={literacyRaiting}
                size={24}
                value={postAverage(raitingStarsArr[0])}
                activeColor="#ff7058"
                isHalf={true}
              />
            </div>
            <div>
              <strong>Актуальность:</strong>
              <ReactStars
                name="relevance"
                count={5}
                onChange={relevanceRaiting}
                size={24}
                value={postAverage(raitingStarsArr[1])}
                activeColor="#ff7058"
                isHalf={true}
              />
            </div>
            <div>
              <strong>Уникальность:</strong>
              <ReactStars
                name="uniqueness"
                count={5}
                onChange={uniquenessRaiting}
                size={24}
                value={postAverage(raitingStarsArr[2])}
                activeColor="#ff7058"
                isHalf={true}
              />
            </div>
            <div>
              <strong>Полезность:</strong>
              <ReactStars
                name="utility"
                count={5}
                onChange={utilityRaiting}
                size={24}
                value={postAverage(raitingStarsArr[3])}
                activeColor="#ff7058"
                isHalf={true}
              />
            </div>

            <div>
              <strong>Средняя оценка</strong>
              <br />
              <span style={{ fontSize: '25px' }}>
                {averageVal(raitingStarsArr)}
              </span>
            </div>

            <textarea
              name="content"
              value={commentText}
              placeholder="Напишите рецензию"
              onChange={(e) => setCommentText(e.target.value)}
            />

            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
          </div>
          <div>
            {/* <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link> */}

            <img
              src={Send}
              alt="Send"
              onClick={() => setIsShare(!isShare)}
            />
          </div>
          {saved ? (
            <i
              className="fas fa-bookmark text-info"
              onClick={handleUnSavePost}
            />
          ) : (
            <i className="far fa-bookmark" onClick={handleSavePost} />
          )}
        </div>
      ) : null}

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          <span>
            <strong>Рецензии</strong>
            {post.commentText.length
              ? post.commentText.map((element) => (
                  <div style={{ width: '400px' }}>
                    <span>{element}</span>
                  </div>
                ))
              : null}
          </span>
          <br />
          люди оценили {post.likes.length} раза
        </h6>

        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post.comments.length === 1
            ? post.comments.length + ' комментарий'
            : post.comments.length > 1 && post.comments.length <= 4
            ? post.comments.length + ' комментария'
            : post.comments.length >= 5
            ? post.comments.length + ' комментариев'
            : null}
        </h6>
      </div>

      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
