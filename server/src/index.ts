import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from './routes/authRoutes'
import { userRouter } from './routes/userRoutes'
import { authMiddleware } from './middleware/authentication'
import { eventRouter } from './routes/eventRoutes'

const app: Express = express()
const port = process.env.PORT || 8080

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', authRouter())
app.use('/user', authMiddleware, userRouter())
app.use('/event', authMiddleware, eventRouter())

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
