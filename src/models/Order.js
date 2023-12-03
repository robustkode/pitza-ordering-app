import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: { type: String, required: true },
    postalCode: String,
    city: String,

    cartProducts: { type: Object, required: true },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
