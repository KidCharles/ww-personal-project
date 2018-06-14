require('dotenv').config()
// const cors = require('cors')
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , ctrl = require('./ctrl')

//this is middleware that checks if the user has a session on it, if not assigns one
const checkUserSession = require('./middleware/checkUserSession')

const {
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env

const app = express()

massive(CONNECTION_STRING).then(db => { app.set('db', db) })

app.use(bodyParser.json())
// app.use(cors())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// app.use(checkUserSession)
// AUTH0--------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new Auth0Strategy(
        {
            domain: DOMAIN,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: "openid profile"
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            //query our db here
            const db = app.get("db");
            let { id, displayName, picture } = profile;
            db.find_user([id]).then(user => {
                //data will always be returned in an array
                console.log(user[0], profile, id)
                if (user[0]) {
                    done(null, user[0].id);
                } else {
                    db.create_user([ displayName, picture, id]).then((createdUser) => {
                        done(null, createdUser[0].id)
                    })
                }
            });
        }
    )
);

passport.serializeUser((primaryKeyId, done) => {
    done(null, primaryKeyId);
    //the data in {profile} up above is stored in the session store
});
passport.deserializeUser((primaryKeyId, done) => {
    // done(null, primaryKeyId);
    app.get("db").find_session_user([primaryKeyId]).then(user => {
        done(null, user[0]);
    })
    //this is called as middleware, it goes to the session store, grabs {profile} or any value tied to that session, and passes it into the function //runs after somoene has logged in 
    //gets data from session store and puts data on *****req.user
});

// AUTH0--------------------------------------------------

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/'
    //you can add failureRedirect, or connect
}))

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000')
})
app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Nice try')
    }
})


//endpoints:
app.get('/insta', ctrl.getInsta)
app.get('/api/trips', ctrl.getTrips)
app.post('/addtrip', ctrl.addTrip)
app.delete('/api/trip/:id', ctrl.deleteTrip)


// app.post('/login', ctrl.loginUser)
// app.post('/register', ctrl.registerUser)

const port = 3030
app.listen(port, () => console.log(`server is Glistening on port ${port}`))