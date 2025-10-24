import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export type SelectInputProps<T extends string> = {
  id: string
  name: string
  placeholder?: string
  options: readonly string[]
  className?: string
  value?: T
  onChange?: (value: T) => void
}

export function SelectInput<T extends string>({
  id,
  name,
  placeholder,
  options,
  className,
  value,
  onChange,
}: SelectInputProps<T>) {
  return (
    <Select name={name} value={value} onValueChange={onChange}>
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
