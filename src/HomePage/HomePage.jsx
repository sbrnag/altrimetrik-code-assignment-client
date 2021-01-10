import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

function HomePage() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <Box mt={9} mb={9}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Hi {user.username}!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            You're logged in
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography
              color="textPrimary"
              align="center"
              variant="h6"
            >
              Full Name : {user.firstName} {user.lastName}
            </Typography>
            <Typography color="textPrimary" align="center" variant="h6">
              Gender : {user.gender}
            </Typography>
            <Typography color="textPrimary" align="center" variant="h6">
              Email : {user.email}
            </Typography>
            <Typography color="textPrimary" align="center" variant="h6">
              Country : {user.country}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export { HomePage };
