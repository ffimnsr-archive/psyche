import * as React from "react";
import invariant from "invariant";
import { __RouterContext as RouterContext } from "react-router";
import { createLocation, LocationDescriptor, Location } from "history";
import { AnchorButton } from "@blueprintjs/core";

const resolveToLocation = (to: LocationDescriptor | any, currentLocation: Location) => {
  return typeof to === "function" ? to(currentLocation) : to;
};

const normalizeToLocation = (to: LocationDescriptor, currentLocation: Location) => {
  return typeof to === "string"
    ? createLocation(to, null, undefined, currentLocation)
    : to;
};

interface IHapButtonProps extends AnchorButton {
  to: LocationDescriptor | string;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export const HapButton = ({ to, replace, ...rest }: IHapButtonProps | any) => {
  return (
    <RouterContext.Consumer>
      {context => {
        invariant(context, "You should not use <HapButton> outside a <Router>");

        const { history } = context;
        const location = normalizeToLocation(
          resolveToLocation(to, context.location),
          context.location
        );

        const href = location ? history.createHref(location) : "";
        const onClick = (event: MouseEvent | any) => {
          event.preventDefault();

          const location = resolveToLocation(to, context.location);
          const method = replace ? history.replace : history.push;

          method(location);
        };

        return <AnchorButton {...rest} onClick={onClick} href={href} />;
      }}
    </RouterContext.Consumer>
  );
};
