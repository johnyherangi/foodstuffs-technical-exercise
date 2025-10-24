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

  it.each([
    {
      items: 10,
      price: 100,
      state: "AUK",
      expectedTotal: "$1,068.50",
    },
  ])(
    "calculates the correct total (items=$items, price=$price, state=$state)",
    async ({ items, price, state, expectedTotal }) => {
      render(<App />)

      const user = userEvent.setup()

      const itemCount = screen.getByRole("spinbutton", {
        name: "Number of items",
      })
      await user.type(itemCount, String(items))

      const pricePerItem = screen.getByRole("spinbutton", {
        name: "Price per item ($)",
      })
      await user.type(pricePerItem, String(price))

      const stateCode = screen.getByRole("combobox", { name: "State code" })
      await user.selectOptions(stateCode, state)

      const submitButton = screen.getByRole("button", {
        name: "Calculate total",
      })
      await user.click(submitButton)

      expect(
        await screen.findByRole("status", { name: "Total" })
      ).toHaveTextContent(`${expectedTotal}`)
    }
  )
})
