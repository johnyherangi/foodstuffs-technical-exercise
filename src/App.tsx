import "./App.css"
import { NumberInput } from "./components/NumberInput"
import { SelectInput } from "./components/SelectInput"
import { useCalculateTotal } from "./hooks/useCalculateTotal"
import { stateCodes } from "./lib/state"

function App() {
  const { total, calculateTotal } = useCalculateTotal()

  return (
    <>
      <h1>Retail Calculator</h1>
      <form action={calculateTotal} className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col items-start">
          <label htmlFor="items">Number of items</label>
          <NumberInput id="items" name="items" min="0" />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="price" className="text-nowrap">
            Price per item ($)
          </label>
          <NumberInput id="price" name="price" min="0" step="any" />
        </div>
        <SelectInput
          id="state"
          name="state"
          options={stateCodes}
          placeholder="State code"
          className="w-full"
        />
        <button className="mt-4">Calculate total</button>
      </form>
      <div className="flex justify-between mt-8">
        <label htmlFor="total">Total</label>
        <output id="total">{total}</output>
      </div>
    </>
  )
}

export default App
