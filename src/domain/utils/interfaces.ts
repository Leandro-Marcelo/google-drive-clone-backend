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

// # AUTH: USE CASES AND SERVICES
export interface GoogleUserData {
  profile: GUProfile
}

// GU = Google User
interface GUProfile {
  id: string
  displayName: string
  name?: GUName
  emails?: GUEmail[]
  photos?: GUPhoto[]
  provider: string
  _raw: string
  _json: GUJSON
}

interface GUJSON {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

interface GUEmail {
  value: string
  verified: boolean
}

interface GUName {
  familyName: string
  givenName: string
}

interface GUPhoto {
  value: string
}

export interface ProviderUserData {
  name: string
  email: string
  profilePicture: string
  provider: string
  providerId: string
  locale: string
}

export interface AuthenticatedUser {
  currentUser: Omit<User, "password">
  authJwt: string
}
