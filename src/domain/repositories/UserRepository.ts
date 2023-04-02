import {
  FindUserConditions,
  FindUserValues,
  UserCreateInput,
  UserCreateInputDB,
} from "../utils/interfaces"
import { User } from "../entities/User"

export interface UserRepository {
  // The error is handled by the use case
  getAllUser: () => Promise<Omit<User, "password">[]>
  createUser: (userData: UserCreateInputDB) => Promise<Omit<User, "password">>
  updateUserById: (
    userId: string,
    userData: UserCreateInput
  ) => Promise<Omit<User, "password">>
  deleteUserById: (userId: string) => Promise<Omit<User, "password">>
  getUser: (
    condition: FindUserConditions,
    conditionValue: FindUserValues
  ) => Promise<User | null>
}
