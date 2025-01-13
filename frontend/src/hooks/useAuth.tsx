import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface IUser {
  userId: string
  userEmail: string
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
      if (checkTokenExpiry(accessToken)) {
        navigation('/auth')
        toast.error('Token Expired');
        localStorage.removeItem('accessToken');
        throw new Error('Access token expired.');
      }

      const decodedAccessToken = jwtDecode<IUser>(accessToken)
      setUser(decodedAccessToken)
    } catch (error) {
      handleFetchError(error)
    } finally {
      setLoading(false)
    }
  }

  const checkTokenExpiry = (accessToken: string) => {
    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    return Date.now() >= exp * 1000;
  };

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
    navigation('/auth')
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    toast.success("Logout successfull")
    navigation('/auth')
  }


  useEffect(() => {
    fetchData()
  }, [navigation]) // eslint-disable-line react-hooks/exhaustive-deps

  return { user, logout, loading, error }
}
