import { Loan } from "../models/index.js";

export const getMinMaxLoanStats = async () => {
  const minAmount = await Loan.findOne({}, {}, { sort: { amount: 1 } }).select(
    "amount"
  );
  const maxAmount = await Loan.findOne({}, {}, { sort: { amount: -1 } }).select(
    "amount"
  );

  console.log("niedrigster Kredit:", minAmount, typeof minAmount);

  console.log("höchster Kredit:", maxAmount);

  return { minAmount, maxAmount };
};
