import { Flex } from '@chakra-ui/react'
import { useEffect, createContext, useContext, useState } from 'react'

import { CenteredSpinner } from '../components/centered-spinner'

interface LoadingContextProps {
  setLoadingState(state: boolean): void
}

interface LoadingProvidwerProps {
  children: React.ReactNode
}

const LoadingContext = createContext({} as LoadingContextProps)

function FullPageLoader() {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      background="white"
      zIndex={9999}
    >
      <CenteredSpinner />
    </Flex>
  )
}

export function LoadingProvider({
  children
}: LoadingProvidwerProps): JSX.Element {
  const [loadSubscriptionsCount, setLoadSubscriptionsCount] = useState(0)

  const isLoading = !!loadSubscriptionsCount

  function setLoadingState(state: boolean): void {
    setLoadSubscriptionsCount(old => {
      const increment = old + (state ? 1 : -1)

      return increment < 0 ? 0 : increment
    })
  }

  return (
    <LoadingContext.Provider value={{ setLoadingState }}>
      {isLoading && <FullPageLoader />}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = (): LoadingContextProps => useContext(LoadingContext)

export function LoadingTrigger(): JSX.Element {
  const { setLoadingState } = useLoading()

  useEffect(() => {
    setLoadingState(true)

    return () => setLoadingState(false)
  }, [])

  return <></>
}
