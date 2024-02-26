import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import React from "react";
import AddNewLoan from "./pages/AddNewLoan";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/add-new-loan" element={<AddNewLoan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
