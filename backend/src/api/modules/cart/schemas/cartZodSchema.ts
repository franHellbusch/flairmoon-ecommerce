import { z } from "zod";
import { formatZodErrors } from "../../../shared/utils/formatZodErrors";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";
import { CartProductZodSchema } from "./cartProductZodSchema";

export const CartBaseZodSchema = z.object({
  products: z.array(CartProductZodSchema).default([]),
  total: z.number().min(0, { message: "Total must be at least 0" }),
});

export const CartStrictZodSchema = CartBaseZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});

export const CartPartialZodSchema = CartBaseZodSchema.partial().catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});
