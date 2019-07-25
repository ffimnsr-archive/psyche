import { Observable } from "rxjs";
import { filter, mapTo } from "rxjs/operators";

export const pingEpic = (action$: Observable<any>) =>
  action$.pipe(
    filter(action => action.type === "PING"),
    mapTo({ type: "PONG" })
  );

interface PingState {
  isPinging: boolean;
}

const initialState: PingState = {
  isPinging: false
};

export const pingReducer = (state: PingState = initialState, action: any): PingState => {
  switch (action.type) {
    case "PING":
      return { isPinging: true };
    case "PONG":
      return { isPinging: false };
    default:
      return state;
  }
};
