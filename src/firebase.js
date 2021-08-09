import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCVQKpjXQLl3CkG7OoAujevHav8g-NMa_s",
  authDomain: "react-app-dc7a6.firebaseapp.com",
  databaseURL: "https://react-app-dc7a6-default-rtdb.firebaseio.com",
  projectId: "react-app-dc7a6",
  storageBucket: "react-app-dc7a6.appspot.com",
  messagingSenderId: "830656349618",
  appId: "1:830656349618:web:c5336ea2f825363d3110ab",
  measurementId: "G-L5X6DV99FJ",
};

firebase.initializeApp(firebaseConfig);
const firedb = firebase.firestore();

export default firedb;
