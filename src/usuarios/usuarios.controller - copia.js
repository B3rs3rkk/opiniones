import { hash } from "argon2";
import User from "./user.model.js"

export const getUserById = async (req, res) =>{
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err
        })
    }
}

export const getUsers = async (req, res) => {
try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params
        
        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: "Error al eliminar el usuario",
        error: err.message
        }) 
    }
}

export const updatePassword = async (req,res) =>{
    try{
        const {uid} = req.params
        const {newPassword} = req.body
 
        const encryptedPassword = await hash(newPassword)
        const user = await User.findByIdAndUpdate(uid, {password:encryptedPassword}, {new: true})
 
        return res.status(200).json({
            succes:true,
            message: "contrase"
        })
    }catch(err){
        return res.status(500).json({
            succes: false ,
            message: "error al eliminar el usuario",
            error: err.message
        })
    }
}

