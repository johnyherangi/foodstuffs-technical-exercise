import { useState } from "react"
import "./App.css"
import { NumberInput } from "./components/NumberInput"
import { SelectInput } from "./components/SelectInput"
import { SubmitButton } from "./components/SubmitButton"
import { useCalculateTotal } from "./hooks/useCalculateTotal"
import { stateCodes, type State } from "./lib/state"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import foodstuffs from "./assets/foodstuffs.jpeg"

function App() {
  const { total, calculateTotal } = useCalculateTotal()
  const [items, setItems] = useState<number>()
  const [price, setPrice] = useState<number>()
  const [state, setState] = useState<State>()

  return (
    <div className="relative max-w-md mx-auto">
      <Card className="shadow-2xl overflow-hidden p-0">
        {/* Header with logo overlay */}
        <div className="relative">
          <div className="bg-secondary h-18 rounded-t-xl" />
          <div className="absolute left-16 top-full -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-white rounded-full p-2 shadow-lg">
              <img
                src={foodstuffs}
                alt="Foodstuffs Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center text-foreground">
            Retail Calculator
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form action={calculateTotal} className="space-y-4">
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
            <SubmitButton
              disabled={!items || !price || !state}
              className="mt-4"
            >
              Calculate total
            </SubmitButton>
          </form>

          <div className="flex justify-between mt-6 p-4 bg-muted/50 rounded-lg">
            <label htmlFor="total" className="font-medium">
              Total
            </label>
            <output id="total" className="font-bold text-primary">
              {total}
            </output>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
