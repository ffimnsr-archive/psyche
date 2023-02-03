/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import md5 from "blueimp-md5";

function isPlainObject(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    obj.constructor === Object &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
}

export function generateHash(email: string): string {
  return md5(email.trim().toLowerCase());
}

function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function camelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelize(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
}
