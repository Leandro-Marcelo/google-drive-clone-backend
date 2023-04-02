import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import { UpdateUserByIdParams } from "../../../domain/utils/interfaces"
import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../domain/repositories/UserRepository"

export class UpdateUserByIdUseCase {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(params: UpdateUserByIdParams): Promise<Omit<User, "password">> {
    const foundUser = await this._userRespository.getUser("id", params.userId)

    if (foundUser === null) {
      throw new NotFoundException("user")
    }

    return await this._userRespository.updateUserById(
      params.userId,
      params.data
    )
  }
}
