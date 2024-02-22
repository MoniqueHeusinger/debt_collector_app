import express from "express";
import { DebtorService } from "../service/index.js";

const debtorRouter = express.Router();

// show all debtors
// =============================
debtorRouter.get("/", async function getAllDebtorsCtrl(req, res) {
  try {
    const result = await DebtorService.getAllDebtors();
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: error.message || "Could not retrieve debtors",
    });
  }
});

export default debtorRouter;
