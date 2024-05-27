import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Resend } from 'resend'

const prisma = new PrismaClient()

export const getAllTransactions = async (req: Request, res: Response) => {
  const { userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const transactions = await prisma.finance.findMany({
      orderBy: {
        dateTransac: 'desc',
      },
      where: {
        userId: userID,
      },
    })

    if (!transactions) {
      res.json({ error: 'No Transactions found' })
    }

    res.json({ transactions })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createNewTransaction = async (req: Request, res: Response) => {
  const { name, description, amount, dateTransac, type, userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const newTransaction = await prisma.finance.create({
      data: {
        name,
        description,
        amount,
        dateTransac: new Date(dateTransac),
        type,
        user: {
          connect: {
            id: userID,
          },
        },
      },
    })

    res.status(200).json({ newTransaction })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  const { id, name, description, amount, dateTransac, type, userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const updatedTransaction = await prisma.finance.update({
      where: { id }, // Specify the ID of the event you want to update
      data: {
        name,
        description,
        amount,
        dateTransac: new Date(dateTransac), // Convert the date string to a Date object
        type,
        user: {
          connect: { id: userID },
        },
      },
    })

    res.status(200).json({ updatedTransaction })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}
