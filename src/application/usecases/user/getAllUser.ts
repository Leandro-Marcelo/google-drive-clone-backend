import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"

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
