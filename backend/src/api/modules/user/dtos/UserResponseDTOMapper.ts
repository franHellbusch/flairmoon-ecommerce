import IDBUser from "../interfaces/IDBUser";

type ExcludedProperties = "createdAt" | "updatedAt";

export interface IResponseUserDTO extends Omit<IDBUser, ExcludedProperties> {}

class UserResponseDTOMapper {
  static toDTO(user: IDBUser): IResponseUserDTO {
    const userData: IResponseUserDTO = {
      id: user.id,
      name: user.name,
      surName: user.surName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    return userData;
  }
}

export default UserResponseDTOMapper;
