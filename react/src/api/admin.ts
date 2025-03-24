import axios from 'utils/axios'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/admin/token', {
      //TODO: Check where userId comes from
      userId: email,
    })
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
