import { Exception } from '../Exception'

export class InvalidCredentialsException extends Exception {
  constructor () {
    super('Invalid credentials', 'Credenciales invalidas', 400)
  }
}
