import { Image, Text } from '@chakra-ui/react'
import { PrimaryHeader } from './primary-header'

export function ChallengeHeader(): JSX.Element {
  return (
    <PrimaryHeader alignItems="center" as="header">
      <Text flex={1} textAlign="center" fontSize="xl" color="white">
        Gerenciamento de estado
      </Text>
      <Image
        src="/icons/icon.png"
        background="white"
        borderRadius={10}
        border="2px"
        borderColor="purple.600"
      />
    </PrimaryHeader>
  )
}
