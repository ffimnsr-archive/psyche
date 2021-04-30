/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from "lodash";
import md5 from "blueimp-md5";
import Cookies from "js-cookie";
import type { AuthClientTokens } from "@react-keycloak/core";

let secureCookies = false;
if (process.env.NODE_ENV !== "production") {
  secureCookies = true;
}

export function generateHash(email: string): string {
  return md5(_.toLower(_.trim(email)));
}

export function camelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (_.isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

export function setToken(tokens: AuthClientTokens) {
  if (tokens.token !== undefined) {
    Cookies.set("OSSLOCAL_SESSION_TOKEN", tokens.token, {
      sameSite: "Strict",
      secure: secureCookies,
    });
  }
}
