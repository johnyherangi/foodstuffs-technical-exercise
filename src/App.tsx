import "./App.css"
import { stateCodes } from "./lib/state"

function App() {
  return (
    <>
      <h1>Retail Calculator</h1>
      <form className="flex flex-col gap-4 mt-8">
        <div className="flex justify-between">
          <label htmlFor="numItems">Number of items</label>
          <input type="number" id="numItems" name="numItems" min="0"></input>
        </div>
        <div className="flex justify-between">
          <label htmlFor="pricePerItem">Price per item ($)</label>
          <input
            type="number"
            id="pricePerItem"
            name="pricePerItem"
            min="0"
          ></input>
        </div>
        <div className="flex justify-between">
          <label htmlFor="stateCode">State code</label>
          <select id="stateCode" name="stateCode">
            {stateCodes.map((code) => (
              <option value={code}>{code}</option>
            ))}
          </select>
        </div>
        <button>Calculate total</button>
      </form>
    </>
  )
}

export default App
