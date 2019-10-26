import { ActionType, getType } from "typesafe-actions";
import { Session } from "@/models";
import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

export interface SessionState {
  readonly isLoading: boolean;
  readonly currentSession?: Session;
}

const initialState: SessionState = {
  isLoading: false
};

export const sessionReducer = (state: SessionState = initialState, action: Action): SessionState => {
  switch (action.type) {
    case getType(actions.sesameSignIn):
      return Object.assign({}, state, { isLoading: true });
    case getType(actions.sesameSignUp):
      return Object.assign({}, state, { isLoading: true });
    case getType(actions.sesameSetSession):
      return Object.assign({}, state, { isLoading: false, currentSession: new Session(action.payload) });
    case getType(actions.sesameError):
      console.error(action.payload.message);
      return state;
    default:
      return state;
  }
};
