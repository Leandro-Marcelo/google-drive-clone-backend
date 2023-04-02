import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"

export class GetAllUserUseCase {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(): Promise<Omit<User, "password">[]> {
    const users = await this._userRespository.getAllUser()
    return users
  }
}
