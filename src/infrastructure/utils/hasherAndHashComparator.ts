import { v4 as uuidv4 } from "uuid"
import {
  IHasher,
  IHashComparator,
} from "../../domain/utils/dependencyInterfaces/hasherAndHashComparator"
import * as bcrypt from "bcrypt"

export class Hasher implements IHasher {
  async genSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds)
  }
  async hash(data: string, salt: string): Promise<string> {
    return await bcrypt.hash(data, salt)
  }
}

export class HashComparator implements IHashComparator {
  async compareHash(data: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted)
  }
}
