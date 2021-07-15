import { Image, Text } from '@chakra-ui/react'
import { PrimaryHeader } from './primary-header'

export function AppLogoHeader(): JSX.Element {
  return (
    <PrimaryHeader justifyContent="center" flexDir="column" as="header">
      <Image src="/icons/logo.png" />
      <Text fontSize="xl" color="white">
        Aprenda com gosto
      </Text>
    </PrimaryHeader>
  )
}
