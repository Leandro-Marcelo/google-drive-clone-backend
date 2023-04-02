// * DEPENDENCIES
import express from "express"

// * CONTROLLERS
import { getAllUser } from "../controllers/user/getAllUser"
import { getUser } from "../controllers/user/getUser"
import { createUser } from "../controllers/user/createUser"
import { updateUserById } from "../controllers/user/updateUserById"
import { deleteUserById } from "../controllers/user/deleteUserById"

const router = express.Router()

// * ROUTES
router.get("/", getAllUser)

router.get("/unique", getUser)

router.post("/", createUser)

router.put("/:userId", updateUserById)

router.delete("/:userId", deleteUserById)

export default router
