import { z } from "zod";
import { ProductBaseZodSchema } from "../../product/schemas/productZodSchema";

export const CartProductZodSchema = z.object({
  product: z.string().min(1, { message: "Product ID must be at least 1 characters long" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  subtotal: z.number().min(0, { message: "Subtotal must be at least 0" }),
  variant: z
    .object({
      color: z.string().optional().nullable(),
      tone: z.string().optional().nullable(),
    })
    .optional(),
});
