import { User } from "../entities/user"
import { File } from "../entities/file"
import { Response } from "express"

export type CurrentUser = Omit<User, "password">

export type PublicUser = Omit<User, "password">

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

// # FILES: USE CASES AND SERVICES
export type UpdateFileDBInput = Pick<File, "originalName" | "folderId">

export type CreateFileDBInput = Omit<File, "createdAt" | "updatedAt">

export interface FileUploadInput {
  // Name of the file on the uploader's computer.
  originalname: string
  // Value of the `Content-Type` header for this file
  mimetype: string
  // Size of the file in bytes.
  size: number
  // A Buffer containing the entire file.
  buffer: Buffer
}

export type UploadedFile =
  | {
      status: "fulfilled"
      value: File
    }
  | {
      status: "rejected"
      reason: {
        id: string
        originalName: string
        message: string
      }
    }

export interface UploadManyFilesParams {
  currentUser: Omit<User, "password">
  folderId: string | null
  files: FileUploadInput[]
}

export interface StreamFileByFileNameParams {
  fileName: string
  res: Response
}

export interface UpdateFileByIdParams {
  fileId: string
  data: UpdateFileDBInput
}

export interface DeleteFileParams {
  fileId: string
  fileName: string
}

// # FOLDER USE CASES AND SERVICES
export interface CreateFolderInput {
  originalName: string
  userId: string
  parentFolderId: string | null
}

export interface CreateFolderInputDB extends CreateFolderInput {
  id: string
}

export interface UpdateFolderInput {
  originalName: string
  parentFolderId: string | null
}

export interface CreateFolderParams {
  data: CreateFolderInput
  currentUser: CurrentUser
}

export interface UpdateFolderByIdParams {
  folderId: string
  data: UpdateFolderInput
}

export interface DeleteFolderByIdParams {
  folderId: string
}

export interface GetFolderContentsParams {
  folderId: string
}
