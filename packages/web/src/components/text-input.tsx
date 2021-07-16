import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps
} from '@chakra-ui/react'
import { forwardRef } from 'react'

interface TextInputProps extends InputProps {
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function InputElement(
    { title, error, isRequired, ...props }: TextInputProps,
    ref
  ) {
    return (
      <FormControl isRequired={isRequired} isInvalid={!!error}>
        <FormLabel>{title}</FormLabel>
        <Input {...props} ref={ref} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    )
  }
)
