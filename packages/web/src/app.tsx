import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { AppLogoHeader } from './components/app-logo-header'
import { AuthVerificationRoute } from './components/private-route'
import { AuthProvider } from './contexts/auth-context'
import { ChallengeDetailsPage } from './pages/challenge-details'
import { ChallengeQuestionPage } from './pages/challenge-question'
import { HomePage } from './pages/home'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'

import { defineAxiosInterceptor } from './services/api'

defineAxiosInterceptor()

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Switch>
            <Route path="/auth">
              <AppLogoHeader />
              <Switch>
                <AuthVerificationRoute
                  exact
                  path="/auth"
                  component={LoginPage}
                  redirectAfterVerified="/challenges"
                />
                <Route exact path="/auth/register" component={RegisterPage} />
                <Redirect from="/auth/*" to="/404" />
              </Switch>
            </Route>

            <AuthVerificationRoute
              exact
              path="/challenges"
              component={HomePage}
              isPrivate
            />
            <AuthVerificationRoute
              exact
              path="/challenges/:id"
              component={ChallengeDetailsPage}
              isPrivate
            />
            <AuthVerificationRoute
              exact
              path="/challenge"
              component={ChallengeQuestionPage}
              isPrivate
            />
          </Switch>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}
