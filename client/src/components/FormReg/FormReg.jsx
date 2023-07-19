import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { domainAddress } from '../../constants/api';
import { addUser } from '../redux/user.slice';

function FormReg() {
  const [form, setForm] = useState({
    name: '', login: '', password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${domainAddress}/registration`;
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          throw new Error(data.msg);
        }
        dispatch(addUser({ id: data.id, name: data.name, login: data.login }));
        navigate('/');
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setForm({ name: '', login: '', password: '' });
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="form-label" className="form-label">
          Name
          <input name="name" type="text" value={form.name} className="form-control" onChange={handleInput} />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="form-label" className="form-label">
          Login
          <input name="login" type="text" value={form.login} className="form-control" onChange={handleInput} />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
          <input name="password" type="password" value={form.password} className="form-control" onChange={handleInput} />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default FormReg;
