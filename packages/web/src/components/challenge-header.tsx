import { Image, Text } from '@chakra-ui/react'
import { PrimaryHeader } from './primary-header'

interface ChallengeHeaderProps {
  title: string
  iconUrl: string
}

export function ChallengeHeader({
  title,
  iconUrl
}: ChallengeHeaderProps): JSX.Element {
  return (
    <PrimaryHeader alignItems="center" as="header">
      <Text flex={1} textAlign="center" fontSize="xl" color="white">
        {title}
      </Text>
      <Image
        src={iconUrl || '/icons/icon.png'}
        background="white"
        borderRadius={10}
        border="2px"
        borderColor="purple.600"
      />
    </PrimaryHeader>
  )
}
