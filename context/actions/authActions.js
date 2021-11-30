import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseURL";
import jwtDecode from "jwt-decode";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export let isAdmin;

export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        isAdmin = data.isAdmin;
        console.log(isAdmin);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded, user)); // todo
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
      logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
  fetch(`${baseURL}user/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
