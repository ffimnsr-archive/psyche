import React, { Component } from "react";
import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { GoBackHomeButton } from "./GoBackHomeButton";

interface Props {
  children?: React.ReactNode;
  onError?: (error: Error | null, componentStack: string) => void;
}

interface State {
  hasError: boolean;
}

interface ErrorInfo {
  componentStack: string;
}

function ErrorBoundaryContent(): JSX.Element {
  const description = <div>Oops! Something went wrong.</div>;

  return (
    <NonIdealState
      icon={IconNames.WARNING_SIGN}
      title="Component Error!"
      description={description}
      action={<GoBackHomeButton />}
    />
  );
}

// see docs: https://reactjs.org/docs/error-boundaries.html
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error | null): State {
    if (error !== null) return { hasError: true };

    return { hasError: false };
  }

  componentDidCatch(error: Error | null, errorInfo: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, errorInfo.componentStack ?? "MISSING ERROR STACK");
      } catch (ex) {}
    }
  }

  render(): React.ReactNode {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorBoundaryContent />;
    }

    return this.props.children;
  }
}

export const withErrorBoundary = <T,>(
  Component: React.ComponentType<T>,
  onError?: (error: Error | null, componentStack: string) => void,
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapped = (props: any): React.ReactNode => (
    <ErrorBoundary onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  const name = Component.displayName || Component.name;
  Wrapped.displayName = name ? `WithErrorBoundary(${name})` : "WithErrorBoundary";

  return Wrapped;
};
