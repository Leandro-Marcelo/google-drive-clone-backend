import { Exception } from '../Exception'

export class SessionJwtNotProvidedException extends Exception {
  constructor () {
    super('Session jwt not provided', 'jwt de sesión no proporcionada', 401)
  }
}
