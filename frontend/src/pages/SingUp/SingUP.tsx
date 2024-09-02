import { Avatar, Box, Button, Checkbox, Container, CssBaseline, Divider, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material"
import { ToggleThemeMode } from "../../components"
import { Copyright } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { singup, useAppDispatch } from "../../store";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export const SingUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useAppDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSingUp = () => {
        console.log(email, password)
        if (email != "" && password != "") {
            dispatch(singup({
                "email": email,
                "password": password,
                "fullname": firstName + " " + lastName
            })).then((data) => {
                console.log(data)
                navigate('/');
            });
        }

    }

    const login = () => {
        navigate('/');
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => setFirstName(e.target.value)}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) => setLastName(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>

                    <Divider />

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSingUp}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" onClick={login} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>

            </Box>
        </Container>
    );
}
