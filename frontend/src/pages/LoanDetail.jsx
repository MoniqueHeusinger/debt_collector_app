import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { backendURL } from "../api";
import { useParams } from "react-router-dom";
import "./LoanDetail.scss";

const LoanDetail = () => {
  const [loan, setLoan] = useState([]);
  // STATES FOR ACCORDION:
  const [isTilgungsplanOpen, setIsTilgungsplanOpen] = useState(false);
  const [isKontaktOpen, setIsKontaktOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);

  const params = useParams();
  const id = params.loanId;

  const accordionRef = useRef();

  //   fetch: show all data of a specific loan (--> loanId)
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

  //   residual debt - graph bar animatedt
  //   =====================================
  console.log("loan.amount", loan[0]?.amount);
  const paidAmount = loan[0]?.amount - 22300;
  console.log("bezahlt: ", paidAmount);
  console.log(typeof paidAmount);

  //   paid amount in % (paid amount / loan amount * 100)
  //   =========== ZINSEN FEHLEN !!!! ===================
  const paidAmountPercent = (
    (paidAmount / Number(loan[0]?.amount)) *
    100
  ).toFixed();

  //   calculate the paid amount percentage to a number that serves to be the number for the grid-column-end-style in the grid
  const gridColumnEndNumber = Number((paidAmountPercent / 5).toFixed());
  console.log("gridColumnEndNumber", gridColumnEndNumber);
  console.log(typeof gridColumnEndNumber);

  useEffect(() => {
    //   p-Tag which serves as the graph bar
    const paidBar = document.body.querySelector("#paidBar");
    console.log("paidBar: ", paidBar);

    //   add style (grid-column: 1 / gridColumnEndNumber) to p-Tag to define its width in the graph bar
    if (paidBar) {
      paidBar.style.gridColumn = `1 / ${gridColumnEndNumber}`;
    }
  }, [gridColumnEndNumber]);

  //   DEBTOR DATA
  //   =============================
  //   annual salary to monthly salary
  const monthlySalary =
    Math.round((Number(loan[0]?.debtor.annualSalary) / 12) * 100) / 100;

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Kreditübersicht</h1>
        </section>

        <section className="main-content-grid">
          <section className="loan-detail-container">
            {/* LOAN DATA (amount, pay out date, installments...) 
            ============================================= */}
            <article className="loan-data-container">
              <h2>Kredit</h2>
              {/* !!!!!! (löschen + bearbeiten fehlt noch) */}
              <article className="loan-data-info-wrapper">
                <div className="loan-data-info-general">
                  <p>Betrag (netto):</p>
                  <p className="align-right">{loan[0]?.amount} €</p>
                  <p>ausgezahlt am:</p>
                  <p className="align-right">
                    {formattedDate(loan[0]?.payoutDate)}
                  </p>
                  <p>Zinsen monatlich:</p>
                  <p className="align-right">{loan[0]?.interestRate} %</p>
                  <p className="total-amount">Gesamtbetrag:</p>
                  <p className="align-right total-amount">42000 €</p>
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
                      <span>{paidAmount} €</span>
                    </p>
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
                        <p>6 x {loan[0]?.installment} €</p>
                        <p>Fällig am:</p>
                        <p>1. des Monats</p>
                        <p>Letzte Rate:</p>
                        <p>datum (berechnen)</p>
                        {/* <p>Zinsbetrag gesamt:</p> <p>ausrechnen!</p> */}
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
                        <p>{monthlySalary} €</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>

              {/* ACCORDION END */}
              {/* ==================== */}
            </article>
          </section>
        </section>
      </section>
    </>
  );
};

export default LoanDetail;
