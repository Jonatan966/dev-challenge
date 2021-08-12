import { As, Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface PrimaryBoxProps extends BoxProps {
  children?: ReactNode
  as?: As
}

export function PrimaryBox({
  children,
  ...props
}: PrimaryBoxProps): JSX.Element {
  return (
    <Box
      background="gray.50"
      borderRadius="15"
      border="1px"
      borderColor="gray.300"
      transform="auto"
      padding="3"
      {...props}
    >
      {children}
    </Box>
  )
}
