import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { backendURL } from "../api";
import LoanCard from "../components/LoanCard";
import scrollToTopPrimary from "../assets/img/icons/scroll-to-top-primary.png";
import "./Loans.scss";

const Loans = () => {
  const [allLoans, setAllLoans] = useState([]);
  const [displayedData, setDisplayedData] = useState(allLoans);
  const [colorByAmount, setColorByAmount] = useState("");

  // All loans fetch
  useEffect(() => {
    async function fetchAllLoans() {
      try {
        const loans = await fetch(`${backendURL}/api/v1/loans`);
        const { result, success, error } = await loans.json();
        if (!success) throw new Error(error);
        return setAllLoans(
          result.sort((amount1, amount2) =>
            amount1.amount < amount2.amount
              ? 1
              : amount1.amount > amount2.amount
              ? -1
              : 0
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllLoans();
  }, []);

  useEffect(() => {
    setDisplayedData(allLoans);
  }, [allLoans]);

  console.log(allLoans);

  // loans filtered: 1 - 5000 €
  const filteredLoans1To5G = allLoans.filter((singleloan) => {
    const loansLessThan5G = singleloan.amount <= 5000;
    return loansLessThan5G;
  });

  // loans filtered: 5001 - 10000 €
  const filteredLoans5GTo10G = allLoans.filter((singleloan) => {
    return singleloan.amount > 5000 && singleloan.amount <= 10000;
  });

  // loans filtered: > 10000 €
  const filteredLoansGreaterThan10G = allLoans.filter((singleloan) => {
    const loansLessThan5G = singleloan.amount > 10000;
    return loansLessThan5G;
  });

  // ===========================================
  // Filter buttons - mark outlined when clicked
  // ===========================================
  const filterBtnAll = document.body.querySelector("#allLoansBtn");
  const filterBtnUpToFive = document.body.querySelector("#upToFiveBtn");
  const filterBtnFiveToTen = document.body.querySelector("#FiveToTenBtn");
  const filterBtnGThanTen = document.body.querySelector("#GThanTenBtn");

  const activeOne = () => {
    filterBtnAll.classList.add("active");
    filterBtnUpToFive.classList.remove("active");
    filterBtnFiveToTen.classList.remove("active");
    filterBtnGThanTen.classList.remove("active");
    setDisplayedData(allLoans);
    setColorByAmount("");
  };

  const activeTwo = () => {
    filterBtnAll.classList.remove("active");
    filterBtnUpToFive.classList.add("active");
    filterBtnFiveToTen.classList.remove("active");
    filterBtnGThanTen.classList.remove("active");
    setDisplayedData(filteredLoans1To5G);
    setColorByAmount("amountLowBorder");
  };

  const activeThree = () => {
    filterBtnAll.classList.remove("active");
    filterBtnUpToFive.classList.remove("active");
    filterBtnFiveToTen.classList.add("active");
    filterBtnGThanTen.classList.remove("active");
    setDisplayedData(filteredLoans5GTo10G);
    setColorByAmount("amountMediumBorder");
  };

  const activeFour = () => {
    filterBtnAll.classList.remove("active");
    filterBtnUpToFive.classList.remove("active");
    filterBtnFiveToTen.classList.remove("active");
    filterBtnGThanTen.classList.add("active");
    setDisplayedData(filteredLoansGreaterThan10G);
    setColorByAmount("amountHighBorder");
  };

  // ================================
  // Scroll to top button
  // ================================
  const toTopBtn = document.body.querySelector(".to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      toTopBtn.classList.add("active");
    } else {
      toTopBtn.classList.remove("active");
    }
  });

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Kredite</h1>
        </section>

        <section className="main-content-grid">
          {/* Filter buttons */}
          <article className="filterBtn-container">
            <button className="btn" onClick={activeOne} id="allLoansBtn">
              Alle ({allLoans.length})
            </button>
            <button className="btn" onClick={activeTwo} id="upToFiveBtn">
              <span>&#60;</span> 5.000 € ({filteredLoans1To5G.length})
            </button>
            <button className="btn" onClick={activeThree} id="FiveToTenBtn">
              5.001 - 10.000 € ({filteredLoans5GTo10G.length})
            </button>
            <button className="btn" onClick={activeFour} id="GThanTenBtn">
              <span>&#62;</span> 10.000 € ({filteredLoansGreaterThan10G.length})
            </button>
          </article>

          {/* ALL LOANS */}
          {/* ===== Loans > 10.000 € ===== */}
          <article className="loan-card-container">
            {displayedData.map((loan) => (
              <LoanCard
                className={("amountHighBorder ", colorByAmount)}
                key={loan._id}
                _id={loan._id}
                amount={loan.amount}
                installment={loan.installment}
                debtor={loan.debtor}
                payoutDate={loan.payoutDate}
              />
            ))}
          </article>

          <a href="#" className="to-top">
            <img src={scrollToTopPrimary} alt="up" />
          </a>
        </section>
      </section>
    </>
  );
};

export default Loans;
