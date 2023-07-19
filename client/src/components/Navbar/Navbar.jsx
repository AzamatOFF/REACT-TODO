import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../redux/user.slice';

export default function Navbar() {
  const user = useSelector((state) => state.userSlice.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    fetch('http://localhost:3003/logout', { credentials: 'include' })
      .then((res) => {
        if (res.status === 200) {
          dispatch(removeUser());
          console.log(user);
          navigate('/');
        } else { throw new Error('status not 200'); }
      })
      .catch(console.error);
  };

  const isAuth = () => (
    <button type="submit" className="nav-link" onClick={handleSignout}>
      Logout
    </button>
  );
  const isUnauth = () => (
    <>
      <div className="navbar-nav">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </div>
      <div className="navbar-nav">

        <Link className="nav-link" to="/login">
          Login
        </Link>
      </div>
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/info">
              Info
            </Link>

          </div>
          {user ? isAuth() : isUnauth()}
        </div>
      </div>
    </nav>
  );
}
