import React from "react";
import App from "../App";

import { screen, render } from "@testing-library/react";

const renderComponent = () => render(<App />);

describe("Component: App", () => {
  describe("Display elements", () => {
    it("should logo app", () => {
      renderComponent();
      screen.getByRole("img", {
        name: /logo megasena/i,
      });
    });

    it("should footer text", () => {
      renderComponent();
      screen.getByText(
        /este sorteio é meramente ilustrativo e não possui nenhuma ligação com a caixa\./i
      );
    });

    it("should render select with proper options", () => {
      renderComponent();

      const select = screen.getByRole("combobox");
      const options = [
        "MEGA-SENA",
        "QUINA",
        "LOTOFACIL",
        "LOTOMANIA",
        "TIMEMANIA",
        "DIA DE SORTE",
      ];

      expect(select).toBeInTheDocument();

      const children = Array.from(select.children);
      expect(children).toHaveLength(options.length);

      for (const child of children) {
        expect(options.includes(child.textContent));
      }
    });

    it("should render number balls", () => {
      renderComponent();

      const select = screen.getByTestId("balls");

      expect(select).toBeInTheDocument();
    });
  });
});
