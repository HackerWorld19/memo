import {
  IS_LOADING,
  IS_LOGIN,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
} from "./ActionTypes";

import { combineReducers } from "redux";

const initialLoadingState = {
  currState: true,
};

const initialLoginState = {
  currState: false,
};

const initialLoggedInState = {
  LoggedInState: false,
  userDetails: {},
};

// const initialLoggedOutState = {
//   LoggedOutState: false,
//   userDetails: [],
// };

const initialLoadingReducer = (state = initialLoadingState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        currState: !state.currState,
      };
    default:
      return state;
  }
};

const initialLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        currState: !state.currState,
      };
    default:
      return state;
  }
};

const initialLoggedInReducer = (state = initialLoggedInState, action) => {
  // console.log("paylod+++", action);
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        ...state,
        LoggedInState: true,
        userDetails: action.payload,
      };
    case IS_LOGGED_OUT:
      return {
        ...state,
        LoggedInState: false,
        // userDetails: action.payload,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  isLoading: initialLoadingReducer,
  isLogin: initialLoginReducer,
  isLoggedIn: initialLoggedInReducer,
});

export default reducer;
