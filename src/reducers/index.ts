import { History } from "history";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { pingReducer, PingState } from "./ping";

export type RootState = {
  ping: PingState,
  router: any,
};

export const createRootReducer = (history: History) => combineReducers({
  ping: pingReducer,
  router: connectRouter(history)
});
