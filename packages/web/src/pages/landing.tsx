import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ChallengeCard } from '../components/challenge-card'
import { PrimaryHeader } from '../components/primary-header'

export function LandingPage(): JSX.Element {
  return (
    <Flex flexDir="column">
      <PrimaryHeader
        p={3}
        gridGap={3}
        justifyContent="flex-start"
        as="header"
        position="sticky"
        top="0"
        zIndex={9999}
      >
        <Image src="/icons/logo.png" mr="auto" width="28" />
        <Button variant="link" to="/auth/register" color="HighlightText">
          Cadastro
        </Button>
        <Link to="/auth">
          <Button colorScheme="green">Login</Button>
        </Link>
      </PrimaryHeader>

      <Box as="main">
        <Flex
          as="article"
          justifyContent="center"
          alignItems="center"
          height="85vh"
          flexDir="column"
          background="gray.300"
          paddingLeft={2}
          paddingRight={2}
        >
          <Text fontSize="5xl" maxW="md" textAlign="center">
            Aprenda com gosto
          </Text>
          <Text fontSize="2xl" maxW="sm" textAlign="center">
            Complete os desafios e avance em conhecimento
          </Text>
          <Image
            src="/images/progress-card.png"
            marginTop="7"
            boxShadow="xl"
            borderRadius="15px"
          />
        </Flex>

        <Flex
          as="article"
          p={4}
          maxW="1120px"
          marginLeft="auto"
          marginRight="auto"
          width="100%"
          flexDir="column"
          gridGap={4}
        >
          <Box as="header">
            <Text fontSize="3xl">Um desafio para cada tema</Text>
            <Text fontSize="xl">
              Temos desafios para diversos conhecimentos
            </Text>
          </Box>

          <Grid
            templateColumns={{
              md: 'repeat(4, 1fr)',
              sm: 'repeat(2, 1fr)'
            }}
            gap={2}
          >
            <ChallengeCard
              challenge={{
                id: 'challenge-1',
                title: 'Gerenciamento de Estado',
                questionsCount: 5,
                iconURL: 'boba',
                subscription: {
                  id: 'subscription-1',
                  answeredQuestionsCount: 2,
                  correctAnswersCount: 0
                }
              }}
            />
            <ChallengeCard
              challenge={{
                id: 'challenge-1',
                title: 'Construindo Interfaces',
                questionsCount: 5,
                iconURL: 'boba',
                subscription: {
                  id: 'subscription-1',
                  answeredQuestionsCount: 2,
                  correctAnswersCount: 0
                }
              }}
            />
            <ChallengeCard
              challenge={{
                id: 'challenge-1',
                title: 'Integração Nativa',
                questionsCount: 5,
                iconURL: 'boba',
                subscription: {
                  id: 'subscription-1',
                  answeredQuestionsCount: 2,
                  correctAnswersCount: 0
                }
              }}
            />
            <ChallengeCard
              challenge={{
                id: 'challenge-1',
                title: 'Widgets do Flutter',
                questionsCount: 5,
                iconURL: 'boba',
                subscription: {
                  id: 'subscription-1',
                  answeredQuestionsCount: 2,
                  correctAnswersCount: 0
                }
              }}
            />
          </Grid>
        </Flex>
      </Box>
    </Flex>
  )
}
