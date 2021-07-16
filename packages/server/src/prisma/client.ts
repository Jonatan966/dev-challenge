import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const databaseClient = new PrismaClient()

export { databaseClient }
