import { render, screen } from "@testing-library/react";
import React from "react";

import App from "./app";

describe("Principal Aplication", () => {

  it("should print 'JWT Login' when is loaded", () => {
    render(<App />);

    const element = screen.getByText("JWT Login");

    expect(element.textContent).toEqual("JWT Login");
  })
});