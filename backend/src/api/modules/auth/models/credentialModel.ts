import { model, Schema } from "mongoose";
import { PROVIDER, ROLES } from "../interfaces/IDBCredential";
import { IDBMongoCredential } from "../interfaces/IDBMongoCredential";

const CredentialSchema = new Schema<IDBMongoCredential>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      defaul: null,
    },
    provider: {
      type: String,
      enum: Object.values(PROVIDER),
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
      default: ROLES.USER,
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
CredentialSchema.virtual("id").get(function () {
  return this._id;
});

export const credentialModel = model("credential", CredentialSchema);
