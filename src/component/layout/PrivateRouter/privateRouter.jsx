import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

import { Store, persistor } from "../../utils/Store/store";
import { ROUTE_PATH } from '../../constants/Routes';

const ProtectedRoute = ({
  redirectPath = ROUTE_PATH.LOGIN,
  children,
}) => {
  const token = Store?.getState()?.login?.token;
  if (token !== '') {
    return children ? children : <Outlet />;
  }
  persistor.purge();
  persistor.flush();
  return <Navigate to={redirectPath} replace />;

};
export default ProtectedRoute;
