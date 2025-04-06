import IDBCredential from "../interfaces/IDBCredential";

type SelectedProperties = "email" | "password";

interface ICreateCredentialRequestDTO extends Pick<IDBCredential, SelectedProperties> {}

export default ICreateCredentialRequestDTO;
