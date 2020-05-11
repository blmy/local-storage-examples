import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";

const STORAGE_KEY = "USER";

//Reducer
const asyncReducer = (state, action) => {
  switch (action.type) {
    case "_saveUser":
      return action.payload;
    case "_getUser":
      return action.payload;
    case "_removeUser":
      return action.payload;
    default:
      return state;
  }
};

//Dispatch actions
const saveUser = (dispatch) => {
  return async (user) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, user);
      //es6 naming style, {user: user} === {user}
      dispatch({ type: "_saveUser", payload: { user } });
    } catch (e) {
      console.log("failed to save user.");
    }
  };
};

//Dispatch actions
const getUser = (dispatch) => {
  return async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      if (user !== null) {
        dispatch({ type: "_getUser", payload: { user } });
      }
    } catch (e) {
      console.log("failed to get user.");
    }
  };
};

//Disptach actions
const removeUser = (dispatch) => {
  return async (user) => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      dispatch({ type: "_removeUser", payload: {} });
    } catch (e) {
      console.log("failed to remove user.");
    }
  };
};

export const { Context, Provider } = createDataContext(
  asyncReducer,
  { saveUser, getUser, removeUser },
  {}
);
