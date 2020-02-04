import { ISetCurrentUser, IHomeState } from "./actions";
import { SET_CURRENT_USER } from "./actionTypes";

export default function currentReducer(
  state: IHomeState = {
    currentUser: {}
  },
  action: ISetCurrentUser
): IHomeState {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default: {
      return state;
    }
  }
}
