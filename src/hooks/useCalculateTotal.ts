import { discountRates } from "@/lib/discount"
import { stateTax, type State } from "@/lib/state"
import { useState } from "react"

export function useCalculateTotal() {
  const [total, setTotal] = useState(0)

  const calculateTotal = (formData: FormData) => {
    const itemCount = Number(formData.get("items"))
    const pricePerItem = Number(formData.get("price"))
    const stateCode = formData.get("state")
    const subTotal = itemCount * pricePerItem
    const discountRate =
      [...discountRates].filter((d) => subTotal > d.orderValue).at(-1)?.rate ??
      0
    const discounted = subTotal * (1 - discountRate)

    setTotal(discounted * (1 + stateTax[stateCode as State]))
  }

  return { total, calculateTotal }
}
