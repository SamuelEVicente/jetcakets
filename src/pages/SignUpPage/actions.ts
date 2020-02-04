import { ThunkDispatch as Dispatch } from "redux-thunk";
import { ISetEmail, ISetPassword } from "../LoginPage/actions";
import * as constants from "./actionTypes";
import { post } from "../../utils/http";
import { User } from "../../utils/interfaces";
import { localEndpoint } from "../../config";
export type SecurityQuestion = {
  question: string;
  answer: string;
};

export interface ICurrent {
  phone: string;
  photoUrl: string;
  address: string;
  birthdate: string;
  password: string;
  passverification: string;
  email: string;
  securityQuestions: Array<string>;
  securityAnswers: Array<string>;
}

export interface ISetPhone {
  type: constants.SET_PHONE;
  payload: string;
}

export interface ISetAddress {
  type: constants.SET_ADDRESS;
  payload: string;
}

export interface ISetBirthdate {
  type: constants.SET_BIRTHDATE;
  payload: string;
}

export interface ISetSecurityQuestion {
  type: constants.SET_SECURITY_QUESTION;
  payload: Array<string>;
}
export interface ISetSecurityAnswer {
  type: constants.SET_SECURITY_ANSWER;
  payload: Array<string>;
}

export interface ISetPasswordVerification {
  type: constants.SET_PASSWORD_VERIFICATION;
  payload: string;
}

export interface ISetPhotoUrl {
  type: constants.SET_PHOTO_URL;
  payload: string;
}

export function setAddress(payload: string): ISetAddress {
  return {
    type: constants.SET_ADDRESS,
    payload
  };
}

export function setPhone(payload: string): ISetPhone {
  return {
    type: constants.SET_PHONE,
    payload
  };
}

export function setBirthdate(payload: string): ISetBirthdate {
  return {
    type: constants.SET_BIRTHDATE,
    payload
  };
}

export function changeField(field: any, payload: any) {
  switch (field) {
    case "phone":
      return {
        type: constants.SET_PHONE,
        payload
      };
    case "email":
      return {
        type: constants.SET_EMAIL,
        payload
      };
    case "address":
      return {
        type: constants.SET_ADDRESS,
        payload
      };
    case "birthdate":
      return {
        type: constants.SET_BIRTHDATE,
        payload
      };
    case "password":
      return {
        type: constants.SET_PASSWORD,
        payload
      };
    case "passverification":
      return {
        type: constants.SET_PASSWORD_VERIFICATION,
        payload
      };
    case "secq":
      return {
        type: constants.SET_SECURITY_QUESTION,
        payload
      };
    case "secqr":
      return {
        type: constants.SET_SECURITY_ANSWER,
        payload
      };
  }
}

export type SetFieldAction =
  | ISetEmail
  | ISetPassword
  | ISetPhone
  | ISetAddress
  | ISetBirthdate;

export function signUp(
  email: string,
  password: string,
  birth: string,
  address: string,
  phone: string,
  photoUrl: string,
  securityQuestions: Array<string>,
  securityAnswers: Array<string>
) {
  return async (dispatch: Dispatch<SetFieldAction, {}, any>) => {
    //add signup functionality;
    try {
      let res = await post<User>(`${localEndpoint}user/`, {
        email,
        password,
        birth,
        phone,
        photoUrl,
        address,
        securityAnswers,
        securityQuestions,
        role: "ADMIN"
      });
      return res.parsedBody?.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
