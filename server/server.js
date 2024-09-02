const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const noteRoute = require('./routes/noteRoute')
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/note', noteRoute)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})