import express from "express";
import { LoanService } from "../service/index.js";

const loanRouter = express.Router();

// show all loans
// =============================
loanRouter.get("/", async function getAllLoansCtrl(req, res) {
  try {
    const result = await LoanService.getAllLoans();
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not retrieve loans",
    });
  }
});

// post new loan
// =============================
loanRouter.post("/", async function postNewLoanCtrl(req, res) {
  try {
    const loanInfo = req.body;
    console.log({ loanInfo });
    const result = await LoanService.addLoan(loanInfo);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        error,
        message: error.message || "Could not add loan",
      });
  }
});
export default loanRouter;
