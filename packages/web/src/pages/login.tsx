import { Button, Flex, Grid, Heading, Link, Spacer } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AuthenticateUserDTO } from '@dev-challenge/dto'

import { useAuth } from '../contexts/auth-context'
import { useState } from 'react'
import { TextInput } from '../components/text-input'
import { FormAlert } from '../components/form-alert'

export function LoginPage(): JSX.Element {
  const { logIn } = useAuth()
  const router = useHistory()

  const [isValidatingUser, setIsValidatingUser] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm()

  async function handleLogIn(data: AuthenticateUserDTO) {
    setIsValidatingUser(true)

    const loginResultError = await logIn(data?.email, data?.password)

    setIsValidatingUser(false)

    if (!loginResultError) {
      router.replace('/challenges')
      return
    }

    if (loginResultError.errorType === 'input') {
      for (const [errorField, errorMessage] of Object.entries(
        loginResultError.fields
      )) {
        setError(errorField, {
          message: errorMessage
        })
      }
      return
    }

    setError('alert', {
      message: loginResultError.message || 'Ocorreu um erro inesperado'
    })
  }

  return (
    <Flex
      flexDir="column"
      p={5}
      flex={1}
      gridGap={4}
      as="form"
      onSubmit={handleSubmit(handleLogIn)}
    >
      <Spacer />

      <Heading>Fazer login</Heading>

      <FormAlert
        status="error"
        message={errors.alert?.message}
        onClose={() => clearErrors('alert')}
      />

      <TextInput
        isRequired
        error={errors.email?.message}
        title="E-Mail"
        placeholder="Ex: fulano@email.com"
        type="email"
        {...register('email')}
      />

      <TextInput
        isRequired
        error={errors.password?.message}
        title="Senha"
        placeholder="Ex: admin1243"
        type="password"
        {...register('password')}
      />

      <Link textAlign="end">Esqueci minha senha</Link>

      <Spacer />

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/auth/register')}
          isDisabled={isValidatingUser}
        >
          Criar conta
        </Button>
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isValidatingUser}
          isDisabled={!!Object.keys(errors).length}
        >
          Entrar
        </Button>
      </Grid>
    </Flex>
  )
}
