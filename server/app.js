require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// Middleware
app.use(express.json())

app.use('/api', require('./routes/index'))

const PORT = process.env.PORT || 6000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
