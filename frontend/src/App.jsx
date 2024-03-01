import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import React from "react";
import AddNewLoan from "./pages/AddNewLoan";
import ScrollToTopBtn from "./components/ScrollToTopBtn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/add-new-loan" element={<AddNewLoan />} />
        </Routes>
        <ScrollToTopBtn />
      </BrowserRouter>
    </>
  );
}

export default App;
