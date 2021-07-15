import { Text, Box, Image } from '@chakra-ui/react'
import { PrimaryHeader } from './primary-header'
import { ProgressInfoCard } from './progress-info-card'

export function UserInfoHeader(): JSX.Element {
  return (
    // top={0} zIndex={99} background="white"
    <Box as="header" position="sticky">
      <PrimaryHeader paddingBottom="10">
        <Text fontSize="2xl" color="white">
          Olá, <strong>Jonatan</strong>
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
        value={50}
        title="Nível 2"
        marginLeft="5"
        marginRight="5"
        translateY="-20%"
      >
        Faltam <strong>250xp</strong> para o <strong>Nível 3</strong>
      </ProgressInfoCard>
    </Box>
  )
}
