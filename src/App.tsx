import "./App.css"
import { SelectInput } from "./components/SelectInput"
import { useCalculateTotal } from "./hooks/useCalculateTotal"
import { stateCodes } from "./lib/state"

function App() {
  const { total, calculateTotal } = useCalculateTotal()

  return (
    <>
      <h1>Retail Calculator</h1>
      <form action={calculateTotal} className="flex flex-col gap-4 mt-8">
        <div className="flex justify-between">
          <label htmlFor="items">Number of items</label>
          <input type="number" id="items" name="items" min="0"></input>
        </div>
        <div className="flex justify-between">
          <label htmlFor="price">Price per item ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="any"
          ></input>
        </div>
        <SelectInput
          id="state"
          name="state"
          options={stateCodes}
          placeholder="State code"
        />
        <button className="mt-4">Calculate total</button>
      </form>
      <div className="flex justify-between mt-8">
        <label htmlFor="total">Total</label>
        <output id="total">${total.toFixed(2)}</output>
      </div>
    </>
  )
}

export default App
