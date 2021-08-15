import { Button, Image, Text } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'

import { PrimaryHeader } from './primary-header'

interface ChallengeHeaderProps {
  title: string
  iconUrl: string
}

export function ChallengeHeader({
  title,
  iconUrl
}: ChallengeHeaderProps): JSX.Element {
  const history = useHistory()

  return (
    <PrimaryHeader alignItems="center" as="header">
      <Button onClick={() => history.goBack()}>
        <ChevronLeftIcon w={8} h={8} />
      </Button>
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
