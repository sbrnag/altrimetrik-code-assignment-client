import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import countriesJSON from "./countries.json";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { userActions } from "../_actions";

const COUNTRIES = countriesJSON.countries;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    gender: "",
    country: null,
  });

  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  useEffect(() => {
    if (user.password) {
      if (user.password.length >= 6) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    }
  }, [user.password]);

  useEffect(() => {
    if (user.email) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (pattern.test(user.email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleCountryChange = (e, value) => {
    setUser((user) => ({ ...user, country: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password && 
      isValidPassword &&
      user.email &&
      isValidEmail &&
      user.gender &&
      user.country
    ) {
      dispatch(userActions.register(user));
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form name="singupform" className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="User Name"
              autoFocus
              onChange={handleChange}
              error={submitted && !user.username}
            />
            {submitted && !user.username && (
              <Typography color="error" variant="subtitle1">
                User Name is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              error={
                (submitted && !user.password) ||
                (submitted && !!user.password && !isValidPassword)
              }
            />
            {submitted && !user.password && (
              <Typography color="error" variant="subtitle1">
                Password is required
              </Typography>
            )}
            {submitted && user.password && !isValidPassword && (
              <Typography color="error" variant="subtitle1">
                Minimum password length is 6 characters
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              error={
                (submitted && !user.email) || (submitted && !!user.email && !isValidEmail)
              }
            />
            {submitted && !user.email && (
              <Typography color="error" variant="subtitle1">
                Email is required
              </Typography>
            )}
            {submitted && user.email && !isValidEmail && (
              <Typography color="error" variant="subtitle1">
                Email is not valid
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleChange}
                  error={submitted && !user.firstName}
                />
                {submitted && !user.firstName && (
                  <Typography color="error" variant="subtitle1">
                    First Name is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  error={submitted && !user.lastName}
                />
                {submitted && !user.lastName && (
                  <Typography color="error" variant="subtitle1">
                    Last Name is required
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" error={submitted && !user.gender}>
                Gender *
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio color="primary" />}
                      label="Other"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
            {submitted && !user.gender && (
              <Typography color="error" variant="subtitle1">
                Gender is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              autoComplete
              includeInputInList
              id="countries-drop-down"
              name="country"
              options={COUNTRIES}
              getOptionLabel={(option) => option.name}
              value={user.country}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Country *"
                  variant="outlined"
                  error={submitted && !user.country}
                />
              )}
            />
            {submitted && !user.country && (
              <Typography color="error" variant="subtitle1">
                country is required
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={registering}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {registering && <CircularProgress size={20} />} Sign Up
            </Button>
            <Link to="/login" className={classes.link}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export { RegisterPage };
