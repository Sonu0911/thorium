const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please provide a valid 10 digit Mobile Number'],
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password min length should be 8"],
        maxLength: [15,
            "password max length should be 15 "
        ]
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            minLength: [6, "pincode min length should be 6"],
            maxLength: [6,
                "pincode max length should be 6 "
            ],
            trim: true
        },


    }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema)