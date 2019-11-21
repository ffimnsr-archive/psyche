import { Epic } from "redux-observable";
import { filter, mapTo } from "rxjs/operators";
import { ActionType, isActionOf } from "typesafe-actions";
import { RootState } from "@/reducers";
import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

export const pingEpic: Epic<Action, Action, RootState> = action$ =>
	action$.pipe(
		filter(isActionOf(actions.sesamePing)),
		mapTo(actions.sesamePong())
	);
