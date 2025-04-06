import { inject, injectable } from "inversify";
import AUTH_TYPES from "../../types/authTypes";
import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { PROVIDER } from "../../interfaces/IDBCredential";
import ICreateCredentialDTO from "../../dtos/ICreateCredentialDTO";
import config from "../../../../shared/config/config";
import { extractTokenFromCookie } from "../../utils/jwt";
import IAuthService from "../../interfaces/IAuthService";
import IRegisterUserDTO from "../../dtos/IRegisterUserDTO";

@injectable()
export class PassportStrategyInstance {
  constructor(@inject(AUTH_TYPES.AuthService) private readonly authService: IAuthService) {
    this.registerStrategies();
  }

  registerStrategies = () => {
    passport.use(
      "login",
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
          const credential = await this.authService.login(email, password);

          done(null, credential);
        } catch (err) {
          done(err);
        }
      })
    );

    passport.use(
      "register",
      new LocalStrategy(
        {
          usernameField: "email",
          passReqToCallback: true,
        },
        async (req, email, password, done) => {
          try {
            const credential = await this.authService.register({
              provider: PROVIDER.LOCAL,
              email,
              password,
              ...req.body,
            });

            done(null, credential);
          } catch (err) {
            done(err);
          }
        }
      )
    );

    passport.use(
      new FacebookStrategy(
        {
          clientID: config.facebook.clientId,
          clientSecret: config.facebook.clientSecret,
          callbackURL: config.facebook.callbackUrl,
          profileFields: ["email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const createCredentialData: IRegisterUserDTO = {
              password: null,
              provider: PROVIDER.FACEBOOK,
              email:
                profile._json.email ||
                (profile.emails && profile.emails.length > 0 ? profile.emails[0].value : ""),
              name: profile?.name?.givenName || null,
              surName: profile?.name?.familyName || null,
            };

            const credential = await this.authService.facebook(createCredentialData);

            done(null, credential);
          } catch (err) {
            done(err);
          }
        }
      )
    );

    passport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: config.google.clientId,
          clientSecret: config.google.clientSecret,
          callbackURL: config.google.callbackUrl,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const createCredentialData: IRegisterUserDTO = {
              password: null,
              provider: PROVIDER.GOOGLE,
              email:
                profile._json.email ||
                (profile.emails && profile.emails.length > 0 ? profile.emails[0].value : ""),
              name: profile._json.given_name || null,
              surName: profile._json.family_name || null,
            };

            const credential = await this.authService.google(createCredentialData);

            done(null, credential);
          } catch (err) {
            done(err);
          }
        }
      )
    );

    passport.use(
      "jwt",
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromExtractors([extractTokenFromCookie]),
          secretOrKey: config.jwt.secret,
        },
        async (payload, done) => {
          try {
            done(null, payload);
          } catch (err) {
            done(err, false);
          }
        }
      )
    );
  };
}

export default PassportStrategyInstance;
