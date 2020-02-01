import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";

let composeEnhancers;

if (
  process.env.NODE_ENV !== "production" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
