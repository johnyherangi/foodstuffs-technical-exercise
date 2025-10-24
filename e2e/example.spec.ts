import { test, expect } from "@playwright/test"

test("Basic user flow", async ({ page }) => {
  const items = "10"
  const price = "100"
  const state = "AUK"
  const expectedTotal = "$1,068.50"

  await page.goto("/")

  // Click the get started link.
  const submitButton = page.getByRole("button", {
    name: "Calculate total",
  })

  expect(submitButton).toBeDisabled()

  await page
    .getByRole("spinbutton", {
      name: "Number of items",
    })
    .fill(items)

  await page
    .getByRole("spinbutton", {
      name: "Price per item ($)",
    })
    .fill(price)

  await page.getByLabel("State code").click()
  await page.getByLabel(state).click()

  expect(submitButton).toBeEnabled()
  await submitButton.click()

  // Wait for the total to be calculated and displayed
  await expect(page.getByRole("status", { name: "Total" })).toHaveText(
    expectedTotal
  )
})
