import { Request, Response, Router, NextFunction } from "express"
import usersRoutes from "./users"
import authRoutes from "./auth"
import filesRoutes from "./files"
import foldersRoutes from "./folders"

import { Exception } from "../../../../domain/exceptions/Exception"
import { ZodError } from "zod"

const router = Router()

router.use("/api/users", usersRoutes)
router.use("/api/auth", authRoutes)
router.use("/api/files", filesRoutes)
router.use("/api/folders", foldersRoutes)

// Are middlewares to handle Node.JS errors
router.use(
  (err: Error | any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json(err)
    }

    if (err instanceof Exception) {
      return res.status(err.statusCode).json({
        message: err.message,
      })
    } else {
      return next(err)
    }
  }
)

// Theses are uncontrolled errors and it's good to apply a logger here and print the error to see it from the logs when deploying the server
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500)
  // TODO:send a better message to the frontend
  return res.json({
    error: "an error ocurred",
  })
})

export default router
