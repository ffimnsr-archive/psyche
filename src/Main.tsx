import * as React from "react";
import { render as Render } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "@/App";
import { store, history } from "@/store";
import AuthProvider from "@/components/AuthProvider";

import "@/assets/styles/main.scss";

function render(): void {
  Render((
    <ReduxProvider store={store}>
      <AuthProvider>
        <App history={history} />
      </AuthProvider>
    </ReduxProvider>
  ), document.getElementById("root"));
}

render();

if (module.hot) {
  module.hot.accept("@/App", () => {
    render();
  });
}
