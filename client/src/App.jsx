/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FormReg from './components/FormReg/FormReg';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { getAllRestsAction } from './components/redux/rest.action';
import { addUser, loadFalse, loadTrue } from './components/redux/user.slice';
import RestItem from './components/RestItem/RestItem';
import RestList from './components/Restlist/RestList';
import SignIn from './components/SignIn/SignIn';
import Spinner from './components/Spinner/Spinner';
import { domainAddress } from './constants/api';

function App() {
  const loaded = useSelector((state) => state.userSlice.loaded);
  const user = useSelector((state) => state.userSlice);

  console.log('<<<<APP ', loaded, 'USER', user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestsAction());
    return () => {
      // логика для unmount
    };
  }, []);

  async function checkUser() {
    dispatch(loadFalse());// можно без него
    try {
      const response = await fetch(domainAddress, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data) {
        dispatch(addUser({
          id: data.id, name: data.name, login: data.login
        }));
      }
      dispatch(loadTrue());
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="container">
      {!loaded ? (<Spinner />) : (
        <>
          <Navbar />
          <div className="d-flex justify-content-center flex-column align-items-center">
            <Routes>
              <Route path="/" element={<ProtectedRoute flag={false} />}>
                <Route index element={<RestList />} />
              </Route>
              <Route path="/info" element={<div>Info</div>} />
              <Route element={<ProtectedRoute flag redirectTo="/" />}>
                <Route path="/signup" element={<FormReg />} />
                <Route path="/login" element={<SignIn />} />
              </Route>
              <Route
                path=":restId"
                element={<RestItem />}
              />
            </Routes>
          </div>
        </>
      )}

    </div>
  );
}

export default App;
