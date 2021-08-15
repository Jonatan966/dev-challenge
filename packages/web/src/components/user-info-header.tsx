import { Text, Box, Image } from '@chakra-ui/react'

import { PrimaryHeader } from './primary-header'
import { ProgressInfoCard } from './progress-info-card'

import { useAuth } from '../contexts/auth-context'
import { useEffect, useState } from 'react'

export function UserInfoHeader(): JSX.Element {
  const { user, isLoadingAuth, refreshUserInformation } = useAuth()

  const [isRefreshingUser, setIsRefreshingUser] = useState(false)

  useEffect(() => {
    if (isLoadingAuth) return
    setIsRefreshingUser(true)
    refreshUserInformation().then(() => setIsRefreshingUser(false))
  }, [])

  return (
    // top={0} zIndex={99} background="white"
    <Box as="header" position="sticky">
      <PrimaryHeader paddingBottom="10">
        <Text fontSize="2xl" color="white">
          Olá, <strong>{user?.name}</strong>
        </Text>
        <Image
          boxSize="50"
          borderRadius="10"
          border="2px"
          borderColor="purple.600"
          src="https://github.com/Jonatan966.png"
        />
      </PrimaryHeader>

      <ProgressInfoCard
        value={user.currentExperience}
        max={user.currentExperience + user.experienceToNextLevel}
        title={`Nível ${user.currentLevel}`}
        marginLeft="5"
        marginRight="5"
        translateY="-20%"
        isLoading={isRefreshingUser}
      >
        Faltam <strong>{user.experienceToNextLevel}xp</strong> para o{' '}
        <strong>Nível {user.currentLevel + 1}</strong>
      </ProgressInfoCard>
    </Box>
  )
}
