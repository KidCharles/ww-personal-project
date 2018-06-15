module.exports = function (req, res, next) {
    if (!req.session.user) {
        req.session.user = { session_id: '', user_id: '', username: '' }
    }
    next()
}

// make a query to the DB to check 
//if admin is true allow access to admin,

// select * from wwusers
// where is_admin = true

