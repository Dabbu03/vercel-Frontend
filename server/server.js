import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import serverless from 'serverless-http'

import connectDB from './config/mongodb.js'
import router from './routes/userRoute.js'
import imageRouter from './routes/imageRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

await connectDB()

app.use('/api/user', router)
app.use('/api/image', imageRouter)

// ✅ Export the serverless handler for Vercel
export const handler = serverless(app)

// ✅ Still run locally with app.listen()
const PORT = process.env.PORT || 4000
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running locally at http://localhost:${PORT}`)
  })
}
