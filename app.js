const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(cors())//for api communication in react js//


// tempfile uploader //
app.use(fileUpload({ useTempFiles: true }));
// for datget in api
app.use(express.json())


connectdb()

// route load//
app.use('/api', web)

//localhiost:4000/api







//server create//
app.listen(process.env.PORT, () => {
    console.log(`server running on localhost:${process.env.PORT}`)
})