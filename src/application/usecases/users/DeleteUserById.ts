import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/userRepository"
import { NotFoundException } from "../../../domain/exceptions/NotFoundException"
import {
  CurrentUser,
  DeleteUserByIdParams,
} from "../../../domain/utils/interfaces"

export class DeleteUserByIdUseCase {
  private readonly _userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run(params: DeleteUserByIdParams): Promise<CurrentUser> {
    const foundUser = await this._userRepository.getUser("id", params.userId)
    if (foundUser === null) {
      throw new NotFoundException("user")
    }

    return this._userRepository.deleteUserById(params.userId)
  }
}
