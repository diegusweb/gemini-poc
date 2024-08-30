import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { Topbar, Sidebar, MainContainer } from '../components';

export const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Topbar />
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Box>
  );
};