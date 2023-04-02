import { Exception } from './Exception'

export class FileNotFoundException extends Exception {
  constructor () {
    super('File not found', 'File no encontrado', 404)
  }
}
