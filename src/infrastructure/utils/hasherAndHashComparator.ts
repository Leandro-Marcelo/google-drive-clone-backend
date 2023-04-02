import * as bcrypt from "bcrypt"
import { IBcryptDependency } from "../../domain/utils/dependencyInterfaces/bcryptDependency"

export class BcryptDependency implements IBcryptDependency {
  async genSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds)
  }
  async hash(data: string, salt: string): Promise<string> {
    return await bcrypt.hash(data, salt)
  }

  async compareHash(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted)
  }
}
