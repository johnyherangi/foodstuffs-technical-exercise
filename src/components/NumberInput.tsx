import { Input } from "./ui/input"

export type NumberInputProps = Omit<React.ComponentProps<"input">, "type">

export function NumberInput(props: NumberInputProps) {
  return <Input {...props} type="number" />
}
