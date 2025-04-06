import { z } from "zod";
import { formatZodErrors } from "../../../shared/utils/formatZodErrors";
import { createCustomError } from "../../../shared/helpers/createCustomError";
import { ErrorNames } from "../../../shared/helpers/errorNames";

export const ProductBaseZodSchema = z.object({
  title: z.string().min(1, { message: "Title must be at least 1 characters long" }),
  price: z.number().min(1, { message: "Price must be at least 1 characters long" }),
  description: z.string().min(1, { message: "Description must be at least 1 characters long" }),
  stock: z.number().min(1, { message: "Stock must be at least 1 characters long" }),
  images: z.array(z.string()).min(1, { message: "Images must have at least 1 item" }),
  offers: z.array(z.string()).default([]),
  variants: z
    .array(
      z.object({
        color: z.string().optional().nullable(),
        tone: z.string().optional().nullable(),
        stock: z.number().min(0, { message: "Variant stock must be at least 0" }).default(0),
      })
    )
    .default([]),
});

export const ProductStrictZodSchema = ProductBaseZodSchema.catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});

export const ProductPartialZodSchema = ProductBaseZodSchema.partial().catch((def) => {
  throw createCustomError(ErrorNames.INVALID_FIELDS, formatZodErrors(def.error));
});
