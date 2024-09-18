import { Copyright, MusicNote } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Link, Paper, TextField, Theme, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getToken } from "../../utils/HelperFucntions";
import { login } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { makeStyles } from "@mui/styles";
import { ToggleThemeMode } from "../../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


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

interface LoginError {
    message: string;
}

export const Login = () => {
    const dispatch = useAppDispatch();
    const { token, loading } = useAppSelector((state) => state.auth);
    const classes = useStyles();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: {
            value: '',
            error: false,
            errorMessage: 'You must enter an email'
        },
        password: {
            value: '',
            error: false,
            errorMessage: 'You must enter an password'
        }
    })

    type FormValuesKeys = 'email' | 'password';

    useEffect(() => {
        if (getToken()) {
            navigate('/dashboard');
        }
    }, [token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as FormValuesKeys;
        const value = e.target.value;

        // Basic email validation regex
        const isValidEmail = /^[^@]+@[^@]+\.[^@]+$/.test(value);

        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value,
                error: name === 'email' ? !isValidEmail : formValues[name].error, // Validate email
                errorMessage: name === 'email' && !isValidEmail ? 'Invalid email format' : formValues[name].errorMessage
            }
        });
    }

    const handleLogin = (e: any) => {
        e.preventDefault();

        const formFields: FormValuesKeys[] = ['email', 'password']; // Specify the keys directly
        let newFormValues = { ...formValues };

        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            // Check for empty fields AND validate email if it's the email field
            if (currentValue === '' || (currentField === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(currentValue))) {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true,
                    },
                };
            } else {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: false,
                    },
                };
            }
        }
        setFormValues(newFormValues);

        const hasErrors = Object.values(newFormValues).some(
            (field) => field.error === true
        );

        if (!hasErrors) {
            dispatch(login({
                "email": formValues.email.value,
                "password": formValues.password.value
            })).then((data) => {
                if (data.type.endsWith('/rejected')) {
                    const errorMessage = (data.payload.error as LoginError)?.message || 'Login failed';
                } else {
                    // Login successful
                    navigate('/dashboard');
                }

            }).catch((err) => {
                console.log("--------------s-------------" + err)
            });
        } else {
            toast.error("Please fill all the fields", {
                autoClose: 2000,
                hideProgressBar: true,
                position: "bottom-right",
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
            });
        }
    }

    const singup = () => {
        navigate('/signup');
    }


    return (<Grid container component="main" className={classes.root}>

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
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="email"
                        name="email"
                        autoFocus
                        error={formValues.email.error}
                        value={formValues.email.value}
                        helperText={formValues.email.error && formValues.email.errorMessage}
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={formValues.password.error}
                        value={formValues.password.value}
                        helperText={formValues.password.error && formValues.password.errorMessage}
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