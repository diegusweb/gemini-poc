import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Loader, ToggleThemeMode } from "../../components";
import { getToken } from "../../utils/HelperFucntions";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { LOgout } from "../../components/logout/Logout";



export const Dashboard = () => {
    const { token, loading } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    console.log(token)
        console.log(getToken())
    
    if (token === "" || getToken() === "") {
        console.log("entro")
        console.log(token)
        console.log(getToken())
        navigate('/');
        return;
    }
  
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