import React, { useReducer, useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Auth_Reducers from "../reducers/Auth_Reducers";
import { setCurrentUser } from "../actions/authActions";

import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(Auth_Reducers, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
      if (setShowChild) {
        dispatch(setCurrentUser(jwtDecode(decoded)));
      }
    }
    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.childern}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
