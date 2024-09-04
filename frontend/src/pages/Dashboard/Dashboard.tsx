import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Loader, ToggleThemeMode } from "../../components";
import { getToken } from "../../utils/HelperFucntions";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { LOgout } from "../../components/logout/Logout";
import { useEffect } from "react";
import { getAllTasks, selectTasks } from "../../store/slices/taskSlice";



export const Dashboard = () => {
  //const { token, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  if (getToken() === "") {
    navigate('/');
    return;
  }

  useEffect(() => {
    console.log(tasks)
    if (tasks.status === 'idle') {
      dispatch(getAllTasks({}));
    }
  }, [tasks.status, dispatch]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          React App From Home
        </Typography>

        <Box sx={{ m: 2 }}>
          <ToggleThemeMode />
        </Box>
        <Box sx={{ m: 2 }}>
          <LOgout />
        </Box>
      </Box>

      <Divider />

      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={4}>
          {/* {isLoadingUsers ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', m: 4 }}>
                <Loader />
              </Box>
            ) : (
              users?.map((user:any) => (
                <Grid item lg={4} md={6} sm={6} xs={12} width="100%" key={user.id}>
                  <UserCard user={user} />
                </Grid>
              ))
            )} */}
        </Grid>
      </Container>
    </>
  );
};