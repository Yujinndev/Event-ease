import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

export const registerUser =
  (prisma: PrismaClient) => async (req: Request, res: Response) => {
    const { email, password, birthdate, firstname, lastname, middlename } =
      req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          birthdate,
          firstname,
          lastname,
          middlename,
        },
      })

      res.json({ message: 'User registered successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' })
    }
  }

export const loginUser =
  (prisma: PrismaClient) => async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      //   const isPasswordValid = await bcrypt.compare(password, user.password)
      const isPasswordValid = password === user.password

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: 'Incorrect password, Please try again' })
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: '1h',
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      res.json({ id: user.id, name: user.firstname })
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' })
    }
  }
