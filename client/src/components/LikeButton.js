import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);

  return (
    <>
      {isLike ? (
        <i
          className="fas fa-check text-success"
          onClick={handleUnLike}
          style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        >
          Отправлено
        </i>
      ) : (
        <>
          <i className="fas fa-check" onClick={handleLike}>
            {' '}
            Отправить рецензию
          </i>
          <br />
          <i className="fas fa-ban" onClick={handleLike}>
            {' '}
            Отказ в публикации
          </i>
        </>
      )}
    </>
  );
};

export default LikeButton;
