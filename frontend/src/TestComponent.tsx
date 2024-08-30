import { Box, Typography, Divider, Container, Grid } from '@mui/material';

import { useGetUsersQuery } from './store';
import { ToggleThemeMode } from './components/toggle-theme-mode/ToggleThemeMode';
import { Loader } from './components';
import { UserCard } from './components/user-card/UserCard';

export const TestComponent = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          React App From Scratch
        </Typography>

        <Box sx={{ m: 2 }}>
          <ToggleThemeMode />
        </Box>
      </Box>

      <Divider />

      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={4}>
          {isLoadingUsers ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', m: 4 }}>
              <Loader />
            </Box>
          ) : (
            users?.map((user:any) => (
              <Grid item lg={4} md={6} sm={6} xs={12} width="100%" key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};