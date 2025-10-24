import App from "./App"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeAll, vi } from "vitest"
import userEvent from "@testing-library/user-event"

describe("App", () => {
  // https://stackoverflow.com/questions/79790413/how-to-avoid-target-haspointercapture-is-not-a-function-when-testing-radix-ui-s
  beforeAll(() => {
    if (!Element.prototype.hasPointerCapture) {
      Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false)
    }
    if (!Element.prototype.setPointerCapture) {
      Element.prototype.setPointerCapture = vi.fn()
    }
    if (!Element.prototype.releasePointerCapture) {
      Element.prototype.releasePointerCapture = vi.fn()
    }
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn()
    }
  })

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
    expect(screen.getByLabelText("State code")).toBeInTheDocument()
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

      const submitButton = screen.getByRole("button", {
        name: "Calculate total",
      })

      expect(submitButton).toBeDisabled()

      const user = userEvent.setup()

      const itemCount = screen.getByRole("spinbutton", {
        name: "Number of items",
      })
      await user.type(itemCount, String(items))

      const pricePerItem = screen.getByRole("spinbutton", {
        name: "Price per item ($)",
      })
      await user.type(pricePerItem, String(price))

      const stateCodeSelect = screen.getByLabelText("State code")
      await user.click(stateCodeSelect)
      const stateCode = screen.getByLabelText(state)
      await user.click(stateCode)

      expect(submitButton).toBeEnabled()
      await user.click(submitButton)

      expect(
        await screen.findByRole("status", { name: "Total" })
      ).toHaveTextContent(`${expectedTotal}`)
    }
  )
})
