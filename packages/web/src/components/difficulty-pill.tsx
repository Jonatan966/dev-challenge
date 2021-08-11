import { WrapItem } from '@chakra-ui/react'
import { Difficulty } from '@dev-challenge/entities'

interface DifficultyPillProps {
  difficulty: Difficulty
}

export function DifficultyPill({
  difficulty
}: DifficultyPillProps): JSX.Element {
  return (
    <WrapItem
      bg={`${difficulty.color}.100`}
      pl="4"
      pr="4"
      borderRadius="20"
      border="2px"
      borderColor={`${difficulty.color}.300`}
      color={`${difficulty.color}.800`}
      fontWeight="bold"
      flex="1"
      justifyContent="center"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        filter: 'brightness(.85)'
      }}
    >
      {difficulty.title}
    </WrapItem>
  )
}
