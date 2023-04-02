import { User } from "./src/domain/entities/user"

declare global {
  namespace Express {
    interface Request {
      currentUser: any
      authJwt: string
    }
  }
}
