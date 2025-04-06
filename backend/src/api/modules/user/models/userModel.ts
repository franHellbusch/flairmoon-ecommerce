import { model, Schema } from "mongoose";
import { IDBMongoUser } from "../interfaces/IDBMongoUser";
import { ROLES } from "../../auth/interfaces/IDBCredential";

const UserSchema = new Schema<IDBMongoUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: null,
    },
    surName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
      default: ROLES.USER,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
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
UserSchema.virtual("id").get(function () {
  return this._id;
});

export const userModel = model("user", UserSchema);
