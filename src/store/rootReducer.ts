import { combineReducers } from "redux";
import login from "../pages/LoginPage/reducer";
import signup from "../pages/SignUpPage/reducer";
import home from "../pages/HomePage/reducer";

const rootReducer = combineReducers({
  login,
  signup,
  home
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
