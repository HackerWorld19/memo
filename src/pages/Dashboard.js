import "bootstrap/dist/css/bootstrap.min.css";
import firedb from "../firebase";
import React from "react";
import "mdbreact/dist/css/mdb.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import MemoAdd from "../components/Dashboard/MemoAdd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = ({ currState }) => {
  //** initiliazing the state */
  const [documents, setDocuments] = React.useState([]);
  const [memoAddStatus, setmemoAddStatus] = React.useState(false);
  // const [DeleteState, setDeleteState] = React.useState(false);
  const memoUnique = React.useRef();

  //* fetching the data *//
  const uniqueID = currState.UserDetails;
  console.log("uniqueID", typeof uniqueID, "  ", memoAddStatus, " ", currState);
  React.useEffect(() => {
    firedb
      .collection("userData")
      .where("userID", "==", uniqueID === undefined ? "" : uniqueID)
      .get()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        );
        setDocuments(arr);
      });
    setmemoAddStatus(false);
    // setDeleteState(false);
  }, [uniqueID, memoAddStatus]);
  documents.forEach((docs) => {
    console.log(docs.value);
  });

  //* clicking delete button to delete data *//
  // const deleteMemo = () => {
  //   console.log("I have clicked delete: ", memoUnique.current.textContent);
  // firedb
  //   .collection("userData")
  //   .doc(memoUnique.current.textContent)
  //   .delete()
  //   .then(() => {
  //     console.log("Document is successfully deleted");
  //   })
  //   .catch((error) => {
  //     console.log("error in deletion: ", error);
  //   });
  // setDeleteState(true);

  //updating the state of memo Add element....
  const addStatusHandler = (currStatus) => {
    console.log("parent_task:", currStatus);
    setmemoAddStatus(currStatus);
  };
  if (currState.LoggedinState === false) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <div className="row">
        <MemoAdd onAddStatus={addStatusHandler} userDetails={uniqueID} />
        <div className="col-md-8 p-4">
          <div className="row">
            <h1 className="p-1">Your Memo</h1>
            <hr></hr>
            {documents.map((blog) => {
              return (
                <div
                  className="p-3 col-md-3 ms-1 mt-1 rounded shadow rounded-lg bg-warning"
                  key={blog.id}
                >
                  <div className="row">
                    <div className="col-md-9">
                      <h6>{blog.value.title}</h6>
                    </div>
                    {/* <div className="col-md-3">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="float-right"
                        onClick={deleteMemo}
                      />
                    </div> */}
                  </div>
                  <p>{blog.value.memo}</p>
                  <p ref={memoUnique} className="d-none">
                    {blog.value.uniqueUserID}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

//fetching the userDetails using redux....
const mapStateToProps = (state) => {
  return {
    currState: {
      LoggedinState: state.isLoggedIn.LoggedInState,
      UserDetails: state.isLoggedIn.userDetails.localId,
      idToken: state.isLoggedIn.userDetails.idToken,
    },
  };
};

export default connect(mapStateToProps)(Dashboard);
