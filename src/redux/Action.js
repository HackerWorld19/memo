import {
  IS_LOADING,
  IS_LOGIN,
  IS_LOGGED_IN,
  IS_LOGGED_OUT,
} from "./ActionTypes";

export const isLoginAction = () => {
  return {
    type: IS_LOGIN,
  };
};

export const isLoadingAction = () => {
  return {
    type: IS_LOADING,
  };
};

export const isLoggedInAction = (data) => {
  return {
    type: IS_LOGGED_IN,
    payload: data,
  };
};

export const isloggedOutAction = (data) => {
  return {
    type: IS_LOGGED_OUT,
    payload: data,
  };
};
