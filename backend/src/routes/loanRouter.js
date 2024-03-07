import express from "express";
import { LoanService } from "../service/index.js";
import { getLatestLoans } from "../service/getLatestLoans.js";

const loanRouter = express.Router();

// GET ALL loans
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

// GET MIN + MAX amount of existing loans
// =========================================
loanRouter.get("/minmaxstats", async function getMinMaxLoanStatsCtrl(req, res) {
  try {
    const resultStats = await LoanService.getMinMaxLoanStats();
    res.json({ success: true, resultStats });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not retrieve min-max statistics",
    });
  }
});

// GET LATEST LOANS TOP 3
loanRouter.get("/latestloans", async function getLatestLoansCtrl(req, res) {
  try {
    const latestLoans = await getLatestLoans();
    res.json({ success: true, latestLoans });
    console.log("aktuellste Kredite: ", latestLoans);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Could not retrieve latest loans",
    });
  }
});

// POST NEW loan
// =============================
loanRouter.post("/", async function postNewLoanCtrl(req, res) {
  try {
    const loanInfo = req.body;
    console.log({ loanInfo });
    const result = await LoanService.addLoan(loanInfo);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not add loan",
    });
  }
});

export default loanRouter;
