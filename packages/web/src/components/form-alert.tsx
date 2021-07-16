import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  CloseButton
} from '@chakra-ui/react'

interface FormAlertProps extends AlertProps {
  onClose: () => void
  message?: string
}

export function FormAlert({
  message,
  onClose,
  ...props
}: FormAlertProps): JSX.Element {
  return (
    <Alert {...props} hidden={!message}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onClose}
      />
    </Alert>
  )
}
