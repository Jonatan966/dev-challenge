import 'express-async-errors'
import express from 'express'
import cors from 'cors'

import { routes } from './routes'
import { errorHandler } from './utils/error-handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

export { app }
