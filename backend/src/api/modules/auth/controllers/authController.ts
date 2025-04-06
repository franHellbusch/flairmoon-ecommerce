import { inject, injectable } from "inversify";
import AUTH_TYPES from "../types/authTypes";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { generateToken, updateToken } from "../utils/jwt";
import IRequestUser from "../interfaces/IRequestUser";
import ICredentialService from "../interfaces/ICredentialService";

@injectable()
class AuthController {
  constructor(
    @inject(AUTH_TYPES.CredentialService) private readonly credentialService: ICredentialService
  ) {}

  async login(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const token = generateToken(user);

    res
      .cookie("authToken", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, payload: user.email });
  }

  async register(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const token = generateToken(user);

    res
      .cookie("authToken", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, payload: user.email });
  }

  async googleCallback(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const token = generateToken(user);

    res
      .cookie("authToken", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, payload: user.email });
  }

  async facebookCallback(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const token = generateToken(user);

    res
      .cookie("authToken", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, payload: user.email });
  }

  async updateEmail(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const credential = await this.credentialService.updateEmail(user.email, req.body.newEmail);

    if (credential.email != user.email) {
      user.email = credential.email;
      const updatedToken = updateToken(user);

      res
        .cookie("authToken", updatedToken, {
          maxAge: 1000 * 3600 * 24,
          httpOnly: true,
        })
        .status(200)
        .json({ success: true, payload: credential.email });

      return;
    }

    res.status(200).json({
      success: true,
      payload: credential.email,
    });
  }

  async refreshCookie(req: Request, res: Response, _next: NextFunction) {
    const user = req.user as IRequestUser;

    const credential = await this.credentialService.getCredentialByEmail(user.email);

    const token = generateToken({
      email: credential.email,
      role: credential.role,
      provider: credential.provider,
    });

    res
      .cookie("authToken", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, payload: credential.email });
  }

  async logout(_req: Request, res: Response, _next: NextFunction) {
    res.clearCookie("authToken");
    res.status(200).json({
      success: true,
      message: "Success logout",
    });
  }
}

export default AuthController;
