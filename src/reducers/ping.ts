import { ActionType, getType } from "typesafe-actions";
import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

export interface PingState {
  readonly isPinging: boolean;
}

const initialState: PingState = {
  isPinging: false
};

export const pingReducer = (state: PingState = initialState, action: Action): PingState => {
  switch (action.type) {
    case getType(actions.sesamePing):
      return Object.assign({}, state, { isPinging: true });
    case getType(actions.sesamePong):
      return Object.assign({}, state, { isPinging: false });
    default:
      return state;
  }
};
