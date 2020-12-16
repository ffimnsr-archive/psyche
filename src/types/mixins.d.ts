interface Window {
  // eslint-disable-next-line @typescript-eslint/ban-types
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

declare module "*.svg" {
  const content: any;
  export = content;
}

declare module "*.png" {
  const content: any;
  export = content;
}

declare module "*.graphql" {
  const content: any;
  export = content;
}
