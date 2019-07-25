import { applyMiddleware, createStore, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { rootEpic, createRootReducer } from "@/reducers";

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const loggerMiddleware = createLogger();

function getMiddleware() {
  const middlewares = [
      routeMiddleware,
      epicMiddleware
  ];

  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...middlewares);
  } else {
    return applyMiddleware(
      ...middlewares,
      loggerMiddleware
    );
  }
}

export const store = configureStore();

export default function configureStore(preloadedState?: any) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(getMiddleware())
  );

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  epicMiddleware.run(rootEpic);

  return store;
}
