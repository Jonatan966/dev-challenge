import { Checkbox } from '@chakra-ui/react'

import { Answer } from '@dev-challenge/entities'
import { PrimaryBox } from './primary-box'

interface AnswerCardProps {
  answer: Answer
  isDisabled: boolean
  onCheck: (answerId: string) => void
}

export function AnswerCard({
  answer: { id, title, isChecked, isCorrect },
  isDisabled = false,
  onCheck
}: AnswerCardProps): JSX.Element {
  const isConfirmed = typeof isCorrect === 'boolean'
  const statusColor = isConfirmed ? (isCorrect ? 'green' : 'red') : 'yellow'

  const primaryBoxStatusStyle = {
    background: `${statusColor}.100`,
    borderColor: `${statusColor}.500`
  }

  return (
    <PrimaryBox
      display="flex"
      gridGap={4}
      cursor="pointer"
      onClick={() => !isDisabled && onCheck(id)}
      {...(!isConfirmed ? {} : primaryBoxStatusStyle)}
    >
      <Checkbox
        size="lg"
        colorScheme={statusColor}
        flex={1}
        fontSize="sm"
        isChecked={!!isChecked}
        disabled={isDisabled}
      >
        {title}
      </Checkbox>
    </PrimaryBox>
  )
}
