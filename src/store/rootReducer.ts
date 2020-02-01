import { combineReducers } from "redux";
import login from "../pages/LoginPage/reducer";
import signup from "../pages/SignUpPage/reducer";

const rootReducer = combineReducers({
  login,
  signup
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
