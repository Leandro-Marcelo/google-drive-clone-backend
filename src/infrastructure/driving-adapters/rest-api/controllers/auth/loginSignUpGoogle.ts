// * TYPES AND INTERFACES
import { NextFunction, Request, Response } from "express"
import { GoogleUserData } from "../../../../../domain/utils/interfaces"
import {
  SESSION_COOKIE_NAME,
  MAX_AGE_SESSION_COOKIE,
  FRONTEN_URL,
} from "../../../../../domain/configs"

// * USE CASES
import { LoginSignUpGoogleUseCase } from "../../../../../application/usecases/auth/LoginSignUpGoogle"

// * REPOSITORIES
import { MySQLUserRepository } from "../../../../implementations/mysql/MySQLUserRepository"
import { UuidV4Generator } from "../../../../utils/uuidV4Generator"
import { JWTDependency } from "../../../../utils/jwtDependency"
import { BcryptDependency } from "../../../../utils/hasherAndHashComparator"

// * UTILS
import { pipeProviderUserData } from "../../utils/pipeProviderUserData"

export const loginSignUpGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const googleUserData = req.user as GoogleUserData
    const providerUserData = pipeProviderUserData.google(googleUserData)
    const mySQLUserRepository = new MySQLUserRepository()
    const uuidV4Generator = new UuidV4Generator()
    const jwtDependency = new JWTDependency()
    const bcryptDependency = new BcryptDependency()
    const loginSignUpGoogleUseCase = new LoginSignUpGoogleUseCase(
      mySQLUserRepository,
      uuidV4Generator,
      jwtDependency,
      bcryptDependency
    )
    const authenticatedUser = await loginSignUpGoogleUseCase.run(
      providerUserData
    )
    res.cookie(SESSION_COOKIE_NAME, authenticatedUser.authJwt, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: MAX_AGE_SESSION_COOKIE,
    })
    res.redirect(FRONTEN_URL)
    // res.status(200).json(authenticatedUser.currentUser)
  } catch (err) {
    return next(err)
  }
}
