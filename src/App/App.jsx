import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <Container maxWidth="xs">
      {alert.message && <Alert severity={alert.type === "alert-danger" ? "error" : "success"}>{alert.message}</Alert>}
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
      <Box mt={2}>
      <Typography
        variant="subtitle2"
        color="primary"
        align="center"
      >
        ALTIMETRIK Assignment Submited by
      </Typography>
      <Typography
        variant="subtitle2"
        color="textPrimary"
        align="center"
      >
        Nagendra Prasad SBR.
        nagendra.sbr@gmail.com
      </Typography>
      </Box>
    </Container>
  );
}

export { App };
