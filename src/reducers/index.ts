import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { pingReducer, PingState } from "./ping";
import { sessionReducer, SessionState } from "./session";

export type RootState = {
  ping: PingState,
  session: SessionState,
  router: RouterState,
};

export const createRootReducer = (history: History) => combineReducers({
  ping: pingReducer,
  session: sessionReducer,
  router: connectRouter(history)
});
