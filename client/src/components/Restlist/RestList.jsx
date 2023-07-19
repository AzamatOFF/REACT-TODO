import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOneAction, removeOneAction } from '../redux/rest.action';
import { getAllRestsSelector } from '../redux/rest.selector';
import RestItem from '../RestItem/RestItem';

function RestList() {
  const user = useSelector((state) => state.userSlice.login);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();// для применения, в данном случае он не нужен был
  const rests = useSelector(getAllRestsSelector);
  const handleRemove = useCallback(
    (restId) => {
      dispatch(removeOneAction(restId));
    },
    []
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOneAction(input, navigate));
    setInput('');
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      {user
      && (
      <form className="d-flex" onSubmit={(e) => handleSubmit(e)}>

        <input type="text" name="title" className="form-control" placeholder="Add todo" value={input} onChange={handleInput} />
        <button type="submit" className="btn btn-primary btn-submit">
          ADD
        </button>
      </form>
      )}
      <ul className="list-group mt-2">
        {rests.map((rest) => <RestItem key={rest.id} rest={rest} user={user} handleRemove={handleRemove} />)}
      </ul>
    </div>
  );
}

export default RestList;
