import { As, ChakraProps, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PrimaryHeaderProps extends ChakraProps {
  children?: ReactNode
  as?: As
}

export function PrimaryHeader({
  children,
  as,
  ...props
}: PrimaryHeaderProps): JSX.Element {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      as={as}
      padding="5"
      background="linear-gradient(122.59deg, #57B6E5 0%, #8257E5 69.5%);"
      {...props}
    >
      {children}
    </Flex>
  )
}
