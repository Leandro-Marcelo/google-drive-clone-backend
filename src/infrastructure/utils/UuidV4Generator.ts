import { v4 as uuidv4 } from "uuid"
import { IUuidGenerator } from "../../domain/utils/dependencyInterfaces/uuidGenerator"

export class UuidV4Generator implements IUuidGenerator {
  generate(): string {
    return uuidv4()
  }
}
