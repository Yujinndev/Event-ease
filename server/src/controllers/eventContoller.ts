import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Resend } from 'resend'

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
  const { title, category, desc, date, location, userID } = req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        category,
        status: 'UPCOMING',
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

    res.status(200).json({ newEvent })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}
export const updateEvent = async (req: Request, res: Response) => {
  const { eventId, title, category, desc, date, location, userID, status } =
    req.body

  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId }, // Specify the ID of the event you want to update
      data: {
        title,
        category,
        status, // Set the status to 'UPCOMING'
        desc,
        date: new Date(date), // Convert the date string to a Date object
        location,
        organizer: {
          connect: { id: userID },
        },
      },
    })

    res.status(200).json({ updatedEvent })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}

export const sendEmailToGuest = async (req: Request, res: Response) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { title, email } = req.body

  try {
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Invitation of ${title}`,
      html: `<p>You are invited to <strong>${title}</strong>!</p>`,
    })

    res.status(200).json({ message: 'Email Sent!' })
  } catch (error) {
    res.status(500).json({ error: `Internal server error && ${error}` })
  }
}
