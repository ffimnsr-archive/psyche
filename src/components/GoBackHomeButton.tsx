import { AnchorButton, Intent } from "@blueprintjs/core";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router";

export const GoBackHomeButton = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <AnchorButton onClick={() => navigate("/")} intent={Intent.PRIMARY} large={true}>
      Go Back Home
    </AnchorButton>
  );
};
