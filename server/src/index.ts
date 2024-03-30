import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { authRouter } from './routes/authentication'

const app: Express = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 8080

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.use('/auth', authRouter(prisma))

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
