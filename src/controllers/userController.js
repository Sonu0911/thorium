const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

const createUser = async function(req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })

        const { title, name, phone, email, password, address: { street, city, pincode } } = data

        if (!title) {
            return res.status(400).send({ status: false, msg: "title is required" })
        }

        if (!name) {
            return res.status(400).send({ status: false, msg: "name is required" })
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).send({ status: false, msg: "valid phone number is required" })
        }

        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "valid email is required" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Plz enter valid password" })
        }
        if (password.length < 8 || password.length > 15) {
            return res.status(400).send({ status: false, msg: "passowrd min length is 8 and max len is 15" })
        }
        // if (!street) {
        //     return res.status(400).send({ status: false, msg: "Plz enter valid street" })
        // }

        // if (!city) {
        //     return res.status(400).send({ status: false, msg: "Plz enter valid city" })
        // }

        // if (!pincode) {
        //     return res.status(400).send({ status: false, msg: "Plz enter valid pincode" })
        // }


        let dupliPhone = await UserModel.find({ phone: phone })
        if (dupliPhone.length > 0) {
            return res.status(400).send({ status: false, msg: "phone number already exits" })
        }

        let dupliEmail = await UserModel.find({ email: email })
        if (dupliEmail.length > 0) {
            return res.status(400).send({ status: false, msg: "email is already exists" })
        }


        let savedData = await UserModel.create(data)
        res.status(201).send({
            status: true,
            msg: "user created successfully",
            msg2: savedData
        })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const loginUser = async function(req, res) {
    try {
        let user = req.body

        if (Object.keys(user) == 0) {
            return res.status(400).send({ status: false, msg: "please provide data" })
        }

        let userName = req.body.email
        let password = req.body.password

        if (!userName) {
            return res.status(400).send({ status: false, msg: "userName is required" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "password is required" })
        }

        let userDetailsFind = await UserModel.findOne({ email: userName, password: password })
        if (!userDetailsFind) {
            return res.status(400).send({ status: false, msg: "userName or password is not correct" })
        };

        let token = jwt.sign({
            userId: userDetailsFind._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
        }, "rushi-159");

        res.setHeader("x-api-key", token);
        res.status(200).send({
            status: true,
            msg: "user login successfully",
            data: token
        })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports.createUser = createUser
module.exports.loginUser = loginUser