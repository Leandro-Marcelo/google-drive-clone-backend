import {
  GCP_AUTH_PROVIDER_OAUTH_CLIENT_ID,
  GCP_AUTH_PROVIDER_OAUTH_CLIENT_SECRET,
  AUTH_PROVIDER_CALLBACK_URL,
} from "../../../../domain/configs"

import GoogleStrategy from "passport-google-oauth20"

const callbackUrl = (provider: string) =>
  `${AUTH_PROVIDER_CALLBACK_URL}/api/auth/${provider}/callback`

const useGoogleStrategy = () => {
  return new GoogleStrategy.Strategy(
    {
      clientID: GCP_AUTH_PROVIDER_OAUTH_CLIENT_ID,
      clientSecret: GCP_AUTH_PROVIDER_OAUTH_CLIENT_SECRET,
      callbackURL: callbackUrl("google"),
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, { profile })
    }
  )
}

export { useGoogleStrategy }
