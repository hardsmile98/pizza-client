import { useState, useCallback } from 'react'

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface IRequest {
  (url: string, method?: methodType, body?: any, headers?: any): any
}

const useHttp = () => {
  const [error, setError] = useState<string | null>(null)

  const request: IRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        const baseUrl = 'http://localhost:5000' + url
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(baseUrl, {
          method,
          body,
          headers,
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так')
        }

        return data
      } catch (e) {
        setError(e.message)
        throw e
      }
    },
    []
  )

  const clearError = useCallback(() => setError(null), [])

  return { error, request, clearError }
}

export default useHttp
