import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export interface IUser {
  userId: string
  userIdEmails: string
  userName: string
}

export function useAuth() {
  const navigation = useNavigate();
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const accessToken = getAccessToken()
      const decodedAccessToken = jwtDecode<IUser>(accessToken)
      setUser(decodedAccessToken)
    } catch (error) {
      handleFetchError(error)
    } finally {
      setLoading(false)
    }
  }

  const getAccessToken = (): string => {
    const accessTokenFromUrl = new URLSearchParams(window.location.search).get(
      'token',
    )
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken')

    const accessToken = accessTokenFromUrl || accessTokenFromLocalStorage

    if (!accessToken) {
      throw new Error('Access token not found.')
    }

    if (accessTokenFromUrl) {
      localStorage.setItem('accessToken', accessToken)
      window.history.replaceState({}, '', window.location.pathname)
    }

    return accessToken
  }

  const handleFetchError = (error: any) => {
    setError('Error fetching user data: ' + error)
    navigation('/login')
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    navigation('/login')
  }

  useEffect(() => {
    fetchData()
  }, [navigation]) // eslint-disable-line react-hooks/exhaustive-deps

  return { user, logout, loading, error }
}
