import { z } from "zod";
import { formatZodErrors } from "../../../shared/utils/formatZodErrors";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import { ROLES } from "../../auth/interfaces/IDBCredential";

export const UserBaseZodSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).nonempty(),
  role: z.enum([ROLES.USER, ...Object.values(ROLES)]).optional(),
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" })
    .nonempty()
    .nullable(),
  surName: z
    .string()
    .min(1, { message: "Surname must be at least 1 characters long" })
    .nonempty()
    .nullable(),
  phone: z
    .string()
    .min(6, { message: "Phone must be at least 6 characters long and include +54 with area code" })
    .optional()
    .nullable(),
});

export const UserStrictZodSchema = UserBaseZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});

export const UserPartialZodSchema = UserBaseZodSchema.partial().catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});
