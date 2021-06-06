import React, { useEffect } from 'react';
import Avatar from '../../Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { BASE_URL } from '../../../utils/config';

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Array of authors
  const arrayOfAuthors = (string) => {
    return string.split(',');
  };

  const history = useHistory();

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true },
    });
  };

  const handleDeletePost = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push('/articles');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  // console.log(post.user);

  return (
    <div className="card_header">
      <div className="d-flex">
        {auth.user.role === 'admin' ? (
          <>
            <Avatar src={post.user.avatar} size="big-avatar" />

            <div className="card_name">
              <h6 className="m-0">
                <Link
                  to={`/profile/${post.user._id}`}
                  className="text-dark"
                >
                  {post.user.fullname} ({post.user.username})
                </Link>
              </h6>
              <div className="d-flex flex-column mt-4">
                <span>
                  <strong>Заголовок:</strong> {post.title}
                </span>
                <span className="article-authors">
                  <strong>Авторы:</strong>
                  {arrayOfAuthors(post.authors).map((author) => (
                    <span>
                      <br />
                      <span className="article-authors__author">
                        {author}
                      </span>
                    </span>
                  ))}
                </span>
                <span>
                  <strong>Предметная область:</strong> {post.subjectArea}
                </span>
                <span>
                  <strong>Количество слов:</strong> {post.content.length}
                </span>
                <span>
                  <strong>Язык:</strong> {post.lang}
                </span>
                <span>
                  <strong>Организация:</strong> {post.organization}
                </span>
                <span>
                  <strong>Город проживания:</strong> {post.currentCity}
                </span>
              </div>
              <small className="text-muted">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </>
        ) : (
          <>
            <Avatar
              src="https://res.cloudinary.com/nikitababko/image/upload/v1616588775/Avatars/avatar_g5b8fp.png"
              size="big-avatar"
            />

            <div className="card_name">
              <h6 className="m-0">
                {/* <Link
                  to={`/profile/${post.user._id}`}
                  className="text-dark"
                >
                  {post.user.fullname} ({post.user.username})
                </Link> */}
              </h6>
              <div className="d-flex flex-column mt-4">
                <span>
                  <strong>Заголовок:</strong> {post.title}
                </span>
                {/* <span className="article-authors">
                  <strong>Авторы:</strong>
                  {arrayOfAuthors(post.authors).map((author) => (
                    <span>
                      <br />
                      <span className="article-authors__author">
                        {author}
                      </span>
                    </span>
                  ))}
                </span> */}
                <span>
                  <strong>Предметная область:</strong> {post.subjectArea}
                </span>
                <span>
                  <strong>Количество слов:</strong> {post.content.length}
                </span>
                <span>
                  <strong>Язык:</strong> {post.lang}
                </span>
                {/* <span>
                  <strong>Организация:</strong> {post.organization}
                </span> */}
                {/* <span>
                  <strong>Город проживания:</strong> {post.currentCity}
                </span> */}
              </div>
              <small className="text-muted">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </>
        )}

        {/* <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.fullname} ({post.user.username})
            </Link>
          </h6>
          <div className="d-flex flex-column mt-4">
            <span>
              <strong>Заголовок:</strong> {post.title}
            </span>
            <span className="article-authors">
              <strong>Авторы:</strong>
              {arrayOfAuthors(post.authors).map((author) => (
                <span>
                  <br />
                  <span className="article-authors__author">{author}</span>
                </span>
              ))}
            </span>
            <span>
              <strong>Предметная область:</strong> {post.subjectArea}
            </span>
            <span>
              <strong>Количество слов:</strong> {post.content.length}
            </span>
            <span>
              <strong>Язык:</strong> {post.lang}
            </span>
            <span>
              <strong>Организация:</strong> {post.organization}
            </span>
            <span>
              <strong>Город проживания:</strong> {post.currentCity}
            </span>
          </div>
          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div> */}
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-toggle="dropdown"
        >
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span>{' '}
                Редактировать статью
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span>{' '}
                Удалить статью
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Копировать
            ссылку
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
