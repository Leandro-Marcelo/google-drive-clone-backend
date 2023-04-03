// * DEPENDENCIES
import express from "express"
import passport from "passport"

// * CONTROLLERS
import { loginSignUpGoogle } from "../controllers/auth/loginSignUpGoogle"
import { validateAuthJwt } from "../controllers/auth/validateAuthJwt"
import { isAuth } from "../middlewares/isAuth"
import { logout } from "../controllers/auth/logout"
import { postman } from "../controllers/auth/postman"

const router = express.Router()

// * ROUTES

router.get("/postman", postman)

router.get("/validate", [isAuth], validateAuthJwt)
router.get("/logout", logout)

// return the form to login with google
router.get(
  "/google",
  passport.authenticate("google", {
    // specify the scope of the request, especifico que quiero obtener, el email y su profile
    scope: ["email", "profile"],
  })
)

// ahora el passport.authenticate tiene los datos del scope por el callback,
router.get(
  "/google/callback",
  // { session:false } es para que salte el error de que necesitas express-session
  passport.authenticate("google", { session: false }),
  loginSignUpGoogle
)
export default router
