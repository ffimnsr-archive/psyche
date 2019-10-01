import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";

import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

import { RootState } from "@/reducers";

export const pingEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.sesamePing)),
    mapTo(actions.sesamePong)
  );
