import { Loan } from "../models/index.js";

export const getLatestLoans = async () => {
  try {
    // find top 3 of the latest loans and sort by payoutDate
    const latestLoans = await Loan.find({ payoutDate: { $lte: new Date() } })
      .sort({ payoutDate: -1 })
      .limit(3);

    return latestLoans;
  } catch (error) {
    throw new Error("Failed to fetch latest loans: " + error.message);
  }
};
