import "bootstrap/dist/css/bootstrap.min.css";
import { isloggedOutAction } from "../../redux/Action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UpdateMail from "./UpdateMail";
import UpdatePassword from "./UpdatePassword";

const ProfileForm = ({ LoggedOutAction, currState }) => {
  console.log("profile: ", currState.LoggedinState);
  if (currState.LoggedinState === false) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="container">
      <div className="col-md-4 p-4">
        <h2>Account settings</h2>
      </div>
      <div className="bg-white shadow rounded-lg ">
        <div className="row">
          <UpdateMail userIDtoken={currState.idToken} />
          <UpdatePassword userIDtoken={currState.idToken} />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    currState: {
      LoggedinState: state.isLoggedIn.LoggedInState,
      UserDetails: state.isLoggedIn.userDetails.localId,
      idToken: state.isLoggedIn.userDetails.idToken,
    },
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LoggedOutAction: () => dispatch(isloggedOutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
