import { Observable } from "rxjs";
import { filter, mapTo } from "rxjs/operators";

export const sessionEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(action => action.type === "PING"),
    mapTo({ type: "PONG" })
  );

interface SessionState {
  isPinging: boolean;
}

const initialState: SessionState = {
  isPinging: false
};

export const sessionReducer = (state: SessionState = initialState, action: any): PingState => {
  switch (action.type) {
    case "PING":
      return { isPinging: true };
    case "PONG":
      return { isPinging: false };
    default:
      return state;
  }
};
