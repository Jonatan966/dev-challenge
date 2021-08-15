import { useState } from 'react'
import { Button, Flex, Grid, Heading, Spacer, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { CreateUserDTO } from '@dev-challenge/dto'

import { FormAlert } from '../components/form-alert'
import { TextInput } from '../components/text-input'
import { useAuth } from '../contexts/auth-context'

export function RegisterPage(): JSX.Element {
  const router = useHistory()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm()
  const toast = useToast()
  const { registerUser } = useAuth()

  const [isRegistratingUser, setIsRegistratingUser] = useState(false)

  async function handleSubmitRegistration({
    email,
    name,
    password
  }: CreateUserDTO) {
    setIsRegistratingUser(true)

    const registrationError = await registerUser({
      name,
      email,
      password
    })

    setIsRegistratingUser(false)

    if (!registrationError) {
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Agora é só fazer login com as mesmas credenciais',
        status: 'success',
        position: 'top'
      })

      return router.replace('/auth')
    }

    if (registrationError.errorType === 'input') {
      for (const [errorField, errorMessage] of Object.entries(
        registrationError.fields
      )) {
        setError(errorField, {
          message: errorMessage
        })
      }
    }

    setError('alert', {
      message: registrationError.message || 'Ocorreu um erro inesperado'
    })
  }

  return (
    <Flex
      flexDir="column"
      p={5}
      flex={1}
      gridGap={4}
      as="form"
      onSubmit={handleSubmit(handleSubmitRegistration)}
    >
      <Spacer />

      <Heading>Cadastrar-se</Heading>

      <FormAlert
        status="error"
        message={errors.alert?.message}
        onClose={() => clearErrors('alert')}
      />

      <TextInput
        isRequired
        title="Nome"
        placeholder="Ex: Fulano de Tal"
        type="text"
        {...register('name')}
      />

      <TextInput
        isRequired
        title="E-Mail"
        placeholder="Ex: fulano@email.com"
        type="email"
        {...register('email')}
      />

      <TextInput
        isRequired
        title="Senha"
        placeholder="Ex: admin1243"
        type="password"
        {...register('password')}
      />

      {/* <FormControl>
        <FormLabel>Foto de perfil</FormLabel>
        <Flex alignItems="center" gridGap={2}>
          <Avatar size="sm" />
          <Button flex={1}>Escolher foto</Button>
        </Flex>
      </FormControl> */}

      <Spacer />

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button
          href="/auth"
          variant="link"
          type="button"
          onClick={() => router.replace('/auth')}
          isDisabled={isRegistratingUser}
        >
          Voltar
        </Button>
        <Button
          colorScheme="green"
          type="submit"
          isDisabled={!!Object.keys(errors).length}
          isLoading={isRegistratingUser}
        >
          Finalizar cadastro
        </Button>
      </Grid>
    </Flex>
  )
}
