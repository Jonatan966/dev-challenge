import { Center, Spinner } from '@chakra-ui/react'

export function CenteredSpinner(): JSX.Element {
  return (
    <Center margin="auto">
      <Spinner size="xl" />
    </Center>
  )
}
