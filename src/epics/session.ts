import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { filter, map, catchError, switchMap } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { RootState } from "@/reducers";
import * as actions from "@/actions";
import { signIn } from "@/apis";

type Action = ActionType<typeof actions>;

export const signInEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.sesameSignIn)),
    switchMap(action =>
      from(signIn(action.payload.email, action.payload.password)).pipe(
        map(actions.sesameSetSession),
        catchError((error) => of(actions.sesameError(error))),
      ),
    ),
  );
