import mongoose from "mongoose";
// import { debtorSchema } from "./debtorSchema.js";

// Test
const debtorsSchema = new mongoose.Schema(
  {
    // debtorId: { type: mongoose.Types.ObjectId, required: true },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    birthday: { type: Date, required: false },
    address: {
      city: { type: String, required: false },
      street: { type: String, required: false },
      zip: { type: String, required: false },
      country: { type: String, required: false },
    },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    maritalStatus: [
      {
        type: String,
        enum: ["ledig", "verheiratet", "geschieden", "verwitwet"],
        required: false,
      },
    ],
    children: { type: Boolean, required: false },
    employer: { type: String, required: false },
    annualSalary: { type: Number, required: false },
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
    paidOff: { type: Boolean, required: false },
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
