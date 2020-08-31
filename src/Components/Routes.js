import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
const LoggedInRoutes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Feed}></Route>
      <Route exact path="/explore" component={Explore}></Route>
      <Route exact path="/search" component={Search}></Route>
      <Route path="/profile/:username/" component={Profile}></Route>
    </Switch>
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
