import { Router} from "express";
import { register, login } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFilrOnError } from "../middlewares/file-have-error-delete.js";

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFilrOnError,
    register)


router.post(
    "/login",
    loginValidator,
    deleteFilrOnError,
    login
)

export default router