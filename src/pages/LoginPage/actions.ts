import { ThunkDispatch as Dispatch } from "redux-thunk";

import * as constants from "./actionTypes";
import { post } from "../../utils/http";
import { localEndpoint } from "../../config";
import { User } from "../../utils/interfaces";
import { setCurrentUser } from "../HomePage/actions";

export interface ICurrent {
  isAuthenticated: boolean;
  password: string;
  email: string;
}

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  payload: string;
}

export interface ISetEmail {
  type: constants.SET_EMAIL;
  payload: string;
}

export interface ISetPassword {
  type: constants.SET_PASSWORD;
  payload: string;
}

function authenticate(payload: string): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
    payload
  };
}

export function setEmail(payload: string): ISetEmail {
  return {
    type: constants.SET_EMAIL,
    payload
  };
}

export function setPassword(payload: string): ISetPassword {
  return {
    type: constants.SET_PASSWORD,
    payload
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function logIn(email: string, password: string) {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    //add login functionality
    let response;
    try {
      response = await post<User>(`${localEndpoint}auth/login`, {
        email,
        password
      });
      //set current user for profile
      await dispatch(setCurrentUser(response.parsedBody?.user));
      //set local storage
      window.localStorage.setItem("authenticated", "true");
      window.localStorage.setItem(
        "token",
        response.parsedBody?.token as string
      );
      window.localStorage.setItem("email", email);
      window.location.href = "./home";
      dispatch(authenticate(email));
    } catch (error) {
      return alert("failure when logging in try again");
    }
  };
}

export function logOut(email: string) {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    //add logout functionality
    window.localStorage.setItem("authenticated", "false");
    dispatch(unauthenticate());
  };
}

export function checkAuthentication(email: string) {
  return async (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const auth = window.localStorage.getItem("authenticated");
    const formattedAuth = typeof auth === "string" ? JSON.parse(auth) : null;

    formattedAuth ? dispatch(authenticate(email)) : dispatch(unauthenticate());
  };
}
