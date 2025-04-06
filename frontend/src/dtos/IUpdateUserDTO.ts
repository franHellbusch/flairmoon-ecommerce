import IUser from "@/interfaces/IUser";

type ExcludedProperties = "id";

type IUpdateUserDTO = Omit<Partial<IUser>, ExcludedProperties>;

export default IUpdateUserDTO;
