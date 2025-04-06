import { model, Schema } from "mongoose";
import { IDBMongoProduct } from "../interfaces/IDBMongoProduct";

const ProductSchema = new Schema<IDBMongoProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    stock: { type: Number, default: 0 },
    offers: [{ type: String, required: true }],
    variants: [
      {
        color: { type: String, default: null },
        tone: { type: String, default: null },
        stock: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

/**
 * Creates a virtual property "id" that maps to the "_id" field.
 */
ProductSchema.virtual("id").get(function () {
  return this._id;
});

export const productModel = model("product", ProductSchema);
