import { NextFunction, Response, Request } from "express";
import passport from "passport";
import IDBCredential from "../interfaces/IDBCredential";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";

export const AuthStrategyMiddleware = (strategy: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategy,
      { scope: ["email"] },
      (err: any, credential: IDBCredential, info: any) => {
        if (err) return next(err);

        if (!credential) {
          if (info.message == "Missing credentials")
            throw createCustomError(ErrorNames.auth.MISSING_CREDENTIALS);
          return next({ ...info });
        }

        req.user = {
          email: credential.email,
          provider: credential.provider,
          role: credential.role,
        };

        next();
      }
    )(req, res, next);
  };
};
