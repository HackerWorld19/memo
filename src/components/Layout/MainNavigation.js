import { Link } from "react-router-dom";
import React from "react";
import classes from "./MainNavigation.module.css";
import { isloggedOutAction } from "../../redux/Action";
import { connect } from "react-redux";
// import { useState } from "react";

const MainNavigation = ({ LoggedOutAction, currState }) => {
  // console.log("inside panel", currState.UserDetails);
  const LogOutHandler = () => {
    LoggedOutAction({ localId: "dummy", idToken: "dummy" });
  };
  // const { currstate, setState } = useState(LoginState);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>MemoRizer</div>
      </Link>
      <nav>
        <ul>
          {currState.LoggedinState === false && (
            <li>
              <Link to="/auth">Login/Signup</Link>
            </li>
          )}
          {currState.LoggedinState === true && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {currState.LoggedinState === true && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {currState.LoggedinState === true && (
            <li>
              <button onClick={LogOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    currState: {
      LoggedinState: state.isLoggedIn.LoggedInState,
      // UserDetails: state.isLoggedIn.userDetails.localId,
      // idToken: state.isLoggedIn.userDetails.idToken,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoggedOutAction: () => dispatch(isloggedOutAction()),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     isLogin: () => dispatch(isLoginAction()),
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
