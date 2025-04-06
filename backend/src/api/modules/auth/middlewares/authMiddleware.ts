import { NextFunction, Response, Request } from "express";
import passport from "passport";
import { AccessPolicy } from "../interfaces/AccessPolicy";
import IRequestUser from "../interfaces/IRequestUser";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";

export const authMiddleware = (policies: AccessPolicy[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", (err: any, user: IRequestUser, info: any) => {
      if (err) return next(err);

      if (policies.includes(AccessPolicy.PUBLIC)) return next();

      if (policies.includes(AccessPolicy.NO_AUTH) && user)
        throw createCustomError(ErrorNames.auth.NO_AUTH_REQUIRED);
      if (policies.includes(AccessPolicy.NO_AUTH) && !user) return next();

      if (!user) throw createCustomError(ErrorNames.UNAUTHORIZED);

      req.user = user;

      if (user && policies.includes(AccessPolicy.AUTH)) return next();

      const userRole = user.role.toString();
      if (!policies.includes(userRole as AccessPolicy)) {
        throw createCustomError(ErrorNames.FORBIDDEN);
      }

      next();
    })(req, res, next);
  };
};
