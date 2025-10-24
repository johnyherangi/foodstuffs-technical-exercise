import "./App.css"
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
        <div className="flex justify-between">
          <label htmlFor="state">State code</label>
          <select id="state" name="state">
            {stateCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
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
