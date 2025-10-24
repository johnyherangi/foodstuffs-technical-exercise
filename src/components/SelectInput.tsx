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
  className?: string
}

export function SelectInput({
  id,
  name,
  placeholder,
  options,
  className,
}: SelectInputProps) {
  return (
    <Select name={name}>
      <SelectTrigger id={id} aria-label={placeholder} className={className}>
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
