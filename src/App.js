
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_PATH } from './component/constants/Routes';
import Login from './component/pages/Login';
import Userdetails from './component/pages/UserDetails';
import { Provider } from 'react-redux';
import { Store } from './component/utils/Store/store';
import UpdateUser from './component/pages/UpdateUser';
import ProtectedRoute from './component/layout/PrivateRouter/privateRouter';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
          <Route
            path={ROUTE_PATH.DETAILS}
            element={<ProtectedRoute><Userdetails /></ProtectedRoute>}
          />
          <Route
            path={ROUTE_PATH.UPDATE_USER}
            element={<ProtectedRoute><UpdateUser /></ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
