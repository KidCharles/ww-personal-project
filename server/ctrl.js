
require('dotenv').config();

const {
   ACCESS_TOKEN
} = process.env


module.exports = {

    getInsta: (req, res){
        Axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${ACCESS_TOKEN}`).then(
           res => res.status(200).sendr(res.data)
        )
    }

}