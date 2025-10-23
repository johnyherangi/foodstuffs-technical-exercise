import App from "./App"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import userEvent from "@testing-library/user-event"

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

  it.each([{ items: 10, price: 100, state: "AUK", tax: 0.0685 }])(
    "calculates the correct total (items=$items, price=$price, state=$state)",
    async ({ items, price, state, tax }) => {
      render(<App />)

      const user = userEvent.setup()

      const itemCount = screen.getByRole("spinbutton", {
        name: "Number of items",
      })
      await user.type(itemCount, "10")

      const pricePerItem = screen.getByRole("spinbutton", {
        name: "Price per item ($)",
      })
      await user.type(pricePerItem, "100")

      const stateCode = screen.getByRole("combobox", { name: "State code" })
      await user.selectOptions(stateCode, state)

      const submitButton = screen.getByRole("button", {
        name: "Calculate total",
      })
      await user.click(submitButton)

      const expectedTotal = items * price * (1 + tax)

      expect(
        await screen.findByRole("status", { name: "Total" })
      ).toHaveTextContent(`$${expectedTotal.toFixed(2)}`)
    }
  )
})
