import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'

export const useAuth = () => {
  const { token, setToken, isAuthenticated } = useContext(AuthContext)

  return { token, setToken, isAuthenticated }
}
