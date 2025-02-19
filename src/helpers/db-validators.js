import User from "../user/user.model.js";

export const emailExist = async (email = "") =>{
    const exist = await User.findOne({email})
    if (exist) {
        throw new Error("The email ${email} is alredy registered");
    }
}

export const usernameExist = async (username = "") =>{
    const exist = await User.findOne({username})
    if (exist) {
        throw new Error("The username ${username} is alredy registered");
    }
}

export const userExists = async (uid = "") =>{
    const existe = await User.findById(uid)
    if(!existe){}
    throw new Error("No exite el usuario con el ID proporcionado")
}