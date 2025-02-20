import { Router } from "express";
import { getUserById, getUsers, deleteUser, updatePassword } from "./usuarios.controller.js";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/validators.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);
router.get("/", getUsers);
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

export default router;
