import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [countComment, setCountComment] = useState([]);

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });

    setLoad(false);
  };

  const postsArr = homePosts.posts;
  const lastTwoElements = postsArr.slice(-2);

  const postsAuthUser = () => {
    return postsArr.filter((item) => item.user._id === auth.user._id);
  };

  // console.log(postsAuthUser());
  // console.log(homePosts.posts[0].user._id, auth.user._id);

  return (
    <div className="posts">
      {/* // TODO: Добавил условие, что рецензент может оценивать только две статьи */}

      {auth.user.gender === 'Рецензент' && auth.user.role !== 'admin'
        ? lastTwoElements.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              theme={theme}
              setCountComment={setCountComment}
              countComment={countComment}
            />
          ))
        : auth.user.role === 'admin'
        ? homePosts.posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              theme={theme}
              setCountComment={setCountComment}
              countComment={countComment}
            />
          ))
        : postsAuthUser().map((post) => (
            <PostCard
              key={post._id}
              post={post}
              theme={theme}
              setCountComment={setCountComment}
              countComment={countComment}
            />
          ))}

      {/* {auth.user.gender === 'Рецензент' && auth.user.role !== 'admin'
        ? lastTwoElements.map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))
        : homePosts.posts.map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))} */}

      {/* {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))} */}

      {/* {homePosts.posts.map((post) => console.log(post.authors))} */}

      {load && (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
