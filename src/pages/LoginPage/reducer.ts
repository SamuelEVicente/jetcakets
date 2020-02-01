
import { ICurrent, IAuthenticate, IUnauthenticate, ISetEmail, ISetPassword } from './actions'
import { AUTHENTICATE, UNAUTHENTICATE, SET_EMAIL, SET_PASSWORD } from './actionTypes'

export default function currentReducer(
    state: ICurrent = {
        email: "",
        password: "",
        isAuthenticated: false,
    },
    action: IAuthenticate | IUnauthenticate | ISetEmail | ISetPassword,
): ICurrent {
    switch (action.type) {
        case AUTHENTICATE:
            return { ...state, email: action.payload, isAuthenticated: true };
        case SET_EMAIL:
            return {
                ...state, email: action.payload
            };
        case SET_PASSWORD:
            return {
                ...state, password: action.payload
            };
        case UNAUTHENTICATE:
            return { email: "", isAuthenticated: false, password: "" };
        default: {
            return state
        }
    }
}