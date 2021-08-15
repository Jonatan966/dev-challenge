import {
  Text,
  Box,
  CircularProgress,
  CircularProgressLabel,
  ChakraProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CenteredSpinner } from './centered-spinner'

import { PrimaryBox } from './primary-box'

interface ProgressInfoCardProps extends ChakraProps {
  value: number
  max?: number
  title: string
  children?: ReactNode
  isLoading?: boolean
}

export function ProgressInfoCard({
  value,
  max = 100,
  title,
  children,
  isLoading,
  ...props
}: ProgressInfoCardProps): JSX.Element {
  const percentage = Math.ceil((value / max) * 100)

  return (
    <PrimaryBox {...props} display="flex" gridGap="2">
      {isLoading ? (
        <CenteredSpinner />
      ) : (
        <>
          <Box>
            <CircularProgress
              value={value}
              max={max}
              size="5rem"
              thickness="10px"
              color="green.400"
            >
              <CircularProgressLabel fontWeight="bold">
                {percentage}%
              </CircularProgressLabel>
            </CircularProgress>
          </Box>
          <Box flex="1">
            <Text fontWeight="bold" fontSize="xl">
              {title}
            </Text>
            <Text fontSize="md">{children}</Text>
          </Box>
        </>
      )}
    </PrimaryBox>
  )
}
