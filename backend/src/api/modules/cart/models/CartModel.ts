import mongoose, { model, Schema } from "mongoose";
import { IDBMongoCart } from "../interfaces/IDBMongoCart";

const CartSchema = new Schema<IDBMongoCart>(
  {
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        subtotal: {
          type: Number,
          required: true,
          default: 0,
        },
        variant: {
          color: {
            type: String,
            default: null,
          },
          tone: {
            type: String,
            default: null,
          },
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Creates a virtual property "id" that maps to the "_id" field.
 */
CartSchema.virtual("id").get(function () {
  return this._id;
});

export const cartModel = model("cart", CartSchema);
