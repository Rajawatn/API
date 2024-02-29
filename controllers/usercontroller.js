const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dtsiv1iir',
    api_key: '287327449485171',
    api_secret: 'WmFpz_g0Ycmtf7dqqbY42VXZvro'
})


class UserController {

    static getalluser = async (req, res) => {
        try {
            res.send('hello ')
        } catch (error) {
            console.log(error);
        }
    }
    static userinsert = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            const file = req.files.image;
            // image uplaod//
            const uploadimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileimgAPI'
            })
            // console.log(uploadimage)
            const { name, email, password, confirmpassword } = req.body
            const user = await UserModel.findOne({ email: email })
            // console.log(user)

            if (user) {
                res.status(401)
                    .json({ status: "failed", message: "THIS EMAIL IS ALREADY EXISTS" })
            } else {
                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        const hashpassword = await bcrypt.hash(password, 10)
                        const result = new UserModel({
                            name: name,
                            email: email,
                            password: hashpassword,
                            image: {
                                public_id: uploadimage.public_id,
                                url: uploadimage.secure_url,
                            }

                        })
                        await result.save()
                        res.status(201)
                            .json({ status: "SUCCESS", message: "REGISTRATION SUCCESSFULL PLZ LOGIN" })
                    } else {
                        res.status(401)
                            .json({ status: "failed", message: " PASSWORD AND CONFIRM PASSWORD DOESNOT MATCH " })
                    }
                } else {
                    res.status(401)
                        .json({ status: "failed", message: "ALL FIELDS ARE REQUIRED" })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



}
module.exports = UserController