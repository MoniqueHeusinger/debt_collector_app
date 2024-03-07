import { getAllLoans } from "../service/getAllLoans.js";
import { getAllDebtors } from "./getAllDebtors.js";
import { addLoan } from "./addLoan.js";
import { getMinMaxLoanStats } from "./getMinMaxLoanStats.js";
import { getLatestLoans } from "./getLatestLoans.js";

export const LoanService = {
  getAllLoans,
  addLoan,
  getMinMaxLoanStats,
  getLatestLoans,
};

export const DebtorService = {
  getAllDebtors,
};
