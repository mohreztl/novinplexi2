import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "لطفاً نام کامل مشتری را وارد کنید"],
    },
    phoneNumber: {
      type: String,
      required: [true, "لطفاً شماره تماس را وارد کنید"],
    },
    email: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "لطفاً شهر را وارد کنید"],
    },
    postalCode: {
      type: String,
      required: [true, "لطفاً کد پستی را وارد کنید"],
    },
    streetAddress: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "لطفاً کشور را وارد کنید"],
    },

    paid: {
      type: Boolean,
      default: false,
    },

    cartProducts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    shippingMethod: {
      type: String,
      required: [true, "لطفاً روش ارسال را وارد کنید"],
    },

    total: {
      type: Number,
      required: [true, "مبلغ کل سفارش الزامی است"],
    },
    shippingCost: {
      type: Number,
      required: true,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentTrackId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "PAID", "DELIVERED", "SHIPPED", "CANCELLED", "FAILED"],
      default: "PENDING",
    },

    note: {
      type: String,
    },
    adminNote: {
      type: String,
    },

    orderDate: {
      year: { type: Number, required: true },
      month: { type: Number, required: true },
      day: { type: Number, required: true },
      hour: { type: Number, required: true },
      minute: { type: Number, required: true },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
