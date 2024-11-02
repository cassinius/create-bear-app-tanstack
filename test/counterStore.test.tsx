import { expect, describe, it, afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Counter from "@components/counterClient";

// NOTE: without Jotai providers / stores, the tests will use the
// NOTE: same set of atoms without resetting them between tests
//
// TODO: Use Jotai providers / stores to reset the atoms between tests
describe("Counter tests", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should increment counter", async () => {
    // Arrange
    render(<Counter />);

    const counter = screen.getByText("-42");
    const incrementButton = screen.getByText("+");
    // Act
    await userEvent.click(incrementButton);
    // Assert
    expect(counter.textContent).toEqual("-41");
  });

  it("should decrement counter", async () => {
    render(<Counter increment={false} />);

    const counter = screen.getByText("-41");
    const incrementButton = screen.getByText("-");

    await userEvent.click(incrementButton);

    expect(counter.textContent).toEqual("-42");
  });
});
