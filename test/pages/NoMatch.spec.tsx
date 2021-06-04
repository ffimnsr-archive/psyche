import React, { FC } from "react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { render } from "@testing-library/react";
import NoMatch from "../../src/pages/NoMatch";

interface Props {
  children?: React.ReactNode;
}

const TestProvider: FC = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </HelmetProvider>
  );
};

describe("<NoMatch>", () => {
  test("render its content correctly", () => {
    const { container } = render(<NoMatch />, { wrapper: TestProvider });
    expect(container.innerHTML).toContain("Page Not Found");
  });
});
