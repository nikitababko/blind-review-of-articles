import React from 'react';
import Avatar from '../Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="status my-3 d-flex col-md-6 m-auto">
      <Avatar src={auth.user.avatar} size="big-avatar" />

      <button
        className="statusBtn flex-fill"
        onClick={() =>
          dispatch({ type: GLOBALTYPES.STATUS, payload: true })
        }
      >
        {auth.user.username}, нажмите сюда, чтобы добавить статью
      </button>
    </div>
  );
};

export default Status;
