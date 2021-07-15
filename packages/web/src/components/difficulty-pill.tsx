import { WrapItem } from '@chakra-ui/react'

interface DifficultyPillProps {
  title: string
}

export function DifficultyPill({ title }: DifficultyPillProps): JSX.Element {
  return (
    <WrapItem
      bg="green.100"
      pl="4"
      pr="4"
      borderRadius="20"
      border="2px"
      borderColor="green.300"
      color="green.800"
      fontWeight="bold"
      flex="1"
      justifyContent="center"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        filter: 'brightness(.85)'
      }}
    >
      {title}
    </WrapItem>
  )
}
