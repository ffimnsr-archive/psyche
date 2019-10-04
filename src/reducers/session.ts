import { ActionType, getType } from "typesafe-actions";
import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

export interface SessionState {
  readonly isPinging: boolean;
}

const initialState: SessionState = {
  isPinging: false
};

export const pingReducer = (state: SessionState = initialState, action: Action): SessionState => {
  switch (action.type) {
    case getType(actions.sesamePing):
      return Object.assign({}, state, { isPinging: true });
    case getType(actions.sesamePong):
      return Object.assign({}, state, { isPinging: false });
    default:
      return state;
  }
};
