import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getAllEvents = async (req: Request, res: Response) => {
  const { userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
      where: {
        organizerId: userID,
      },
    })

    if (!events) {
      res.json({ error: 'No events found' })
    }

    res.json({ events })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getEventFullDetails = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const event = await prisma.event.findFirst({
      where: { id },
    })

    if (!event) {
      res.status(404).json({ error: 'No event found' })
    }

    res.json({ event })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createNewEvent = async (req: Request, res: Response) => {
  const { title, category, status, desc, date, location, userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        category,
        status,
        desc,
        date: new Date(date),
        location,
        organizer: {
          connect: {
            id: userID,
          },
        },
      },
    })

    res.json({ newEvent })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}
