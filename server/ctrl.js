
const axios = require('axios');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)




module.exports = {

    getInsta: (req, res) => {
        const {
            ACCESS_TOKEN
        } = process.env
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.ACCESS_TOKEN}`)
            .then(results => {
                let images = results.data.data.map((e, i) => {
                    return e.images.standard_resolution.url
                })
                res.status(200).send(images)
            })
            .catch(x => {
                res.status(200).send(x)
            })
    },

    getTrips: (req, res) => {
        const db = req.app.get('db');
        db.get_trips()
            .then(trips => res.status(200).send(trips))
            .catch(() => res.status(500).send())
    },

    addTrip: (req, res) => {
        const db = req.app.get('db');
        const { trip_name, trip_img, trip_long_desc, trip_short_desc, trip_price, trip_color } = req.body
        db.add_trip([trip_name, trip_img, trip_long_desc, trip_short_desc, trip_price, trip_color])
            .then(trips => res.status(200).send(trips))
            .catch(() => res.status(500).send())
    },

    deleteTrip: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        //YOU NEED TO SEND INFO IN SQUARE BRACKETS!!
        db.delete_trip([id])
            .then(trips => res.status(200).send(trips))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    getGear: (req, res) => {
        const db = req.app.get('db');
        db.get_gear()
            .then(gear => res.status(200).send(gear))
            .catch(() => res.status(500).send())
    },

    addGear: (req, res) => {
        const db = req.app.get('db');
        const { gear_name, gear_img, gear_long_desc, gear_short_desc, gear_price } = req.body
        db.add_gear([gear_name, gear_img, gear_long_desc, gear_short_desc, gear_price])
            .then(gear => res.status(200).send(gear))
            .catch(() => res.status(500).send())
    },

    deleteGear: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        //YOU NEED TO SEND INFO IN SQUARE BRACKETS!!
        db.delete_gear([id])
            .then(gear => res.status(200).send(gear))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    getCart: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        db.cart_get_user([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => { res.status(500).send() })
    },

    addToCartGear: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { user_id } = req.user
        //add the '+' in front of the req.params ALWAYS if you need the datt to be a number
        db.add_to_cart_gear([user_id, +id])
            .then(cart => res.status(200).send(cart))
            .catch(() => res.status(500).send())
    },

    addToCartTrips: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        const { user_id } = req.user
        //add the '+' in front of the req.params ALWAYS if you need the datt to be a number
        db.add_to_cart_trips([user_id, +id])
            .then(cart => res.status(200).send(cart))
            .catch(() => res.status(500).send())
    },


    deleteCartItem: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params
        //YOU NEED TO SEND INFO IN SQUARE BRACKETS!!
        db.cart_delete([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    updatePaid: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.params
        db.update_paid([id])
            .then(response => res.status(200).send(response))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    getAddress: (req, res, next) => {
        if (req.user) {
            const db = req.app.get('db');
            const { id } = req.params
            db.get_address([id])
                .then(res => res.status(200).send(res))
        }
    },

    updateAddress: (req, res, next) => {
        const { id, street1, street2, city, state, zip } = req.body
        const db = req.app.get('db');
        db.update_address([id, street1, street2, city, state, zip])
            .then(res => res.status(200).send(res))
    },

    "stripe": (req, res, next) =>  {
        //convert amount to pennies
        // console.log(req)
        // console.log(req.session)

        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
            if (amountArray[i] === ".") {
                if (typeof amountArray[i + 1] === "string") {
                    pennies.push(amountArray[i + 1]);
                } else {
                    pennies.push("0");
                }
                if (typeof amountArray[i + 2] === "string") {
                    pennies.push(amountArray[i + 2]);
                } else {
                    pennies.push("0");
                }
                break;
            } else {
                pennies.push(amountArray[i])
            }
        }
        const convertedAmt = parseInt(pennies.join(''));
    
        const charge = stripe.charges.create({
            amount: convertedAmt, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'Test charge from react app'
        }, function (err, charge) {
            if (err) return res.sendStatus(500)
         //YOU CAN ADD EXTRA DB QUERIES
         console.log(req.params)
         const db = req.app.get('db');
         const { id } = req.params
        //  const { user_id } = req.user
         db.cart_clear([id])
         .then(cart =>  res.status(200).send(cart))
            
            // if (err && err.type === 'StripeCardError') {
            //   // The card has been declined
            // }
        });
    }



}