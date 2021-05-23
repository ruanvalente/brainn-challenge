import React from "react";
import { screen, render } from "@testing-library/react";

import { Loading } from "../component/Loading";

const backgroundMock = "";
const renderComponent = () => render(<Loading background={backgroundMock} />);

describe("Component: Loading", () => {
  describe("Display element", () => {
    it("should display render", () => {
      renderComponent();

      const loading = screen.getByTestId("loading");

      expect(loading).toBeInTheDocument();
    });
  });
});
