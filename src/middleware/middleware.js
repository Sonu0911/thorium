let mid1 = function(req, res, next) {
    let xAuthToken = req.headers["x-auth-token"]
    if (xAuthToken != undefined) {
        console.log("done")
        next()
    } else {
        res.send("PLEASE SEND A HEADER FILE OTHER WISE THE CODE WILL NOT WORK")
    }
}

module.exports.mid1 = mid1;