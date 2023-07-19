import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { domainAddress } from '../../constants/api';

function RestItem({
  rest, handleRemove
}) {
  const [title, setTitle] = useState(rest.title);
  const [status, setStatus] = useState(rest.status);
  const user = useSelector((state) => state.userSlice);

  const navigate = useNavigate();

  const handleChange = () => {
    fetch(`${domainAddress}/${rest.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: !status })
    })
      .then((res) => {
        if (res.ok) {
          setStatus(!status);
        }
      })
      .catch(console.error);
  };

  const handleEdit = () => {
    fetch(`${domainAddress}/${rest.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then((res) => {
        if (res.ok) {
          navigate('/');
        }
      })
      .catch(console.error);
  };

  const inputStyle = {
    textDecoration: status ? 'line-through' : 'none',
    width: '50rem'
  };

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <input
          className="changeable form-check-input"
          type="checkbox"
          checked={status}
          onChange={handleChange}
        />
        <button type="button" className="btn btn-danger m-2" onClick={handleEdit}>v</button>
        <input
          style={inputStyle}
          name="text"
          type="text"
          value={title}
          className="form-control"
          onChange={(e) => { if (user?.id === rest?.userId) setTitle(e.target.value); }}
        />
      </div>
      {user?.id === rest.userId && <button type="button" className="btn-close" onClick={() => handleRemove(rest?.id)} />}
    </li>
  );
}

export default React.memo(RestItem);
