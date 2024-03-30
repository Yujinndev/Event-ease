import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.body.userId = (decoded as { userId: number }).userId

    next()
  } catch (error) {
    res.status(403).json({ error: 'Failed to authenticate token' })
  }
}
