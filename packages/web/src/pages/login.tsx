import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Link,
  Spacer
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export function LoginPage(): JSX.Element {
  const router = useHistory()
  return (
    <Flex flexDir="column" p={5} flex={1} gridGap={4} as="form">
      <Spacer />

      <Heading>Fazer login</Heading>

      <FormControl isRequired isInvalid={true}>
        <FormLabel>E-Mail</FormLabel>
        <Input placeholder="Ex: fulano@email.com" type="email" />
        <FormErrorMessage>socorro</FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Senha</FormLabel>
        <Input placeholder="Ex: admin1243" type="password" />
      </FormControl>
      <Link textAlign="end">Esqueci minha senha</Link>
      <Spacer />

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/auth/register')}
        >
          Criar conta
        </Button>
        <Button type="submit" colorScheme="green">
          Entrar
        </Button>
      </Grid>
    </Flex>
  )
}
