import {
  Alert,
  AlertIcon,
  Avatar,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export function RegisterPage(): JSX.Element {
  const router = useHistory()

  return (
    <Flex flexDir="column" p={5} flex={1} gridGap={4}>
      <Spacer />

      <Heading>Cadastrar-se</Heading>
      <Alert status="error">
        <AlertIcon />
        Não foi possível criar a conta
      </Alert>
      <FormControl isRequired>
        <FormLabel>E-Mail</FormLabel>
        <Input placeholder="Ex: fulano@email.com" type="email" />
        <FormHelperText>socorro</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Senha</FormLabel>
        <Input placeholder="Ex: admin1243" type="password" />
        <FormHelperText>socorro</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Foto de perfil</FormLabel>
        <Flex alignItems="center" gridGap={2}>
          <Avatar size="sm" />
          <Button flex={1}>Escolher foto</Button>
        </Flex>
      </FormControl>

      <Spacer />

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button
          href="/auth"
          variant="link"
          onClick={() => router.replace('/auth')}
        >
          Voltar
        </Button>
        <Button colorScheme="green">Finalizar cadastro</Button>
      </Grid>
    </Flex>
  )
}
