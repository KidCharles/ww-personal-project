
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
                console.log(x)
                res.status(200).send(x) 
            })
    },

    addTrip: (req, res) => {
        const db = req.app.get('db');
        const {trip_name, trip_img, trip_long_desc, trip_short_desc, trip_price, trip_color} = req.body
        db.add_trip([trip_name, trip_img, trip_long_desc, trip_short_desc, trip_price, trip_color])
            .then(trips => res.status(200).send(trips))
            .catch(() => res.status(500).send())
    }


}