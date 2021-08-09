import { useRef, React } from "react";
import { connect } from "react-redux";
import classes from "./AuthForm.module.css";
import { Redirect } from "react-router-dom";
import {
  isLoadingAction,
  isLoginAction,
  isLoggedInAction,
} from "../../redux/Action";

// import axios from "axios";

const AuthForm = ({ isFunc, currState }) => {
  // const [isLogin, setIsLogin] = useState(true);
  let url;

  console.log("current LoggedIn state:", currState.currLoggedInState);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    // setIsLogin((prevState) => !prevState);
    isFunc.isLogin();
    console.log("current Login State: ", currState.currLoginState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    isFunc.isLoading();

    if (currState.currLoginState === true) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVQKpjXQLl3CkG7OoAujevHav8g-NMa_s";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVQKpjXQLl3CkG7OoAujevHav8g-NMa_s";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        isFunc.isLoading();
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            if (errorMessage === "EMAIL_EXISTS") {
              errorMessage = "This email has been already taken by otehr user";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Sucess: _____", data);
        // isFunc.isLoggedIn(data.localId);
        isFunc.isLoggedIn({ localId: data.localId, idToken: data.idToken });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (currState.currLoggedInState === true) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <section className={classes.auth}>
      <h1>{currState.currLoginState === true ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            data-testid="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            data-testid="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {currState.currLoadingState === true ? (
            <button>
              {currState.currLoginState === true ? "Login" : "Create Account"}
            </button>
          ) : (
            <p>Is loading....</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {currState.currLoginState === true
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isFunc: {
      isLoading: () => dispatch(isLoadingAction()),
      isLogin: () => dispatch(isLoginAction()),
      isLoggedIn: (data) => dispatch(isLoggedInAction(data)),
    },
  };
};

const mapStateToProps = (state) => {
  return {
    currState: {
      currLoadingState: state.isLoading.currState,
      currLoginState: state.isLogin.currState,
      currLoggedInState: state.isLoggedIn.LoggedInState,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
