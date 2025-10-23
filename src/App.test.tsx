import App from "./App"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

describe("App", () => {
  it("renders", () => {
    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
  })

  it("has accessible elements", () => {
    render(<App />)

    expect(
      screen.getByRole("spinbutton", { name: "Number of items" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("spinbutton", { name: "Price per item ($)" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("combobox", { name: "State code" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Calculate total" })
    ).toBeInTheDocument()
  })
})
