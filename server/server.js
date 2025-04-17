import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import router from './routes/userRoute.js'
import imgaeRouter from './routes/imageRoute.js'

const PORT = process.env.PORT || 4000
const app = express()


// MiddleWares
app.use(express.json())
app.use(cors())

await connectDB()


app.use('/api/user', router)
app.use('/api/image', imgaeRouter)


app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT} port`)
})
