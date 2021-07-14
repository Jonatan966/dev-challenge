import { ChakraProvider } from '@chakra-ui/react'
import { HomePage } from './pages/home'

export function App(): JSX.Element {
  return (
    <ChakraProvider>
      <HomePage />
    </ChakraProvider>
  )
}
