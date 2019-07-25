import { History } from "history";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { connectRouter } from "connected-react-router";
import { pingEpic, pingReducer } from "./ping";

export const rootEpic = combineEpics(
  pingEpic
);

export const createRootReducer = (history: History) => combineReducers({
  pingReducer,
  router: connectRouter(history)
});
