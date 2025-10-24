import { useState } from "react"
import "./App.css"
import { NumberInput } from "./components/NumberInput"
import { SelectInput } from "./components/SelectInput"
import { SubmitButton } from "./components/SubmitButton"
import { useCalculateTotal } from "./hooks/useCalculateTotal"
import { stateCodes, type State } from "./lib/state"

function App() {
  const { total, calculateTotal } = useCalculateTotal()
  const [items, setItems] = useState<number>()
  const [price, setPrice] = useState<number>()
  const [state, setState] = useState<State>()

  return (
    <>
      <h1>Retail Calculator</h1>
      <form action={calculateTotal} className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col items-start">
          <label htmlFor="items">Number of items</label>
          <NumberInput
            id="items"
            name="items"
            min="0"
            value={items}
            onChange={(e) => setItems(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="price" className="text-nowrap">
            Price per item ($)
          </label>
          <NumberInput
            id="price"
            name="price"
            min="0"
            step="any"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="state" className="text-nowrap">
            State code
          </label>
          <SelectInput
            id="state"
            name="state"
            options={stateCodes}
            className="w-full"
            value={state}
            onChange={setState}
          />
        </div>
        <SubmitButton disabled={!items || !price || !state} className="mt-4">
          Calculate total
        </SubmitButton>
      </form>
      <div className="flex justify-between mt-8">
        <label htmlFor="total">Total</label>
        <output id="total">{total}</output>
      </div>
    </>
  )
}

export default App
