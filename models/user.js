const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },

        image: {
            public_id: {

                type: String,
            },
            url: {
                type: String,
            }

        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: 'user'
        },

    }, { timestamps: true })
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel