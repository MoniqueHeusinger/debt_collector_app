import { NavLink, Link } from "react-router-dom";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import { backendURL } from "../api";

const Dashboard = () => {
  const [allLoans, setAllLoans] = useState([]);
  const [minAmountStat, setMinAmountStat] = useState(null);
  const [maxAmountStat, setMaxAmountStat] = useState(null);
  const [latestLoansArr, setLatestLoansArr] = useState([]);

  // FETCH ALL LOANS
  // ===================
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

  console.log(allLoans);

  // FETCH MIN/MAX LOAN STATISTICS
  // ==============================
  useEffect(() => {
    async function fetchMinMaxLoans() {
      try {
        const response = await fetch(`${backendURL}/api/v1/loans/minmaxstats`);
        const { success, resultStats, error } = await response.json();

        if (!success) {
          throw new Error(error);
        }

        setMinAmountStat(resultStats.minAmount.amount);
        setMaxAmountStat(resultStats.maxAmount.amount);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMinMaxLoans();
  }, []);

  // FETCH LATEST LOANS TOP 3
  // ==============================
  useEffect(() => {
    async function fetchLatestLoans() {
      try {
        const response = await fetch(`${backendURL}/api/v1/loans/latestloans`);
        const { success, latestLoans, error } = await response.json();

        if (!success) {
          throw new Error(error);
        }

        // convert payoutDate strings to date Object
        const latestLoansWithFormattedDate = latestLoans.map((loan) => {
          return { ...loan, payoutDate: new Date(loan.payoutDate) };
        });

        setLatestLoansArr(latestLoansWithFormattedDate);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLatestLoans();
  }, []);

  console.log(latestLoansArr);

  //   Format Date to DD.MM.YYYY
  //   =========================
  const formattedDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", options);
  };

  return (
    <>
      <section className="header-grid">
        <h1>Dashboard</h1>
      </section>
      <section className="main-content-grid">
        <section className="dashboard-overview-grid-wrapper">
          <h2>Willkommen auf deinem Dashboard, Justus!</h2>
          <article className="dashboard-overview-container">
            <div className="dashboard-overview-nav-container">
              <NavLink>Überblick</NavLink>
              <NavLink>Kredite</NavLink>
              <NavLink>Schuldner</NavLink>
              <NavLink>Vermögen</NavLink>
            </div>
            {/* <div className="dashboard-overview-btn-container">
              <button className="btn">Login</button>
            </div> */}
          </article>
          <article className="dashboard-overview-content-container">
            <div className="overview-content-card">
              <h3>Familienvermögen</h3>
              <p>2.145.760,54 €</p>
              <p>
                {" "}
                <span className="percentage-grow">+ 2.1%</span> seit letztem
                Monat
              </p>
            </div>

            <div className="overview-content-card">
              <Link to="/loans">
                <h3>Aktuell vergebene Kredite</h3>
                <p>{allLoans.length}</p>
                <p>
                  ({minAmountStat} € - {maxAmountStat} €)
                </p>
              </Link>
            </div>

            <div className="overview-content-card">
              <h3>Neuester Schuldner</h3>
              <p>
                {latestLoansArr[0]?.debtor?.firstname}{" "}
                {latestLoansArr[0]?.debtor?.lastname}
              </p>
              <p>
                {latestLoansArr[0]?.debtor?.address?.city},{" "}
                {latestLoansArr[0]?.debtor?.maritalStatus}
              </p>
            </div>
          </article>

          <article className="dues-and-new-loan-container">
            <article className="dues-container">
              <h2>Neueste Kredite</h2>
              <div className="dues-content">
                {latestLoansArr.map((loan, index) => (
                  <div key={index} className="dues-card">
                    <h3>
                      {loan.debtor?.firstname} {loan.debtor?.lastname}
                    </h3>
                    <p>{formattedDate(loan.payoutDate)}</p>
                    <p>{loan.amount} €</p>
                  </div>
                ))}
              </div>
            </article>

            {/* new loan link */}
            <Link to="/add-new-loan" className="new-loan-container">
              + neuer Kredit
            </Link>
            {/* <a href="#" className="new-loan-container">
              + neuer Kredit
            </a> */}
          </article>
        </section>
      </section>
      {/* </section>
          <article className="dashboard-grid-first-top p-1">
            <h3>Familienvermögen:</h3>
            <p>2.145.760,54 €</p>
          </article>

          <article className="dashboard-grid-second-top p-1">
            <h3>Verliehenes Kapital (aktuell):</h3>
            <p>203.000,00 €</p>
          </article>

          <article className="dashboard-grid-third-left p-1">
            <h3>Aktuell vergebene Kredite:</h3>
            <p>12 Kredite</p>
          </article>

          <article className="dashboard-grid-third-right p-1">
            <div>
              <h3>Aktuelle Schuldner:</h3>
              <p>12</p>
            </div>
            <div>
              <h2>Schuldner im Rückstand:</h2>
              <p>Clausi Mausi</p>
              <p>Babsi Schubidu</p>
            </div>
          </article>

          <article className="dashboard-grid-fourth-bottom p-1">
            <h3>+ Neuen Kredit hinzufügen</h3>
          </article>
        </section> */}
    </>
  );
};

export default Dashboard;
