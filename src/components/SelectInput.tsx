import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export type SelectInputProps = {
  id: string
  name: string
  placeholder?: string
  options: readonly string[]
}

export function SelectInput({
  id,
  name,
  placeholder,
  options,
}: SelectInputProps) {
  return (
    <Select name={name}>
      <SelectTrigger id={id} aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
