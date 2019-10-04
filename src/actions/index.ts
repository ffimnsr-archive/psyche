import { createAction } from "typesafe-actions";

import {
  SESAME_SIGN_IN,
  SESAME_SIGN_UP,
  SESAME_SET_SESSION,
  SESAME_GET_SESSION,
  SESAME_ERROR,
  SESAME_PING,
  SESAME_PONG,
} from "../constants";

export const sesameSignIn = createAction(SESAME_SIGN_IN, resolve => (email: string, password: string) => resolve({email, password}));
export const sesameSignUp = createAction(SESAME_SIGN_UP, resolve => (email: string, password: string) => resolve({email, password}));
export const sesameSetSession = createAction(SESAME_SET_SESSION, resolve => (session: Response) => resolve(session));
export const sesameGetSession = createAction(SESAME_GET_SESSION);
export const sesameError = createAction(SESAME_ERROR, resolve => (error: Error) => resolve(error));
export const sesamePing = createAction(SESAME_PING);
export const sesamePong = createAction(SESAME_PONG);
