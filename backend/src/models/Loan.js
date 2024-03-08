import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    payoutDate: { type: Date, required: true },
    duration: { type: Number, min: 1, max: 24, required: true },
    interestRate: { type: Number, required: true },
    debtor: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      birthday: { type: Date, required: true },
      address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: false },
      },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      maritalStatus: { type: String, required: false },
      children: { type: String, required: false },
      employer: { type: String, required: true },
      monthlySalary: { type: Number, required: true },
    },
  },
  {
    collection: "loans",
    timestamps: false,
  }
);

const Loan = mongoose.model("loans", loanSchema);
export default Loan;
