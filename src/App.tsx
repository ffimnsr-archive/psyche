import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { FocusStyleManager } from "@blueprintjs/core";
import { Router } from "@/Router";

FocusStyleManager.onlyShowFocusOnTabs();

export function App() {
	return (
		<HelmetProvider>
			<BrowserRouter>
		  	<Router />
		  </BrowserRouter>
	  </HelmetProvider>
	);
}
