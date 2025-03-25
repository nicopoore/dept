import jwt, { JwtPayload } from 'jsonwebtoken'

interface TokenPayload extends JwtPayload {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      currentUserId?: string
    }
  }
}

export const auth = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    console.error('No token provided')
    return res.status(401).json({ error: 'No token provided' })
  }

  if (!token) {
    console.error('Invalid token format')
    return res.status(401).json({ error: 'Invalid token format' })
  }

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    if (!jwtSecretKey) {
      console.error('JWT Secret Key not set in environment variables')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const decodedToken = jwt.verify(token, jwtSecretKey) as TokenPayload
    req.currentUserId = decodedToken.userId

    return next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({ error: 'Invalid token' })
  }
}
