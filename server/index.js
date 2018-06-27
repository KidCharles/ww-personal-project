require('dotenv').config()
// const cors = require('cors')
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , ctrl = require('./ctrl')
    , cors = require('cors')
    // , stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


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
app.use(cors())

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

                if (user[0]) {
                    done(null, { userId: user[0].user_id });
                    //whatever the second argument is here will be put on req.user
                    //build an object litteral to pick what to put on req.user, this 
                } else {
                    db.create_user([displayName, picture, id]).then((createdUser) => {
                        done(null, { userId: createdUser[0].user_id })
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
    app.get("db").find_session_user([primaryKeyId.userId]).then(user => {
        done(null, user[0]);
    })
    //this is called as middleware, it goes to the session store, grabs {profile} or any value tied to that session, and passes it into the function //runs after somoene has logged in 
    //gets data from session store and puts data on *****req.user

    //USE req.user.user_id to check if admin
});


// AUTH0--------------------------------------------------
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dash',
    failureRedirect: 'http://localhost:3000/#/'
}))

// app.get('/auth/logout', (req, res) => {
//     req.logOut();
//     res.redirect('http://localhost:3000')
// })


//this is checking user info
app.get('/auth/user', (req, res) => {
    // console.log(req.user)    
    if (req.user.is_admin === true) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Nice try')
    }
})

app.get('/api/userInfo', (req, res) => {
    // console.log(req.user)
    res.status(200).send(req.user);
})



app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(`https://${DOMAIN}/v2/logout?returnTo=http://localhost:3000`);
})

// app.get('/auth/me', (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).send(false);
//     } else {
//       return res.status(200).send(req.user);
//     }
//   })





//STRIPE------------------------------------------------------------------------
app.post('/api/payment/:id', ctrl.stripe)
//STRIPE------------------------------------------------------------------------

//endpoints:
app.get('/api/insta', ctrl.getInsta)
app.get('/api/trips', ctrl.getTrips)
app.post('/addtrip', ctrl.addTrip)
app.delete('/api/deleteTrip/:id', ctrl.deleteTrip)
app.get('/api/gear', ctrl.getGear)
app.post('/addGear', ctrl.addGear)
app.delete('/api/deleteGear/:id', ctrl.deleteGear)
// GET ITEMS FROM USER'S CART
app.get('/api/cart/:id', ctrl.getCart)
//DELETE FROM CART AND THE DB
app.delete('/api/cartDelete/:id', ctrl.deleteCartItem)
//UPDATE PAID
app.put('/api/updatePaid/:id', ctrl.updatePaid)
//GET ADDRESSES FROM SESSIONS
app.put('/api/getAddress/:id', ctrl.getAddress)
//UPDATE ADDRESSES FROM SESSIONS
app.put('/api/updateAddress', ctrl.updateAddress)
//ADD GEAR TO CART
app.post('/api/addToCartGear/:id', ctrl.addToCartGear)
//ADD TRIPS TO CART
app.post('/api/addToCartTrips/:id', ctrl.addToCartTrips)

const port = 3030
app.listen(port, () => console.log(`server is Glistening on port ${port}`))