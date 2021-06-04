import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);

  return (
    <>
      {isLike ? (
        <i
          className="fas fa-thumbs-up text-success"
          onClick={handleUnLike}
          style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        />
      ) : (
        <i className="far fa-thumbs-up" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
