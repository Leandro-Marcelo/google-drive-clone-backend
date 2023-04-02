// * DEPENDENCIES
import express from "express"

// * CONTROLLERS
import { getAllUsers } from "../controllers/user/getAllUsers"
import { getUser } from "../controllers/user/getUser"
import { createUser } from "../controllers/user/createUser"
import { updateUserById } from "../controllers/user/updateUserById"
import { deleteUserById } from "../controllers/user/deleteUserById"

const router = express.Router()

// * ROUTES
router.get("/", getAllUsers)

router.get("/unique", getUser)

router.post("/", createUser)

router.put("/:userId", updateUserById)

router.delete("/:userId", deleteUserById)

export default router
