import React from 'react';
import { Typography, Grid, Container, Box, Button, Link, Divider, IconButton } from '@mui/material';
import { LOgout } from '../../components/logout/Logout';
import { Dashboard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const backList = () => {
        navigate('/DashBoard');
    };

    return (
        <><Container maxWidth="lg" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" align="center" sx={{ m: 2 }}>
                    React App Task Managament
                </Typography>



                <Box sx={{ m: 2, width: 100, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ m: 0 }}>

                        <IconButton onClick={backList}>
                            <Dashboard />
                        </IconButton>
                    </Box>
                    <Box sx={{ m: 0 }}>
                        <LOgout />
                    </Box>

                </Box>
            </Box><Divider />
            <Typography variant="h4" gutterBottom>
                My Profile
            </Typography>

            <Grid container spacing={3}>
                {/* User Information */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                        <Typography variant="h6">Personal Information</Typography>
                        {/* Display user details here */}
                    </Box>
                </Grid>

                {/* Additional Sections (e.g., Settings) */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                        <Typography variant="h6">Settings</Typography>
                        {/* Add settings options here */}
                    </Box>
                </Grid>
            </Grid>
        </Container></>
    );
};

export default Profile;
