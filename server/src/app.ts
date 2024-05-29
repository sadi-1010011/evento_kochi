import express from "express";
import mongoose from "mongoose";
import userRoutes from './interfaces/routes/userRoutes'
import adminRoutes from './interfaces/routes/adminRoutes'
import dotenv from 'dotenv'
dotenv.config()

const app = express() 
const PORT = process.env.PORT || 3000
const MONGO_URI: any = process.env.MONGODB_CONNECTION_STRING

app.use(express.json())

app.use('/api', userRoutes)
app.use('/api/admin',adminRoutes)

mongoose.connect(MONGO_URI)
    .then(() => [
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    ])
    .catch(error => {
        console.error('Database connection error:', error)
    })