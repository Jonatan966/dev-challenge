import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text
} from '@chakra-ui/react'
import { ChallengeHeader } from '../components/challenge-header'
import { PrimaryBox } from '../components/primary-box'
import { PrimaryProgress } from '../components/primary-progress'
import { ProgressInfoCard } from '../components/progress-info-card'

export function ChallengeDetailsPage(): JSX.Element {
  return (
    <Flex flexDir="column" height="100vh">
      <ChallengeHeader />

      <Flex flexDir="column" p={5} flex={1} as="main" gridGap={5}>
        <Box as="section">
          <Heading fontSize="xl" mb={2}>
            Descrição
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
            corrupti ex libero illo fuga similique? Quam, quis autem eligendi
            eum voluptatum quod possimus voluptatem facere natus sapiente
            tenetur perferendis quibusdam.
          </Text>
        </Box>

        <Box as="section">
          <ProgressInfoCard value={9} max={15} title="Em andamento">
            Faltam <strong>2 questões</strong> para finalizar o desafio
          </ProgressInfoCard>
        </Box>

        <Box as="section" hidden>
          <Heading fontSize="xl" mb={2}>
            Resultado final
          </Heading>
          <Flex>
            <Text>
              <strong>2</strong> acertos
            </Text>
            <Spacer />
            <Text>
              de <strong>10</strong> questões
            </Text>
          </Flex>
          <PrimaryProgress background="red.400" value={20} />
        </Box>

        <Grid as="section" templateColumns="repeat(2, 1fr)" gap={2} hidden>
          <PrimaryBox>
            <strong>Começou em:</strong> 12/12/2012 às 12:00
          </PrimaryBox>
          <PrimaryBox>
            <strong>Terminou em:</strong> 12/12/2012 às 12:00
          </PrimaryBox>
        </Grid>
      </Flex>

      <Flex
        as="footer"
        flexDir="column"
        p={5}
        borderTop="1px"
        borderColor="gray.300"
        background="#F5F5FA"
      >
        <Button background="green.400" colorScheme="green">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
