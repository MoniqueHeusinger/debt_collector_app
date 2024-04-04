import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { backendURL } from "../api";
import { useParams, Link } from "react-router-dom";
import deleteIcon from "../assets/img/icons/trash-white.png";
import addLoanIcon from "../assets/img/icons/plus.png";
import handMoney from "../assets/img/icons/hand-money.png";
import doneIcon from "../assets/img/icons/done.svg";
import "./LoanDetail.scss";

const LoanDetail = () => {
  const [loan, setLoan] = useState([]);
  const { loanId } = useParams();

  // STATES FOR ACCORDION:
  const [isTilgungsplanOpen, setIsTilgungsplanOpen] = useState(false);
  const [isKontaktOpen, setIsKontaktOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);

  // STATES FOR CALCULATION:
  const [totalInterest, setTotalInterest] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [paidAmountStatus, setPaidAmountStatus] = useState("");
  const [graphBarTooSmall, setGraphBarTooSmall] = useState(false);

  // DELETE STATES
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false)

  const params = useParams();
  const id = params.loanId;

  const accordionRef = useRef();

  //   FETCH: show all data of a specific loan (--> loanId)
  //   ========================================================
  useEffect(() => {
    fetch(`${backendURL}/api/v1/loans`)
      .then((res) => res.json())
      .then((data) => {
        const filteredLoan = data.result.filter(
          (singleLoan) => singleLoan._id === id
        );
        setLoan(filteredLoan);
      });
  }, [id]);
  console.log("Kredit: ", loan);

  // Fetch delete loan
  // ===============================================
  const deleteLoan = () => {
    fetch(`${backendURL}/api/v1/loans/${loanId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (success) {
          setDeleteMessage("Kredit erfolgreich gelöscht");
          setIsDeleted(true);
        } else {
          console.error("Fehler beim Löschen des Kredits");
        }
      })
      .catch((error) => console.log(error));

    document.documentElement.scrollTop = 0;
  };

  //   LOAN CALCULATING FUNCTIONS
  //   ====================================
  useEffect(() => {
    calculateLoanData();

    // Calculate and set the paid amount
    const payoutDate = new Date(loan[0]?.payoutDate);
    const currentDate = new Date();
    const timeDifference = currentDate - payoutDate;

    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsPassed = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24 * 30)
    );

    // Calculate total number of installments (assuming monthly payments on the 1st of each month)
    const totalInstallments = Math.min(monthsPassed, loan[0]?.duration);

    // Calculate the paid amount based on the number of installments
    const paidAmountWithComma = totalInstallments * monthlyInstallment;
    const paidAmount = paidAmountWithComma.toFixed(2);
    setPaidAmountStatus(paidAmount);
    console.log("paidAmount: ", paidAmount);

    // ==== Calculate the graph bar for residual debt (time difference...) ====
    // Calculate the paid amount percentage
    const paidAmountPercent = (paidAmount / Number(loan[0]?.amount)) * 100;

    // Calculate the gridColumnEndNumber based on the days passed and paid amount percentage
    const gridColumnEndNumber =
      daysPassed < 0 ? 0 : Math.min(100, Math.ceil(paidAmountPercent / 5));

    // Apply style to the graph bar
    const paidBar = document.body.querySelector("#paidBar");
    if (paidBar) {
      paidBar.style.gridColumn = `1 / ${gridColumnEndNumber}`;
    }

    // if graph bar is too small, change text color and positioning
    if (gridColumnEndNumber <= 5) {
      setGraphBarTooSmall(true)
    }
  }, [loan]);

  //   CALCULATING FUNCTIONS FOR LOAN, INSTALLMENTS, TOTAL...
  // ==============================================================
  // ==== Total of interest rates, amount, monthly installments ====
  const calculateLoanData = () => {
    // calculate interest rates total
    const interest = loan[0]?.amount * (loan[0]?.interestRate / 100);

    // calculate loan total
    const loanTotal = loan[0]?.amount + interest;

    // calculate monthly installment
    const monthlyInstallmentAmount = loanTotal / loan[0]?.duration;
    // ----> loan[0]?.duration ---> muss noch überall im Datensatz ergänzt werden

    setTotalInterest(interest.toFixed(2));
    setTotalAmount(loanTotal.toFixed(2));
    setMonthlyInstallment(monthlyInstallmentAmount.toFixed(2));
  };

  //   ACCORDION FUNCTIONS
  //   =========================
  function handleTilgungsplan() {
    setIsTilgungsplanOpen(!isTilgungsplanOpen);
  }

  function handleKontakt() {
    setIsKontaktOpen(!isKontaktOpen);
  }

  function handleJob() {
    setIsJobOpen(!isJobOpen);
  }

  //   Format Date to DD.MM.YYYY
  //   =========================
  const formattedDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", options);
  };

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Kreditübersicht</h1>
        </section>

        <section className="main-content-grid">
          {isDeleted ? (<>
            <article className="delete-message-container">
              <img src={doneIcon} alt="" />
              <p className="deleteMessage" id="deleteMessage">
                {deleteMessage}
              </p>
            </article>
            <article className="redirect-container">
              <Link
                to="/add-new-loan"
                className="btn-with-icon-and-text"
              >
                <img src={addLoanIcon} alt="" />
                <p>Kredit anlegen</p>

              </Link>
              <Link
                to="/loans"
                className="btn-with-icon-and-text"
                id="redirectLoanOverviewBtn"
              >
                <img src={handMoney} alt="" />
                <p>Kreditübersicht</p>
              </Link>
            </article></>) : (<section className="loan-detail-container">
              {/* LOAN DATA (amount, pay out date, installments...) 
            ============================================= */}
              <article className="loan-data-container">
                <h2>Kredit</h2>
                {/* !!!!!! (bearbeiten fehlt noch) */}
                <article className="loan-data-info-wrapper">
                  <div className="loan-data-info-general">
                    <p>Betrag (netto):</p>
                    <p className="align-right">{loan[0]?.amount} €</p>
                    <p>ausgezahlt am:</p>
                    <p className="align-right">
                      {formattedDate(loan[0]?.payoutDate)}
                    </p>
                    <p>Zinsen p.a.:</p>
                    <p className="align-right">{loan[0]?.interestRate} %</p>
                    <p className="total-amount">Gesamtbetrag:</p>
                    <p className="align-right total-amount">{totalAmount} €</p>
                  </div>

                  {/* residual debt */}
                  <div className="loan-data-info-residual-debt">
                    <h3>Tilgung aktuell</h3>
                    <div className="residual-debt-legend">
                      <p>0%</p>
                      <p>100%</p>
                    </div>
                    {/* bar graph --> amount paid/unpaid */}
                    <div className="residual-debt-grid">
                      <p id="paidBar">
                        {graphBarTooSmall ? "" : <span id="paidAmountTextInside">{paidAmountStatus} €</span>}

                      </p>

                      {/* if graph bar is too small --> display text outside of graph bar */}
                      {graphBarTooSmall ? <p id="paidAmountTextOutside">{paidAmountStatus} €</p> : ""}

                    </div>
                  </div>
                </article>

                {/* ACCORDION */}
                <article className="accordion-wrapper">
                  <div className="accordion">
                    <div onClick={handleTilgungsplan} className="item">
                      <div className="title">
                        <h3>Tilgungsplan</h3>
                        <span
                          className={`${isTilgungsplanOpen ? "close" : "open"}`}
                        ></span>
                      </div>
                      {isTilgungsplanOpen && (
                        <div className="content">
                          <p>Raten:</p>
                          <p>
                            {loan[0]?.duration} x {monthlyInstallment} €
                          </p>
                          <p>Fällig am:</p>
                          <p>1. des Monats</p>
                          <p>Summe Zinsen:</p> <p>{totalInterest} €</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </article>

              {/* DEBTOR DATA (contact, personal info...) 
            ============================================= */}
              <article className="debtor-data-container" ref={accordionRef}>
                <h2>Schuldner</h2>
                <article className="debtor-data-personal-info">
                  <h3>
                    {loan[0]?.debtor.firstname} {loan[0]?.debtor.lastname}
                  </h3>
                  <p>geboren am: </p>
                  <p className="align-right">
                    {formattedDate(loan[0]?.debtor.birthday)}
                  </p>
                  <p>Familienstand:</p>
                  <p className="align-right">
                    {loan[0]?.debtor.maritalStatus
                      ? loan[0]?.debtor.maritalStatus
                      : "unbekannt"}{" "}
                    {loan[0]?.debtor.children
                      ? loan[0]?.debtor.children === "ja"
                        ? " - mit Kindern"
                        : " - keine Kinder"
                      : ""}
                  </p>
                </article>

                {/* ACCORDION START */}
                {/* ==================== */}
                <article className="accordion-wrapper">
                  <div className="accordion">
                    <div onClick={handleKontakt} className="item">
                      <div className="title">
                        <h3>Kontakt</h3>
                        <span
                          className={`${isKontaktOpen ? "close" : "open"}`}
                        ></span>
                      </div>
                      {isKontaktOpen && (
                        <div className="content-flex">
                          {/* Address */}
                          <div className="debtor-address">
                            <p>Anschrift:</p>
                            <p>{loan[0]?.debtor.address?.street}</p>
                            <p>
                              {loan[0]?.debtor.address?.zip}{" "}
                              {loan[0]?.debtor.address?.city}
                            </p>
                            <p className="debtor-country">
                              {loan[0]?.debtor.address?.country}
                            </p>
                          </div>
                          {/* Email */}
                          <div className="debtor-email">
                            <p>E-Mail:</p>
                            <a
                              href={`mailto:${loan[0]?.debtor.email}`}
                              target="blank"
                            >
                              {loan[0]?.debtor.email}
                            </a>
                          </div>
                          {/* Phone */}
                          <div className="debtor-tel">
                            <p>Telefonnr.:</p>
                            <a
                              href={`tel:+${loan[0]?.debtor.phone}`}
                              target="blank"
                            >
                              {loan[0]?.debtor.phone}
                            </a>
                            {/* FORMATIERUNG EINFÜGEN: WENN MIT 017 BEGINNT: dann leerzeichen nach 4. Zahl; else nach 5. Zahl */}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2nd ACCORDION ITEM */}
                    {/* Job */}
                    <div onClick={handleJob} className="item">
                      <div className="title">
                        <h3>Job</h3>
                        <span
                          className={`${isJobOpen ? "close" : "open"}`}
                        ></span>
                      </div>
                      {isJobOpen && (
                        <div className="content">
                          <p>Arbeitgeber:</p>
                          <p>{loan[0]?.debtor.employer}</p>
                          <p>Gehalt/Monat (netto):</p>
                          <p>{loan[0]?.debtor.monthlySalary} €</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>

                {/* ACCORDION END */}
                {/* ==================== */}
              </article>

              {/* Operating buttons (e.g. delete loan) */}
              <article className="operating-buttons">
                <button className="btn-with-icon-and-text" onClick={deleteLoan}>
                  <img src={deleteIcon} alt="" id="deleteIcon"
                  />
                  <p>Kredit löschen</p>
                </button>
              </article>
            </section>)}
        </section>
      </section >
    </>
  );
};

export default LoanDetail;
