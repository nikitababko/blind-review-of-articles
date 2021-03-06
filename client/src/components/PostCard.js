import React from 'react';
import CardHeader from './home/post_card/CardHeader';
import CardBody from './home/post_card/CardBody';
import CardFooter from './home/post_card/CardFooter';

import Comments from './home/Comments';
import InputComment from './home/InputComment';

const PostCard = ({ post, theme, setCountComment, countComment }) => {
  return (
    <div className="card my-3 mr-4 ml-4">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter
        setCountComment={setCountComment}
        countComment={countComment}
        post={post}
      />

      {/* <Comments post={post} />
      <InputComment post={post} /> */}
    </div>
  );
};

export default PostCard;
