import { body, check} from "express-validator";
import { emailExist, usernameExist , userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name").not().isEmpty().withMessage("name is required"),
    body("username").not().isEmpty().withMessage("username is required"),
    body("email").not().isEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("email is required"),
    body("email").custom(emailExist),
    body("username").custom(usernameExist),
   /* body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("invalid emial"),
    body("username").optional().isString().withMessage("invalid username"),
    body("password").isLength({min: 8}).withMessage("el password debe contener al menos 8 caracteres"),
    validarCampos
]

export const getUserByIdValidator = [
    check("uid").isMongoId().withMessage("No es un ID valido"),
    check("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const deleteFileOnError = [
    check("uid").isMongoId().withMessage("No es un ID valido"),
    check("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidator = [
    check("uid").isMongoId().withMessage("No es un ID valido"),
    check("uid").custom(userExists),
    body("newPassword").isLength({min:8}).withMessage("el password deve contener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]


