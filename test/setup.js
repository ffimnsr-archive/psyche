/* eslint-disable @typescript-eslint/no-var-requires */
const register = require("@babel/register").default;

register({ extensions: [".ts", ".tsx", ".js", ".jsx"] });

// // Added this below to mitigate error on rAF which is not
// // implemented in JSDOM.
// // eslint-disable-next-line
// global.requestAnimationFrame = cb => cb();
