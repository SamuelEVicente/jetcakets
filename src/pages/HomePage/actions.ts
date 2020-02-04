import * as constants from "./actionTypes";

export interface IHomeState {
  currentUser: any;
}

export interface ISetCurrentUser {
  type: constants.SET_CURRENT_USER;
  payload: string;
}

export function setCurrentUser(payload: any): ISetCurrentUser {
  return {
    type: constants.SET_CURRENT_USER,
    payload
  };
}
