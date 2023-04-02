import { User } from "../entities/User"

// # USER: USE CASES AND SERVICES
export interface UserCreateInput {
  name: string
  email: string
  password: string
  profilePicture: string | null
}

export interface UserCreateInputDB extends UserCreateInput {
  id: string
}

export type FindUserConditions = "id" | "email"
export type FindUserValues = string

export interface GetUserParams {
  condition: FindUserConditions
  conditionValue: FindUserValues
}

export interface CreateUserParams {
  data: UserCreateInput
}

export interface UpdateUserByIdParams {
  userId: string
  data: UserCreateInput
}

export interface DeleteUserByIdParams {
  userId: string
}
