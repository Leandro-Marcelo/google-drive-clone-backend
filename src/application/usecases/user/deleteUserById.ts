import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { DeleteUserByIdParams } from "../../../domain/utils/interfaces"

export class DeleteUserByIdUseCase {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(params: DeleteUserByIdParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRespository.getUser("id", params.userId)
    if (foundUser === null) {
      throw new NotFoundException("user")
    }

    return this._userRespository.deleteUserById(params.userId)
  }
}
