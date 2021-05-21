// import React from "react";
// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("render home app", () => {
//   render(<App />);

//   const title = screen.queryByText("MEGA-SENA");
//   console.log(title);

//   expect(title).toBeInTheDocument();
// });

import React from "react";
import { mount } from "@cypress/react";
import App from "./App";

it("renders learn react link", () => {
  mount(<App />);
  cy.get("span").contains("MEGA-SENA");
});
