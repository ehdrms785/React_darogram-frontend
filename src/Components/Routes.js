import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import Post from "../Routes/Post";
const LoggedInRoutes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Feed}></Route>
      <Route exact path="/explore" component={Explore}></Route>
      <Route exact path="/search" component={Search}></Route>
      <Route path="/profile/:username/" component={Profile}></Route>
      <Route path="/p/:postId" component={Post}></Route>
      <Redirect from="*" to="/" />
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
    <Switch>
      <Route exact path="/" component={Auth}></Route>
      <Redirect from="*" to="/" />
    </Switch>
  </>
);
const Routes = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Routes;
