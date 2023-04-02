import { Exception } from '../Exception'

export class SessionJwtExpiredException extends Exception {
  constructor () {
    super('Expired session jwt', 'jwt de sesión expirado', 401)
  }
}
