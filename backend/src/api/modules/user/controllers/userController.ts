import { NextFunction, Response, Request } from "express";
import { inject, injectable } from "inversify";
import USER_TYPES from "../types/userTypes";
import UserResponseDTOMapper from "../dtos/UserResponseDTOMapper";
import IUserService from "../interfaces/IUserService";
import IRequestUser from "../../auth/interfaces/IRequestUser";

@injectable()
class UserController {
  constructor(@inject(USER_TYPES.UserService) private readonly userService: IUserService) {}

  async getCurrentUser(req: Request, res: Response, _next: NextFunction) {
    const { email } = req.user as IRequestUser;

    const user = await this.userService.getUserByEmail(email);

    res.status(200).json({
      success: true,
      payload: UserResponseDTOMapper.toDTO(user),
    });
  }

  async updateOne(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const user = await this.userService.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      payload: UserResponseDTOMapper.toDTO(user),
    });
  }
}

export default UserController;
