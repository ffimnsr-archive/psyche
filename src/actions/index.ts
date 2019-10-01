import { createAction } from "typesafe-actions";

import {
  SESAME_SIGN_IN,
  SESAME_SIGN_UP,
  SESAME_ERROR,
  SESAME_PING,
  SESAME_PONG,
} from "../constants";

export const sesameSignIn = createAction(SESAME_SIGN_IN);
export const sesameSignUp = createAction(SESAME_SIGN_UP);
export const sesameError = createAction(SESAME_ERROR, resolve => (error: Error) => resolve(error));
export const sesamePing = createAction(SESAME_PING);
export const sesamePong = createAction(SESAME_PONG);
