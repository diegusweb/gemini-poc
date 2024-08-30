import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './components';
import { ADMIN_POLICY, USER_POLICY } from './constants';
import { EasyLayout, MainLayout } from '../layouts';
import { LoginPage } from '../pages/auth/pages/login/LoginPage';
import { DashboardPage } from '../pages/app/pages/dashboard/DashboardPage';
import { PageNotFoundPage } from '../pages/common/page-not-found/PageNotFoundPage';
import { AdminTestPage } from '../pages/admin';



export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* auth */}
        <Route element={<EasyLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* app */}
        <Route path="/" element={<PrivateRoute roles={USER_POLICY} />}>
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* admin */}
        <Route path="/admin" element={<PrivateRoute roles={ADMIN_POLICY} />}>
          <Route element={<MainLayout />}>
            <Route index element={<AdminTestPage />} />
          </Route>
        </Route>

        {/* not found */}
        <Route element={<EasyLayout />}>
          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};