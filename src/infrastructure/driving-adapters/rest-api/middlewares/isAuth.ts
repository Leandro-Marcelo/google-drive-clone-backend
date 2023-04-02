import { User } from "../../../../domain/entities/user"
// * TYPES AND INTERFACES
import { Request, Response, NextFunction } from "express"

// * ERRORS
import { SessionJwtDecodedIsNullException } from "../../../../domain/exceptions/auth/SessionJwtDecodedIsNullException"
import { SessionJwtNotProvidedException } from "../../../../domain/exceptions/auth/SessionJwtNotProvidedException"
import { SessionJwtExpiredException } from "../../../../domain/exceptions/auth/SessionJwtExpiredException"

// * DEPENDENCIES
import jwt from "jsonwebtoken"

// * CONFIGS
import { JWT_SECRET, SESSION_COOKIE_NAME } from "../../../../domain/configs"

// * 1
const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  verifyToken(req, res, next)
}

// * 2
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies === undefined) {
    next(new SessionJwtNotProvidedException())
    return
  }

  let sessionToken: string | undefined

  if (typeof req.cookies[SESSION_COOKIE_NAME] === "string") {
    sessionToken = req.cookies[SESSION_COOKIE_NAME]
  } else if (typeof req.headers.authorization === "string") {
    sessionToken = req.headers.authorization
  }

  if (sessionToken === undefined) {
    next(new SessionJwtNotProvidedException())
    return
  }
  handleToken(req, res, next, sessionToken)
}

// * 3
const handleToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  sessionToken: string
): void => {
  try {
    const decoded = jwt.verify(sessionToken, JWT_SECRET) as Omit<
      User,
      "password"
    >
    if (decoded === null) {
      next(new SessionJwtDecodedIsNullException())
      return
    }

    req.currentUser = decoded
    req.authJwt = sessionToken
    return next()
  } catch (err) {
    console.log(err)
    return next(new SessionJwtExpiredException())
  }
}

export { isAuth }
