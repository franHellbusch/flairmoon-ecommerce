import { z } from "zod";
import { PROVIDER, ROLES } from "../interfaces/IDBCredential";
import { formatZodErrors } from "../../../shared/utils/formatZodErrors";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";

export const CredentialBaseZodSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).nonempty(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty()
    .nullable(),
  provider: z.enum([PROVIDER.LOCAL, ...Object.values(PROVIDER)]),
  role: z.enum([ROLES.USER, ...Object.values(ROLES)]).optional(),
});

export const CredentialStrictZodSchema = CredentialBaseZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});

export const CredentialPartialZodSchema = CredentialBaseZodSchema.partial().catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});
