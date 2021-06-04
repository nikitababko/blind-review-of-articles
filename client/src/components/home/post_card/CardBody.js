import React, { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="card_body">
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
      <div
        className="card_body-content mt-2"
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
        }}
      >
        <span>
          <span className="article-begin">Начало статьи</span>
          <br />
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + '.....'}
        </span>
        {post.content.length > 60 && (
          <span
            className="readMore"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? 'Скрыть' : 'Читать далее'}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardBody;
