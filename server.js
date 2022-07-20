const express = require("express")
const app = express()
const PORT = 800
const mongoose = require('mongoose')
require('dotenv').config()

// connecting the mongoose to the server
connectingString = process.env.DATABASE_URL
mongoose.connect(connectingString)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',()=> console.log("connected to database"))

// allows our server to accept json
app.use(express.json())
// setting route
const subscriberRoutes = require('./routes/subscribers')
app.use('/subscribers', subscriberRoutes)

app.listen(PORT,()=>{
    console.log("connected to server")
})


