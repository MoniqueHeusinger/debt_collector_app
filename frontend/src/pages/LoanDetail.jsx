import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { backendURL } from "../api";
import { useParams } from "react-router-dom";
import "./LoanDetail.scss";
import Accordion from "../components/Accordion";

const LoanDetail = () => {
  const [loan, setLoan] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const params = useParams();
  const id = params.loanId;

  const accordionRef = useRef();

  //   fetch: show all data of a specific loan (--> loanId)
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

  // Accordion function
  function handleAccordion() {
    setIsVisible((visible) => !visible);
  }

  //   residual debt
  const residualDebt = [
    { typeOfAmount: "bezahlt", value: "1000" },
    { typeOfAmount: "nicht bezahlt", value: "34000" },
  ];

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Kreditübersicht</h1>
        </section>

        <section className="main-content-grid">
          <section className="loan-detail-container">
            {/* loan data  (amount, installments...) */}
            <article className="loan-data-container">
              <h2>Kredit (löschen + bearbeiten fehlt noch)</h2>
              <p>Höhe: {loan[0]?.amount} €</p>
              <p>Zinsen monatlich: {loan[0]?.interestRate} %</p>
              <p>ausgezahlt am: {loan[0]?.payoutDate}</p>

              {/* (Diagramm oder Range einfügen -- mit Formel hinterlegen) */}

              {/* Accordion with installment data */}
              <Accordion data={loan} />
              {/* <div className="accordion">
                <div className="accordion-item">
                  <a
                    href="#"
                    className="accordion-item-title"
                    onClick={handleAccordion}
                  >
                    <h4>Abzahlung (Raten, Fälligkeit)</h4>
                  </a>
                  <div
                    className={`accordion-item-content ${
                      isVisible ? "visible" : ""
                    }`}
                    id="redemption"
                  >
                    <p>Fälligkeit jeweils am</p>
                    {/* (berechnen: wenn Auszahlungsdatum größer 1
                        && kleiner 15 = 1. eines Monats; = 15 = 15. eines Monats) */}
              {/* <p>letzte Rate am: </p>
                    {/* (hier Datum berechnen) */}
              {/* <p>monatliche Rate: {loan[0]?.installment} €</p>
                  </div>
                </div>
              </div> */}

              {/* ============================ */}
              {/* Diagramm residual debt */}
            </article>

            {/* debtor data (contact, personal info...) */}
            <article className="debtor-data-container" ref={accordionRef}>
              <h2>Schuldner</h2>
              <button className="accordion">Persönliche Daten</button>
              <div className="panel">
                <p>test</p>
                {/* {loan[0]?.debtor && (
                  <>
                    {" "}
                    <p>Vorname: {loan[0].debtor.firstname}</p>{" "}
                    <p>Stadt: {loan[0].debtor.address?.city}</p>
                  </>
                )} */}
              </div>

              <button className="accordion">Kontakt</button>
              <div className="panel">
                <p>test</p>
              </div>
            </article>
          </section>
        </section>
      </section>
    </>
  );
};

export default LoanDetail;
