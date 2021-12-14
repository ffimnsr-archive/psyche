export function isProduction(): boolean {
  return process.env.NODE_ENV !== "production";
}

export const GRAPH_URI = process.env.REACT_APP_RS_URI;
