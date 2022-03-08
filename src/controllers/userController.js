const UserModel1 = require("../models/userModel")

const createUser = async function(req, res) {
    let data1 = req.body
    let userData = await UserModel1.create(data1)
    res.send({ msg: userData })
}
module.exports.createUser = createUser