require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
app.use(cookieParser())

app.use('/api', require('./routes/index'))

app.use(errorMiddleware)

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 6000
		mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	} catch (error) {
		console.error(error)
	}
}

bootstrap()
