import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed}></Route>
  </>
);

// const ConfirmSeceretRoutes = () => (
//   <>
//   <Route exact path="/confirm" component={}></Route>
// </>
// );
const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth}></Route>
  </>
);
const Routes = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Routes;
