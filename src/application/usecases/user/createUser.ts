import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"
import { AlreadyExistsException } from "../../../domain/exceptions/AlreadyExistsException"
import {
  CreateUserParams,
  UserCreateInputDB,
} from "../../../domain/utils/interfaces"
import { UuidGenerator } from "../../../domain/utils/UuidGenerator"

export class CreateUserUseCase {
  private readonly _userRepository: UserRepository
  private readonly _uuidGenerator: UuidGenerator

  constructor(userRepository: UserRepository, uuidGenerator: UuidGenerator) {
    this._userRepository = userRepository
    this._uuidGenerator = uuidGenerator
  }

  // Anteriormente uno desde el controlador le enviaba un usuario, ahora vamos a pasarle los datos de manera primitiva y el caso de uso se encarga de crear el usuario.
  async run(params: CreateUserParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRepository.getUser(
      "email",
      params.data.email
    )
    if (foundUser !== null) throw new AlreadyExistsException("user")

    const user: UserCreateInputDB = {
      ...params.data,
      id: this._uuidGenerator.generate(),
    }
    return await this._userRepository.createUser(user)
  }
}
