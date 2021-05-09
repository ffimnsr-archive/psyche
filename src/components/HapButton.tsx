/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useHistory, useLocation } from "react-router";
import {
  createLocation,
  LocationDescriptor,
  LocationDescriptorObject,
  Location,
} from "history";
import { AnchorButton } from "@blueprintjs/core";

interface HapButtonProps extends AnchorButton {
  to: string;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
}

function resolveToLocation<T>(
  to: LocationDescriptor | T,
  currentLocation: Location,
): string {
  return typeof to === "function" ? to(currentLocation) : to;
}

function normalizeToLocation(
  to: LocationDescriptor,
  currentLocation: Location,
): LocationDescriptorObject {
  return typeof to === "string"
    ? createLocation(to, null, undefined, currentLocation)
    : to;
}

export function HapButton({ to, replace, ...rest }: HapButtonProps | any): JSX.Element {
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
}
