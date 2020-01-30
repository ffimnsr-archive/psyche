module.exports = {
  extension: ["ts", "tsx"],
  spec: "test/**/*.spec.tsx",
  require: ["test/setup.js", "jsdom-global/register", "tsconfig-paths/register"],
};