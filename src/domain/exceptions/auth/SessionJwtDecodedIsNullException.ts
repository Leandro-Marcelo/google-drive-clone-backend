import { Exception } from '../Exception'

export class SessionJwtDecodedIsNullException extends Exception {
  constructor () {
    super('Session jwt decoded is null', 'jwt de sesión descodificado es null', 401)
  }
}
