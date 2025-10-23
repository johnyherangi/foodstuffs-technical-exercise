import { describe, it, expect } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { useCalculateTotal } from "./useCalculateTotal"

describe("useCalculateTotal", () => {
  it("calculates total and updates state", () => {
    const { result, rerender } = renderHook(() => useCalculateTotal())

    expect(result.current.total).toBe(0)

    act(() => {
      const formData = new FormData()
      formData.set("items", "10")
      formData.set("price", "100")
      formData.set("state", "AUK")
      result.current.calculateTotal(formData)
    })

    rerender()

    expect(result.current.total).toBe(1068.5)
  })
})
