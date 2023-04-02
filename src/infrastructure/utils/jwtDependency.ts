import { IJWTDependency } from "../../domain/utils/dependencyInterfaces/jwtDependency"
import jwt from "jsonwebtoken"

export class JWTDependency implements IJWTDependency {
  sign(
    payload: object,
    secretOrPrivateKey: string,
    // TODO: Change this to a more specific type
    expiresIn: string
  ): string {
    return jwt.sign(payload, secretOrPrivateKey, { expiresIn })
  }
}
