import { discountRates } from "@/lib/discount"
import { stateTax, type State } from "@/lib/state"
import currency from "currency.js"
import { useState } from "react"

export function useCalculateTotal() {
  const [total, setTotal] = useState(0)

  const calculateTotal = (formData: FormData) => {
    const itemCount = Number(formData.get("items"))
    const pricePerItem = Number(formData.get("price"))
    const stateCode = formData.get("state")
    const subTotal = currency(itemCount).multiply(pricePerItem)
    const discountRate =
      [...discountRates].filter((d) => subTotal.value > d.orderValue).at(-1)
        ?.rate ?? 0
    const discounted = subTotal.multiply(1 - discountRate)

    setTotal(discounted.multiply(1 + stateTax[stateCode as State]).value)
  }

  return { total, calculateTotal }
}
