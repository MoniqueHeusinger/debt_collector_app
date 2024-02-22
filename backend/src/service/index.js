import { getAllLoans } from "../service/getAllLoans.js";
import { getAllDebtors } from "./getAllDebtors.js";
import { addLoan } from "./addLoan.js";

export const LoanService = {
  getAllLoans,
  addLoan,
};

export const DebtorService = {
  getAllDebtors,
};
