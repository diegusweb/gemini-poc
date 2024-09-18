import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { logout, toggleThemeMode, useAppDispatch, useAppSelector } from '../../store';
import { ThemeModeEnum } from '../../types';

import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export const LOgout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const logoutHandle = () => {
    dispatch(logout()).then(() => {
      sessionStorage.removeItem('token');
      navigate('/');
    });
  };

  return (
    <IconButton onClick={logoutHandle}>
      <LogoutIcon />
    </IconButton>
  );
};