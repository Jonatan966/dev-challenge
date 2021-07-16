import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { AppLogoHeader } from './components/app-logo-header'
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
      <AuthProvider>
        <ChakraProvider>
          <Switch>
            <Route path="/auth">
              <AppLogoHeader />
              <Switch>
                <Route exact path="/auth" component={LoginPage} />
                <Route exact path="/auth/register" component={RegisterPage} />
                <Redirect from="/auth/*" to="/404" />
              </Switch>
            </Route>

            <Route exact path="/challenges" component={HomePage} />
            <Route
              exact
              path="/challenges/:id"
              component={ChallengeDetailsPage}
            />
            <Route exact path="/challenge" component={ChallengeQuestionPage} />
          </Switch>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
