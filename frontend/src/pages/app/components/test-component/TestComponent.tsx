import { Box, Container, Grid } from "@mui/material";

import { useGetUsersQuery } from "../../../../store";
import { Loader } from "../../../../components";
import { UserCard } from "../user-card/UserCard";

export const TestComponent = () => {
    const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  
    return (
      <Container maxWidth="lg" sx={{ px: 2, py: 3 }}>
        <Grid container spacing={4}>
          {isLoadingUsers ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', m: 4 }}>
              <Loader />
            </Box>
          ) : (
            users?.map((user) => (
              <Grid item lg={4} md={6} sm={6} xs={12} width="100%" key={user.id}>
                <UserCard user={user} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    );
  };