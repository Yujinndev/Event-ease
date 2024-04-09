import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getUserFullDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// export const getUserEvents = (prisma: PrismaClient) => async (req: Request, res: Response) {
//     const { id } = req.body

// }
