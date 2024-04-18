import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET
const prisma = new PrismaClient()

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, birthdate, firstname, lastname, middlename } =
    req.body

  try {
    const checkMiddlename = middlename ? middlename : null

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        birthdate,
        firstname,
        lastname,
        middlename: checkMiddlename,
      },
    })

    // invalidate token
    res.clearCookie('token', {
      sameSite: 'none',
      secure: true,
    })

    const token = jwt.sign({ userID: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    })

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
    })

    res.json({ token: token, userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: "Couldn't find your account." })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: 'Incorrect password, Please try again' })
    }

    // invalidate token
    res.clearCookie('token', {
      sameSite: 'none',
      secure: true,
    })

    const token = jwt.sign({ userID: user.id }, SECRET_KEY, {
      expiresIn: '1h',
    })

    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
    })

    res.json({ token: token, userId: user.id })
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' })
  }
}
