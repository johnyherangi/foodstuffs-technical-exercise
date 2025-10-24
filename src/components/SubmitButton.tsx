import { Button } from "./ui/button"

export type SubmitButtonProps = Omit<React.ComponentProps<"button">, "type">

export function SubmitButton(props: SubmitButtonProps) {
  return <Button {...props} type="submit" />
}
