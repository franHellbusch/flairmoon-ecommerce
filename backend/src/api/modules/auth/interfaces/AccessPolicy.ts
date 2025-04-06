import { ROLES } from "./IDBCredential";

export enum AccessPolicy {
  PUBLIC = "PUBLIC",
  NO_AUTH = "NO_AUTH",
  AUTH = "AUTH",
  USER = ROLES.USER,
  ADMIN = ROLES.ADMIN,
}
