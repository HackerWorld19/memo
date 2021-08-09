import classes from "./ProfileForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";

const UpdatePassword = (props) => {
  const newPassInputref = useRef();
  const confirmPassInputref = useRef();
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCVQKpjXQLl3CkG7OoAujevHav8g-NMa_s";

  const passwordHandler = (event) => {
    const passwordaddinfo = newPassInputref.current.value;
    const confirmPasswordinfo = confirmPassInputref.current.value;
    event.preventDefault();
    if (passwordaddinfo === confirmPasswordinfo) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: props.userIDtoken,
          password: passwordaddinfo,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log("password update completed", data);
          alert("password has been successfully updated");
          // isFunc.isLoggedIn(data.localId);
        })
        .catch((err) => {
          alert(err.message);
        });
      newPassInputref.current.value = "";
      confirmPassInputref.current.value = "";
    } else {
      alert("Password & confirm Password are not matching.");
    }
  };
  return (
    <div className="col-md-6 p-4 bg-light">
      <div className={classes.borderLeft}>
        <form onSubmit={passwordHandler}>
          <div
            className="tab-pane"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <div className="row">
              <div className="col-md-8">
                <div className={classes.formGroup}>
                  <label>New password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={newPassInputref}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className={classes.formGroup}>
                  <label>Confirm new password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={confirmPassInputref}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className={classes.floatLeft}>
              <button className="btn btn-primary mr-3">Change Password</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
