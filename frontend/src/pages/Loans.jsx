import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { backendURL } from "../api";
import LoanCard from "../components/LoanCard";

const Loans = () => {
  const [allLoans, setAllLoans] = useState([]);

  // Alle Kredite
  useEffect(() => {
    async function fetchAllLoans() {
      try {
        const loans = await fetch(`${backendURL}/api/v1/loans`);
        const { result, success, error } = await loans.json();
        if (!success) throw new Error(error);
        return setAllLoans(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllLoans();
  }, []);

  console.log(allLoans);

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Kredite</h1>
        </section>

        <section className="main-content-grid">
          <h2>Alle Kredite:</h2>

          {allLoans.map((loan) => (
            <LoanCard
              key={loan._id}
              _id={loan._id}
              amount={loan.amount}
              installment={loan.installment}
              term={loan.term}
              paidOff={loan.paidOff}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default Loans;
