import { useEffect } from "react";
import { clearCredentials, setCredentials, useAppDispatch } from "../../../../store";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../../../../types/enums/role.enum";

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const handleLoginAsUser = () => {
      dispatch(setCredentials({ token: 'token', role: RoleEnum.USER }));
      navigate('/', { replace: true });
    };
  
    const handleLoginAsAdmin = () => {
      dispatch(setCredentials({ token: 'token', role: RoleEnum.ADMIN }));
      navigate('/admin', { replace: true });
    };
  
    useEffect(() => {
      dispatch(clearCredentials());
    }, []);
  
    return (
      <Box
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1">
            Login
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={handleLoginAsUser}>
            Login como User
          </Button>
          <Button variant="contained" color="primary" onClick={handleLoginAsAdmin}>
            Login como Admin
          </Button>
        </Stack>
      </Box>
    );
  };