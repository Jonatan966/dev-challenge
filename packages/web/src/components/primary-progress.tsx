import { Progress, ProgressProps } from '@chakra-ui/react'

export function PrimaryProgress({ ...props }: ProgressProps): JSX.Element {
  return (
    <Progress
      height={2}
      borderRadius={50}
      background="gray.300"
      colorScheme="green"
      {...props}
    />
  )
}
