import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { pingReducer, PingState } from "./ping";

export type RootState = {
  ping: PingState,
  router: RouterState,
};

export const createRootReducer = (history: History) => combineReducers({
  ping: pingReducer,
  router: connectRouter(history)
});
