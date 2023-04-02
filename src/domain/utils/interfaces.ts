import { User } from "../entities/user"

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

export interface UserCreateInputWithNullablePassword
  extends Omit<UserCreateInput, "password"> {
  password: string | null
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
  data: UserCreateInputWithNullablePassword
}

export interface DeleteUserByIdParams {
  userId: string
}
