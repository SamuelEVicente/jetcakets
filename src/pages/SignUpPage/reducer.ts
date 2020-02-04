import {
  ICurrent,
  ISetAddress,
  ISetBirthdate,
  ISetPhone,
  ISetSecurityQuestion,
  ISetSecurityAnswer,
  ISetPasswordVerification,
  ISetPhotoUrl
} from "./actions";
import { ISetEmail, ISetPassword } from "../LoginPage/actions";
import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_VERIFICATION,
  SET_PHONE,
  SET_ADDRESS,
  SET_BIRTHDATE,
  SET_SECURITY_QUESTION,
  SET_SECURITY_ANSWER,
  SET_PHOTO_URL
} from "./actionTypes";

export default function currentReducer(
  state: ICurrent = {
    email: "",
    password: "",
    passverification: "",
    birthdate: "",
    phone: "",
    photoUrl: "",
    address: "",
    securityQuestions: ["", "", ""],
    securityAnswers: ["", "", ""]
  },
  action:
    | ISetEmail
    | ISetPassword
    | ISetAddress
    | ISetBirthdate
    | ISetPhone
    | ISetSecurityQuestion
    | ISetSecurityAnswer
    | ISetPasswordVerification
    | ISetPhotoUrl
): ICurrent {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case SET_PASSWORD_VERIFICATION:
      return {
        ...state,
        passverification: action.payload
      };
    case SET_PHONE:
      return {
        ...state,
        phone: action.payload
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case SET_BIRTHDATE:
      return {
        ...state,
        birthdate: action.payload
      };
    case SET_SECURITY_QUESTION:
      return {
        ...state,
        securityQuestions: action.payload
      };
    case SET_SECURITY_ANSWER:
      return {
        ...state,
        securityAnswers: action.payload
      };
    case SET_PHOTO_URL:
      return {
        ...state,
        photoUrl: action.payload
      };
    default: {
      return state;
    }
  }
}
