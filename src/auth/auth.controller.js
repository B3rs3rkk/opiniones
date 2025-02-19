import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try{
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data)

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email,
            password : user.password
        })
    }catch(err){
        return res.status(502).json({
            message: "User registration failed",
            error: err.message
        })
    }
}
export const login = async (res, req) => {
    const {email, username, password} = req.body
    try {
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if (!user){
            return res.status(400).json({
                message: "credenciales invalidas",
                error: "no existe el correo o usuario ingresado"
            })            
        }

        const validPassword = await verify(user.password, password)

        if (!validPassword) {
            return res.status(400).json({
                message: "credenciales invalidas",
                error: "contraseña invalida"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "login successful",
            userDetails: {
                    token: token,
                    profilePicture: user.profilePicture
            }
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}