// import { Debtor } from "../models/index.js";
import { debtorSchema } from "../models/debtorSchema.js";

export const getAllDebtors = async () => {
  const debtors = await debtorSchema.find();
  console.log("alle  Kredite: ", debtors);
  return debtors;
};
