import { Loan } from "../models/index.js";

export const deleteLoan = async (loanId) => {
  const foundLoan = await Loan.findById(loanId);
  if (!foundLoan) throw new Error("Loan doesn't exist");

  const deletedLoan = await Loan.findByIdAndDelete(loanId);
  return deletedLoan;
};
