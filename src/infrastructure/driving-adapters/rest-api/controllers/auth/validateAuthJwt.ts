import { Request, Response, NextFunction } from "express"
import { User } from "../../../../../domain/entities/user"

export const validateAuthJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentUser = req.currentUser as Omit<User, "password">
    const authJwt = req.authJwt
    res.status(200).json({
      currentUser,
      authJwt,
    })
    return
  } catch (err) {
    return next(err)
  }
}
