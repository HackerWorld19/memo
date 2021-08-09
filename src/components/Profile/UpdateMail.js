import { useRef } from "react";
import classes from "./ProfileForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateMail = (props) => {
  const emailInputRef = useRef();
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCVQKpjXQLl3CkG7OoAujevHav8g-NMa_s";

  const emailhandler = (event) => {
    const emailaddinfo = emailInputRef.current.value;
    event.preventDefault();
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: props.userIDtoken,
        email: emailaddinfo,
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
            if (errorMessage === "EMAIL_EXISTS") {
              errorMessage = "This email has been already taken by otehr user";
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("email update completed", data);
        alert("email has been updated");
        // isFunc.isLoggedIn(data.localId);
      })
      .catch((err) => {
        alert(err.message);
      });
    emailInputRef.current.value = "";
  };

  return (
    <div className="col-md-6 p-4">
      <div className={classes.borderLeft}>
        <form onSubmit={emailhandler}>
          <div
            className="tab-pane"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <div className="row">
              <div className="col-md-8">
                <div className={classes.formGroup}>
                  <label>new Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    ref={emailInputRef}
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className={classes.floatLeft}>
              <button className="btn btn-primary mr-3">Change email</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMail;
