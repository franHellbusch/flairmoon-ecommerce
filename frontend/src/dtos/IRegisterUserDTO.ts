import IUser from "@/interfaces/IUser";

type ExcludedProperties = "id";

interface IRegisterUserDTO extends Omit<IUser, ExcludedProperties> {
  password: string;
}

export default IRegisterUserDTO;
