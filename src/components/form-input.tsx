import { Input, InputProps } from '@chakra-ui/react'

export function FormInput({ ...props }: InputProps) {
  return (
    <Input
      outline="1px solid"
      outlineColor="border"
      variant="unstyled"
      p="0.5rem"
      _focus={{ outline: '2px solid', outlineColor: 'border' }}
      {...props}
    />
  )
}
