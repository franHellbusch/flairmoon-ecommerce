import { z } from "zod";
import { CredentialBaseZodSchema } from "./credentialZodSchema";
import { UserBaseZodSchema } from "../../user/schemas/userZodSchema";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import { formatZodErrors } from "../../../shared/utils/formatZodErrors";
import { createCustomError } from "../../../shared/helpers/createCustomError";

const RegisterUserBaseZodSchema = z.object({});

const RegisterUserCombinedZodSchema =
  RegisterUserBaseZodSchema.merge(CredentialBaseZodSchema).merge(UserBaseZodSchema);

export const RegisterUserStrictZodSchema = RegisterUserCombinedZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});

export const RegisterUserPartialZodSchema = RegisterUserCombinedZodSchema.partial().catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});
