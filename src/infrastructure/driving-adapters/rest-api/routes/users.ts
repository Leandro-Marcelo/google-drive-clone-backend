// * DEPENDENCIES
import express from "express"

// * CONTROLLERS
import { getAllUsers } from "../controllers/users/getAllUsers"
import { getUser } from "../controllers/users/getUser"
import { createUser } from "../controllers/users/createUser"
import { updateUserById } from "../controllers/users/updateUserById"
import { deleteUserById } from "../controllers/users/deleteUserById"

const router = express.Router()

// * ROUTES
router.get("/", getAllUsers)

router.get("/unique", getUser)

router.post("/", createUser)

router.put("/:userId", updateUserById)

router.delete("/:userId", deleteUserById)

export default router
