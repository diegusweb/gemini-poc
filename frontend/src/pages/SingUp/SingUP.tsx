import { Avatar, Box, Button, Checkbox, Container, CssBaseline, Divider, FormControlLabel, Grid, Link, TextField, Theme, Typography } from "@mui/material"
import { ToggleThemeMode } from "../../components"
import { Copyright } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { singup, useAppDispatch } from "../../store";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChangeEvent } from 'react';


const useStyles = makeStyles((theme: Theme) => ({
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

    const [formValues, setFormValues] = useState({
        firstName: {
            value: '',
            error: false,
            errorMessage: 'You must enter a firstName'
        },
        lastName: {
            value: '',
            error: false,
            errorMessage: 'You must enter an lastName'
        },
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

    type FormValuesKeys = 'firstName' | 'lastName' | 'email' | 'password';

    const dispatch = useAppDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

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

    const handleSingUp = (e: any) => {
        e.preventDefault();

        const formFields: FormValuesKeys[] = ['firstName', 'lastName', 'email', 'password']; // Specify the keys directly
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
            dispatch(singup({
                "email": formValues.email.value,
                "password": formValues.password.value,
                "firtName": formValues.firstName.value,
                "lastName": formValues.lastName.value
            })).then((data) => {
                toast.success("Success for user new", {
                    autoClose: 2000, hideProgressBar: true, position: "bottom-right",
                    closeOnClick: true, pauseOnHover: true, theme: "colored",
                });

                navigate('/');
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
                                onChange={handleChange}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={formValues.firstName.error}
                                value={formValues.firstName.value}
                                helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                error={formValues.lastName.error}
                                value={formValues.lastName.value}
                                helperText={formValues.lastName.error && formValues.lastName.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={formValues.email.error}
                                value={formValues.email.value}
                                helperText={formValues.email.error && formValues.email.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
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
                    <Grid container justifyContent="flex-end">
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
