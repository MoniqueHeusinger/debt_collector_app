import mongoose from "mongoose";

export const debtorSchema = new mongoose.Schema(
  {
    debtorId: { type: mongoose.Types.ObjectId, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: [
      {
        city: { type: String, required: true },
        street: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    phone: { type: String, required: true },
    email: { type: String, required: true },
    maritalStatus: [
      {
        type: String,
        enum: ["single", "married", "divorced", "widowed"],
        required: true,
      },
    ],
    children: { type: Boolean, required: true },
    employer: { type: String, required: true },
    annualSalary: { type: Number, required: true },
  },
  {
    collection: "debtors",
    timestamps: true,
  }
);
