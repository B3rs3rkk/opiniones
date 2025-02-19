import { Router, Router } from "express";
import { getUserById, getUsers,deleteUser, updatePassword } from "./user.controller.js";
import { getUserByIdValidator , deleteUserValidator, updatePasswordValidator} from "../middlewares/validators";
import router from "../auth/auth.routes.js";

const Router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("updatePassword/:uid",  updatePasswordValidator, updatePassword)

export default router
