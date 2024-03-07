import { Loan } from "../models/index.js";

export const getAllLoans = async () => {
  const loans = await Loan.find();
  // console.log("alle  Kredite: ", loans);
  return loans;
};
