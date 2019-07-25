import * as React from "react";
import { NonIdealState } from "@blueprintjs/core";
import { NavigationHeader } from "@/components/NavigationHeader";

const NoMatch = () => {
  return (
    <main>
      <NavigationHeader />
      <NonIdealState
        icon="search"
        title="Page Not Found"
        description={undefined}
        action={undefined}
      />
    </main>
  );
};

export default NoMatch;
