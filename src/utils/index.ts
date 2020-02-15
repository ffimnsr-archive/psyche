import _ from "lodash";
import md5 from "blueimp-md5";

export function generateHash(email: string): string {
  return md5(_.toLower(_.trim(email)));
}
