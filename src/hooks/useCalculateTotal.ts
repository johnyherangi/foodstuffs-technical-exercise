import { discountRates } from "@/lib/discount"
import { stateTax, type State } from "@/lib/state"
import currency from "currency.js"
import { useState } from "react"
import { discountRates } from "@/lib/discount" // [{ orderValue: number (dollars), rate: number (0..1) }]
import { stateTax, type State } from "@/lib/state" // e.g. { CA: 0.0725, ... }

type Bp = bigint // basis points, 1% = 100n
const BP_DENOM = 10_000n // 100.00% in basis points

// Parse a money input like "12.34" -> 1234n cents (no floating math)
function parseMoneyToCents(val: FormDataEntryValue | null): bigint {
  const s = (val ?? "0").toString().trim()
  if (!/^\d+(\.\d{1,2})?$/.test(s)) throw new Error("Invalid currency format")
  const [intPart, fracPart = ""] = s.split(".")
  const cents = BigInt(intPart) * 100n + BigInt((fracPart + "00").slice(0, 2))
  return cents
}

function parseIntStrict(val: FormDataEntryValue | null): bigint {
  const s = (val ?? "0").toString().trim()
  if (!/^\d+$/.test(s)) throw new Error("Invalid integer")
  return BigInt(s)
}

// Convert a decimal rate (e.g. 0.0725) to basis points (725n)
function rateToBp(rate: number): Bp {
  // multiply to preserve precision and round to nearest bp
  return BigInt(Math.round(rate * 10_000))
}

// Multiply an amount (in cents) by a rate in basis points, rounding half up
function applyBp(amountCents: bigint, rateBp: Bp): bigint {
  return (amountCents * rateBp + BP_DENOM / 2n) / BP_DENOM
}

export function useCalculateTotal() {
  const [total, setTotal] = useState<string>()

  const calculateTotal = (formData: FormData) => {
    const itemCount = Number(formData.get("items"))
    const pricePerItem = Number(formData.get("price"))
    const stateCode = formData.get("state")
    const subTotal = currency(itemCount).multiply(pricePerItem)
    const discountRate =
      [...discountRates].filter((d) => subTotal.value > d.orderValue).at(-1)
        ?.rate ?? 0
    const discounted = subTotal.multiply(1 - discountRate)

    setTotal(discounted.multiply(1 + stateTax[stateCode as State]).format())
  }

  // helper to format for UI
  const totalFormatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NZD", // or your currency
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(totalCents) / 100)

  return { total: totalFormatted, calculateTotal }
}
