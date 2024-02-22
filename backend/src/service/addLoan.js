import { Loan } from "../models/index.js";

export const addLoan = async (loanInfo) => {
  return await Loan.create({ ...loanInfo });
};
