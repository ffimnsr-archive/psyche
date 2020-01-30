import React from "react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { expect } from "chai";
import { render } from "@testing-library/react";
import NoMatch from "../../src/pages/NoMatch";

const TestProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <HelmetProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </HelmetProvider>
  );
};

describe("<NoMatch>", () => {
  it("render its content correctly", () => {
    const { container } = render(<NoMatch />, { wrapper: TestProvider });

    expect(container.innerHTML).contains("Page Not Found");
  });
});
