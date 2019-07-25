import * as React from "react";
import { render as Render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "@/App";
import { store, history } from "@/store";

import "@/assets/styles/main.scss";

function render(): void {
  Render((
    <Provider store={store}>
      <App history={history} />
    </Provider>
  ), document.getElementById("root"));
}

render();

if (module.hot) {
  module.hot.accept("@/App", () => {
    render();
  });
}
