import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { userActions } from "../_actions";

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
    marginTop: theme.spacing(1),
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

function LoginPage() {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  //reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} name="signinform" noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={handleChange}
          error={submitted && !username}
        />
        {submitted && !username && (
          <Typography color="error" variant="subtitle1">
            Username is required
          </Typography>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
          error={submitted && !password}
        />
        {submitted && !password && (
          <Typography color="error" variant="subtitle1">
            Password is required
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={loggingIn}
        >
          {loggingIn && <CircularProgress size={20} />} Sign In
        </Button>
        <Link to="/register" className={classes.link}>
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
}

export { LoginPage };
