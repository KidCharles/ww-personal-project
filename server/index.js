require('dotenv').config()
const cors = require('cors')
const express = require('express')
    , session = require('express-session')
    // , passport = require('passport')
    // , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , ctrl = require('./ctrl')

//this is middleware that checks if the user has a session on it, if not assigns one
const checkUserSession = require('./middleware/checkUserSession')

const {
    SESSION_SECRET,
    CONNECTION_STRING
} = process.env

const app = express()

massive(CONNECTION_STRING).then(db => { app.set('db', db) })

app.use(bodyParser.json())
app.use(cors())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkUserSession)

//endpoints:
app.get('/insta', ctrl.getInsta)
app.post('/addtrip', ctrl.addTrip)

// app.post('/login', ctrl.loginUser)
// app.post('/register', ctrl.registerUser)

const port = 3030
app.listen(port, () => console.log(`server is Glistening on port ${port}`))