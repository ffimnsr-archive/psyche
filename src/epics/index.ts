import { combineEpics } from "redux-observable";
import { pingEpic } from "./ping";
import { signInEpic, signUpEpic } from "./session";

export const rootEpic = combineEpics(
  pingEpic,
  signInEpic,
  signUpEpic,
);
