import {Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "name is required"],
        maxLength: [25, "name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "surnanme is required"],
        maxLength: [25, "surnanme cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required:[true, "email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "pasword is required"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLegth: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true 
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {_v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}
export default model("User", userSchema)