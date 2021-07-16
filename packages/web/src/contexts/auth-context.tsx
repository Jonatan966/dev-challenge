import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode
} from 'react'
import { AxiosError } from 'axios'
import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie
} from 'js-cookie'
import { AppErrorConfig, AuthObject, User } from '@dev-challenge/entities'
import { CreateUserDTO } from '@dev-challenge/dto'

import { api } from '../services/api'

interface AuthContextProps {
  user: User
  isLoading: boolean
  logIn: (email: string, password: string) => Promise<AppErrorConfig | null>
  logOut: () => Promise<void>
  registerUser: (data: CreateUserDTO) => Promise<AppErrorConfig | null>
}

interface AuthProviderProps {
  children?: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function setAuthCookies({ token, refreshToken }: AuthObject): void {
  setCookie('devchallenge-token', token, {
    path: '/'
  })
  setCookie('devchallenge-refreshtoken', refreshToken.id, {
    expires: new Date(refreshToken.expiresIn * 1000),
    path: '/'
  })
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  async function getUserInformation(token: string) {
    const { data: userInformation } = await api.get<User>('/users/me', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    return userInformation
  }

  async function logIn(email: string, password: string) {
    try {
      const { data: accessToken } = await api.post<AuthObject>('/login', {
        email,
        password
      })

      setAuthCookies(accessToken)

      const userInformation = await getUserInformation(accessToken.token)

      setUser(userInformation)
    } catch (e) {
      const error: AxiosError<AppErrorConfig> = e

      return error.response?.data
    }
  }

  async function registerUser({ name, email, password }: CreateUserDTO) {
    try {
      await api.post('/users', {
        name,
        email,
        password
      })
    } catch (e) {
      const error: AxiosError<AppErrorConfig> = e

      return error.response?.data
    }
  }

  async function logOut() {
    removeCookie('devchallenge-refreshtoken')
    removeCookie('devchallenge-token')

    setUser(null)
  }

  useEffect(() => {
    setIsLoading(true)

    const token = getCookie('devchallenge-token')

    if (!token) {
      setIsLoading(false)
      return
    }

    getUserInformation(token)
      .then(userInfo => {
        setUser(userInfo)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logIn,
        logOut,
        registerUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth: () => AuthContextProps = () => useContext(AuthContext)