import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ flag, redirectTo = '/login' }) {
  const userId = useSelector((state) => state.userSlice.id);
  return (
    !!userId !== flag ? (<Outlet />) : (<Navigate to={redirectTo} replace />)
  );
}

export default ProtectedRoute;
