import mongoose from "mongoose";
// import { debtorSchema } from "./debtorSchema.js";

// Test
const debtorsSchema = new mongoose.Schema(
  {
    // debtorId: { type: mongoose.Types.ObjectId, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: Date, required: true },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
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

//============

const loanSchema = new mongoose.Schema(
  {
    // loanId: { type: mongoose.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    payoutDate: { type: Date, required: true },
    installment: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    term: { type: Number, min: 1, max: 12 },
    paidOff: { type: Boolean, required: true },
    // debtor: { type: mongoose.SchemaTypes.ObjectId, ref: Debtor },
    // debtor: debtorSchema,

    // neu für Test:
    debtor: { type: debtorsSchema, default: () => ({}) },
  },
  {
    collection: "loans",
    timestamps: false,
  }
);

const Loan = mongoose.model("loans", loanSchema);
export default Loan;
