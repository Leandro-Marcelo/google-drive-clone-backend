import {
  GoogleUserData,
  ProviderUserData,
} from "../../../../domain/utils/interfaces"

// which is used to transform the data received from the Auth Provider to the data that the application needs.
export const pipeProviderUserData = {
  google: (data: GoogleUserData): ProviderUserData => ({
    name: data.profile._json.name || data.profile.displayName || "",
    email: data.profile._json.email || data.profile.emails![0].value || "",
    profilePicture:
      data.profile._json.picture || data.profile.photos![0].value || "",
    provider: data.profile.provider,
    providerId: data.profile.id,
    locale: data.profile._json.locale || "en",
  }),
}
