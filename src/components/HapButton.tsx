import React from "react";
import { useHistory, useLocation } from "react-router";
import {
  createLocation,
  LocationDescriptor,
  LocationDescriptorObject,
  Location,
} from "history";
import { AnchorButton } from "@blueprintjs/core";

const resolveToLocation = <T,>(
  to: LocationDescriptor | T,
  currentLocation: Location,
): string => {
  return typeof to === "function" ? to(currentLocation) : to;
};

const normalizeToLocation = (
  to: LocationDescriptor,
  currentLocation: Location,
): LocationDescriptorObject => {
  return typeof to === "string"
    ? createLocation(to, null, undefined, currentLocation)
    : to;
};

interface HapButtonProps extends AnchorButton {
  to: string;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HapButton = ({
  to,
  replace,
  ...rest
}: HapButtonProps | any): JSX.Element => {
  const history = useHistory();
  const currentLocation = useLocation();
  const location = normalizeToLocation(
    resolveToLocation(to, currentLocation),
    currentLocation,
  );
  const href = location ? history.createHref(location) : "";
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    const location = resolveToLocation(to, currentLocation);
    const method = replace ? history.replace : history.push;

    method(location);
  };
  return <AnchorButton {...rest} onClick={handleClick} href={href} />;
};
