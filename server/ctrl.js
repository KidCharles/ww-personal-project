
const axios = require('axios');
require('dotenv').config();



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

    getCart: (req, res, next) => {
        const db = req.app.get('db');
        const { id } = req.params
        db.cart_get_user([id])
            .then(cart => res.status(200).send(cart))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    deleteCartItem: (req, res, next) => {
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
            .then(res => res.status(200).send(res))
            .catch((err) => {
                console.log(err)
                res.status(500).send()
            })
    },

    getAddress: (req, res, next) => {
        console.log('0ver90000000000000!')
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
    }



}