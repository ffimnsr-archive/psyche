interface Window {
  // eslint-disable-next-line @typescript-eslint/ban-types
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
