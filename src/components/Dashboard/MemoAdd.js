import "bootstrap/dist/css/bootstrap.min.css";
import firedb from "../../firebase";
import React from "react";
import "mdbreact/dist/css/mdb.css";
import { v4 as uuidV4 } from "uuid";

const MemoAdd = (props) => {
  const memoTitle = React.useRef();
  const memoDetails = React.useRef();
  const uniqueID = uuidV4();

  //* adding entry in the firestone onClick........
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddStatus(true);
    console.log("Inside MemoAdd: ", props.userDetails);
    firedb
      .collection("userData")
      .doc(uniqueID)
      .set({
        uniqueUserID: uniqueID,
        userID: props.userDetails,
        title: memoTitle.current.value,
        memo: memoDetails.current.value,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    //setting up the blank after form submission......
    memoTitle.current.value = " ";
    memoDetails.current.value = " ";
  };

  return (
    <React.Fragment>
      <div className="col-md-4 p-4 border">
        <form>
          <h1>What's in your Mind ?</h1>
          <hr></hr>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                data-testid="memoTitle"
                ref={memoTitle}
                required
              ></input>
            </div>
          </div>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Your Memo
          </label>
          <textarea
            className="form-control"
            data-testid="memoDetails"
            rows="3"
            ref={memoDetails}
            required
          ></textarea>
          <div className="col-md-5 p-2">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={submitHandler}
            >
              Add Memo
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MemoAdd;
