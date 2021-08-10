import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuth } from '../contexts/auth-context'
import { CenteredSpinner } from './centered-spinner'

interface AuthVerificationRouteProps extends RouteProps {
  isPrivate?: boolean
  redirectAfterVerified?: string
}

export function AuthVerificationRoute({
  isPrivate = false,
  redirectAfterVerified,
  ...routeProps
}: AuthVerificationRouteProps): JSX.Element {
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return <CenteredSpinner />
  }

  if (!user && isPrivate) {
    return <Redirect to="/auth" />
  }

  if (redirectAfterVerified && user) {
    return <Redirect to={redirectAfterVerified} />
  }

  return <Route {...routeProps} />
}
