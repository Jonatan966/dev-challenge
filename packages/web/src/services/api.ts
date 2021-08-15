import axios from 'axios'
import { get as getCookie } from 'js-cookie'
import { AuthObject } from '@dev-challenge/entities'
import { setAuthCookies } from '../contexts/auth-context'

const API_URL = 'https://jonatan-dev-challenge.herokuapp.com'

const api = axios.create({
  baseURL: API_URL
})

function defineAxiosInterceptor(): void {
  api.interceptors.request.use(request => {
    request.headers.authorization = 'Bearer ' + getCookie('devchallenge-token')

    return request
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return new Promise((resolve, reject) => {
        const originalRequest = error.config

        if (error.message === 'Network Error') {
          const defaultError = {
            response: {
              data: {
                errorType: 'internal',
                statusCode: 404,
                message: 'Não foi possível se conectar com o servidor'
              }
            }
          }

          return reject(defaultError)
        }

        if (
          error.response?.status === 401 &&
          error.config &&
          !error.config._retry
        ) {
          originalRequest._retry = true

          const refreshToken = getCookie('devchallenge-refreshtoken')

          const res = axios
            .post<AuthObject>(`${API_URL}/refresh-token`, {
              refreshToken: refreshToken || ''
            })
            .then(res => {
              setAuthCookies(res.data)
              originalRequest.headers.authorization = `Bearer ${res.data.token}`

              return axios(originalRequest)
            })

          resolve(res)
        } else {
          reject(error)
        }
      })
    }
  )
}

export { api, defineAxiosInterceptor }
