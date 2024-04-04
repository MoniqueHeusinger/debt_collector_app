import { useState } from "react";
import { backendURL } from "../api";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import addLoanIcon from "../assets/img/icons/plus.png";
import handMoney from "../assets/img/icons/hand-money.png";
import doneIcon from "../assets/img/icons/done.svg";
import "./AddNewLoan.scss";

const AddNewLoan = () => {
  const [amount, setAmount] = useState("");
  const [payoutDate, setPayoutDate] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState("");
  // const [debtor, setDebtor] = useState({ firstname: "" });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [hasChildren, setHasChildren] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [employer, setEmployer] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [dataAdded, setDataAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ADD LOAN FUNCTION  
  const addLoan = (event) => {
    event.preventDefault();

    fetch(`${backendURL}/api/v1/loans`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        payoutDate,
        duration,
        interestRate,
        // debtor,
        debtor: {
          firstname,
          lastname,
          birthday,
          phone,
          email,
          maritalStatus: selectedMaritalStatus,
          children: hasChildren,
          employer,
          monthlySalary,
          // annualSalary,
          address: {
            city,
            street,
            zip: zipCode,
            country: selectedCountry,
          },
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
      })
      .catch((error) => console.log(error));

    // empty form elements after submit
    setAmount("");
    setPayoutDate("");
    setDuration("");
    setInterestRate("");
    setFirstname("");
    setLastname("");
    setBirthday("");
    setPhone("");
    setEmail("");
    setSelectedMaritalStatus("");
    setHasChildren(false);
    setEmployer("");
    setMonthlySalary("");
    setCity("");
    setStreet("");
    setZipCode("");
    setSelectedCountry("");

    setIsLoading(true);
    setDataAdded(true);

    document.documentElement.scrollTop = 0;

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // ==================================================
  // Add another loan --> display form elements again
  // ==================================================
  const addAnotherLoan = () => {
    setDataAdded(false);
  };

  console.log({ dataAdded });
  console.log({ isLoading });

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Neuen Kredit anlegen</h1>
        </section>

        <section className="main-content-grid">
          {dataAdded ? (
            isLoading ? (
              <article className="loading-screen">
                {/* spinner */}
                <div className="spinner visible">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {/* loading message */}
                <p className="loading-message visible-message">Daten werden angelegt...</p>
              </article>) :
              (<><article className="success-message-conatiner">
                <img src={doneIcon} alt="" />
                <p>Kredit erfolgreich hinzugefügt</p>
              </article>
                <article className="redirect-container">
                  <Link
                    to="/add-new-loan"
                    className="btn-with-icon-and-text"
                    id="createAnotherLoanBtn"
                    onClick={addAnotherLoan}
                  >
                    <img src={addLoanIcon} alt="" />
                    <p>weiteren Kredit anlegen</p>
                  </Link>
                  <Link
                    to="/loans"
                    className="btn-with-icon-and-text"
                    id="redirectLoanOverviewBtn"
                  >
                    <img src={handMoney} alt="" />
                    <p>Kreditübersicht</p>
                  </Link>
                </article></>)
          ) :
            (<><article className="loan-data-container">
              <h2>Kredit:</h2>

              <form>
                {/* LOAN AMOUNT */}
                <div className="loan-amount">
                  <label htmlFor="amount">Kredithöhe:</label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="z.B. 2500,00"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                  />
                  <p>€</p>
                </div>

                {/* PAYOUT DATE LOAN */}
                <div className="payout-date">
                  <label htmlFor="payoutDate">Auszahlung am:</label>
                  <input
                    type="date"
                    name="payoutDate"
                    id="payoutDate"
                    value={payoutDate}
                    onChange={(e) => setPayoutDate(e.target.value)}
                    required
                  />
                </div>

                {/* DURATION OF PAYBACK (number of monthly payments) */}
                <div className="duration">
                  <label htmlFor="duration">Laufzeit Ratenzahlungen</label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    min="1"
                    max="24"
                    placeholder="max. 24"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                  />
                  <p>Monate</p>
                </div>

                {/* INTEREST RATE */}
                <div className="interest-rate">
                  <label htmlFor="interestRate">Zinsen (monatlich):</label>
                  <input
                    type="number"
                    name="interestRate"
                    id="interestRate"
                    min="1"
                    max="100"
                    placeholder="z.B. 10"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    required
                  />
                  <p>%</p>
                </div>
              </form>
            </article>

              <article className="debtor-data-container">
                <h2>Schuldner:</h2>
                <form>
                  <article className="personal-data">
                    {/* /debtor FIRSTNAME */}
                    <div className="firstname">
                      <label htmlFor="firstname">Vorname:</label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder=""
                        // value={debtor.firstname}
                        // onChange={(e) =>
                        //   setDebtor({ ...debtor, firstname: e.target.value })
                        // }
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>

                    {/* debtor LASTNAME */}
                    <div className="lastname">
                      <label htmlFor="lastname">Nachname:</label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder=""
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor BIRTHDAY */}
                    <div className="birthday">
                      <label htmlFor="birthday">Geburtstag:</label>
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        placeholder=""
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor MARITAL STATUS */}
                    <div className="marital-status">
                      <label htmlFor="maritalStatus">Familienstand:</label>
                      <div className="custom-select">
                        <select
                          name="maritalStatus"
                          id="maritalStatus"
                          value={selectedMaritalStatus}
                          onChange={(e) => setSelectedMaritalStatus(e.target.value)}
                        >
                          <option value="">bitte wählen</option>
                          <option value="ledig">ledig</option>
                          <option value="verheiratet">verheiratet</option>
                          <option value="geschieden">geschieden</option>
                          <option value="verwitwet">verwitwet</option>
                        </select>
                      </div>
                    </div>

                    {/* debtor CHILDREN */}
                    <div className="children">
                      <p>Kinder:</p>
                      <div className="children-checkbox-container">
                        <label htmlFor="hasChildren">ja</label>
                        <input
                          type="radio"
                          name="children"
                          id="hasChildren"
                          value="ja"
                          checked={hasChildren === "ja"}
                          onChange={(e) => setHasChildren(e.target.value)}
                        />
                        <label htmlFor="noChildren">nein</label>
                        <input
                          type="radio"
                          name="children"
                          id="noChildren"
                          value="nein"
                          checked={hasChildren === "nein"}
                          onChange={(e) => setHasChildren(e.target.value)}
                        />
                      </div>
                    </div>
                  </article>
                  <h4>Anschrift:</h4>
                  <article className="address">
                    {/* debtor STREET */}
                    <div className="street">
                      <label htmlFor="street">Straße + Hausnummer:</label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        placeholder="z.B. Am Friedhof 3"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor CITY */}
                    <div className="city">
                      <label htmlFor="city">Stadt:</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder=""
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      // required
                      />
                    </div>
                    {/* debtor ZIP */}
                    <div className="zip">
                      <label htmlFor="zip">PLZ:</label>
                      <input
                        type="number"
                        name="zip"
                        id="zip"
                        placeholder=""
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor COUNTRY */}
                    <div className="country">
                      <label htmlFor="country">Land:</label>
                      <select
                        name="country"
                        id="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="--">- bitte wählen -</option>
                        <option value="deutschland">Deutschland</option>
                        <option value="oesterreich">Österreich</option>
                        <option value="schweiz">Schweiz</option>
                        <option value="belgien">Belgien</option>
                        <option value="luxemburg">Luxemburg</option>
                      </select>
                    </div>
                  </article>
                  <h4>Kontaktdaten:</h4>
                  <article className="contact">
                    {/* debtor PHONE */}
                    <div className="phone">
                      <label htmlFor="phone">Telefonnr.:</label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="inkl. Vorwahl"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor EMAIL */}
                    <div className="email">
                      <label htmlFor="email">E-Mail:</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      // required
                      />
                    </div>
                  </article>
                  <h4>Arbeitgeber:</h4>
                  <article className="work">
                    {/* debtor EMPLOYER */}
                    <div className="employer">
                      <label htmlFor="employer">Unternehmen:</label>
                      <input
                        type="text"
                        name="employer"
                        id="employer"
                        placeholder=""
                        value={employer}
                        onChange={(e) => setEmployer(e.target.value)}
                      // required
                      />
                    </div>

                    {/* debtor SALARY */}
                    <div className="salary">
                      <label htmlFor="salary">Gehalt (monatlich netto):</label>
                      <input
                        type="text"
                        name="salary"
                        id="salary"
                        placeholder=""
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                      // required
                      />
                      <p>€</p>
                    </div>
                  </article>
                </form>
              </article>

              <button className="submit" onClick={addLoan} id="loanSubmitBtn">
                anlegen
              </button></>)}
        </section>
      </section >
    </>
  );
};

export default AddNewLoan;
