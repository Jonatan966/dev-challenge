import { Text, Flex, Image } from '@chakra-ui/react'
import { PrimaryBox } from '../components/primary-box'
import { PrimaryProgress } from './primary-progress'

export function ChallengeCard(): JSX.Element {
  return (
    <PrimaryBox as="button">
      <Image src="/icons/icon.png" />
      <Text fontWeight="bold" fontSize="sm" textAlign="start" mt={3} mb={3}>
        Gerenciamento de estado
      </Text>

      <Flex alignItems="center" gridGap={2}>
        <Text fontSize="x-small" color="gray.500">
          3 de 10
        </Text>
        <PrimaryProgress value={50} flex={1} />
      </Flex>
    </PrimaryBox>
  )
}
