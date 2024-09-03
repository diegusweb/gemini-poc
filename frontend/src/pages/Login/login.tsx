import { Copyright, MusicNote } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Theme, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/HelperFucntions";
import { login } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { makeStyles } from "@mui/styles";
import { ToggleThemeMode } from "../../components";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    size: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },

    paper: {
        margin: theme.spacing(2, 6),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const { token, loading } = useAppSelector((state) => state.auth);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (token || getToken()) {
            navigate('/dashboard');
        }
    }, [token]);

    const handleLogin = () => {
        console.log(email, password)
        if (email != "" && password != "") {
            dispatch(login({
                "email": email,
                "password": password
            })).then(() => {
                navigate('/dashboard');
            });
        }

    }

    const singup = () => {
        navigate('/signup');
    }


    return (<Grid container component="main" className={classes.root}>

        <Box sx={{ m: 2 }}>
            <ToggleThemeMode />
        </Box>
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
        <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={1}
            square
        >
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        color="primary"
                        fullWidth
                        variant="contained"
                        onClick={handleLogin}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" onClick={singup} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </form>
            </div>
        </Grid>
    </Grid>)

}