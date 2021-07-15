import { Checkbox, Text } from '@chakra-ui/react'
import { PrimaryBox } from './primary-box'

export function AnswerCard(): JSX.Element {
  return (
    <PrimaryBox display="flex" gridGap={4}>
      <Text flex="1" fontSize="sm">
        Kit de desenvolvimento de interface de usuário
      </Text>
      <Checkbox size="lg" colorScheme="green" />
    </PrimaryBox>
  )
}
