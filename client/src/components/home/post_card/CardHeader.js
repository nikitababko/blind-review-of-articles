import React from 'react';
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
      return history.push('/');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />

        <div className="card_name">
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
              {/* <strong>Авторы:</strong>
              <br />
              <span>{arrayOfAuthors(post.authors)[0]}</span>
              <br />
              <span>{arrayOfAuthors(post.authors)[1]}</span> */}
            </span>
            <span>
              <strong>Предметная область:</strong> {post.subjectArea}
            </span>
            <span>
              <strong>Объем страниц:</strong> {post.content.length} cлов
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
