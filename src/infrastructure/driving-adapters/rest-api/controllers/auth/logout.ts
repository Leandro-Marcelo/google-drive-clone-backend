import { Request, Response, NextFunction } from "express"
import { SESSION_COOKIE_NAME } from "../../../../../domain/configs"

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res
      .clearCookie(SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      })
      .sendStatus(204)
  } catch (err) {
    return next(err)
  }
}
