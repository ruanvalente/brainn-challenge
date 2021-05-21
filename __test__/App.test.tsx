import React from "react";
import App from "../src/App";

import { screen, render } from "@testing-library/react";

const renderComponent = () => render(<App />);

describe("App", () => {
  describe("Display elements", () => {
    renderComponent();

    screen.debug();
  });
});
