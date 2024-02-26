import { useState } from "react";
import { backendURL } from "../api";
import Nav from "../components/Nav";
import "./AddNewLoan.scss";
// import "./AddNewLoanNew.css"; // with custom select style - not working

const AddNewLoan = () => {
  const [amount, setAmount] = useState("");
  const [payoutDate, setPayoutDate] = useState("");
  const [installment, setInstallment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [paidOff, setPaidOff] = useState(false);
  const [debtor, setDebtor] = useState([]);
  const [firstname, setFirstname] = useState("");

  const addLoan = (event) => {
    event.preventDefault();

    // muss noch in ein Objekt gepackt werden??!!
    // setDebtor([...debtor, firstname]);

    fetch(`${backendURL}/api/v1/loans`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        payoutDate,
        installment,
        interestRate,
        // term,
        paidOff,
        // debtor,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
      })
      .catch((error) => console.log(error));

    setAmount("");
    setPayoutDate("");
    setInstallment("");
    setInterestRate("");
    // setTerm("");
    setPaidOff("");
    setDebtor([]);
  };

  //   console.log(addLoan);

  // =====================================
  // Custom style select elements

  //   var x, i, j, l, ll, selElmnt, a, b, c;
  //   /* Look for any elements with the class "custom-select": */
  //   x = document.getElementsByClassName("custom-select");
  //   l = x.length;
  //   for (i = 0; i < l; i++) {
  //     selElmnt = x[i].getElementsByTagName("select")[0];
  //     ll = selElmnt.length;
  //     /* For each element, create a new DIV that will act as the selected item: */
  //     a = document.createElement("DIV");
  //     a.setAttribute("class", "select-selected");
  //     a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  //     x[i].appendChild(a);
  //     /* For each element, create a new DIV that will contain the option list: */
  //     b = document.createElement("DIV");
  //     b.setAttribute("class", "select-items select-hide");
  //     for (j = 1; j < ll; j++) {
  //       /* For each option in the original select element,
  //     create a new DIV that will act as an option item: */
  //       c = document.createElement("DIV");
  //       c.innerHTML = selElmnt.options[j].innerHTML;
  //       c.addEventListener("click", function (e) {
  //         /* When an item is clicked, update the original select box,
  //         and the selected item: */
  //         var y, i, k, s, h, sl, yl;
  //         s = this.parentNode.parentNode.getElementsByTagName("select")[0];
  //         sl = s.length;
  //         h = this.parentNode.previousSibling;
  //         for (i = 0; i < sl; i++) {
  //           if (s.options[i].innerHTML == this.innerHTML) {
  //             s.selectedIndex = i;
  //             h.innerHTML = this.innerHTML;
  //             y = this.parentNode.getElementsByClassName("same-as-selected");
  //             yl = y.length;
  //             for (k = 0; k < yl; k++) {
  //               y[k].removeAttribute("class");
  //             }
  //             this.setAttribute("class", "same-as-selected");
  //             break;
  //           }
  //         }
  //         h.click();
  //       });
  //       b.appendChild(c);
  //     }
  //     x[i].appendChild(b);
  //     a.addEventListener("click", function (e) {
  //       /* When the select box is clicked, close any other select boxes,
  //     and open/close the current select box: */
  //       e.stopPropagation();
  //       closeAllSelect(this);
  //       this.nextSibling.classList.toggle("select-hide");
  //       this.classList.toggle("select-arrow-active");
  //     });
  //   }

  //   function closeAllSelect(elmnt) {
  //     /* A function that will close all select boxes in the document,
  //   except the current select box: */
  //     var x,
  //       y,
  //       i,
  //       xl,
  //       yl,
  //       arrNo = [];
  //     x = document.getElementsByClassName("select-items");
  //     y = document.getElementsByClassName("select-selected");
  //     xl = x.length;
  //     yl = y.length;
  //     for (i = 0; i < yl; i++) {
  //       if (elmnt == y[i]) {
  //         arrNo.push(i);
  //       } else {
  //         y[i].classList.remove("select-arrow-active");
  //       }
  //     }
  //     for (i = 0; i < xl; i++) {
  //       if (arrNo.indexOf(i)) {
  //         x[i].classList.add("select-hide");
  //       }
  //     }
  //   }

  //   /* If the user clicks anywhere outside the select box,
  // then close all select boxes: */
  //   document.addEventListener("click", closeAllSelect);

  //   END Style custom select element
  // =====================================

  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <section className="header-grid">
          <h1>Neuen Kredit anlegen</h1>
        </section>

        <section className="main-content-grid">
          {/* LOAN DATA */}
          {/* =========================== */}
          <article className="loan-data-container">
            <h2>Kreditdaten:</h2>

            <form>
              {/* loan amount */}
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

              {/* loan pay out date */}
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

              {/* loan installment */}
              <div className="installment">
                <label htmlFor="installment">Raten (monatlich)</label>
                <input
                  type="number"
                  name="installment"
                  id="installment"
                  min="1"
                  max="9999"
                  placeholder="z.B. 200,00"
                  value={installment}
                  onChange={(e) => setInstallment(Number(e.target.value))}
                  required
                />
                <p>€</p>
              </div>

              {/* loan interestRate */}
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

          {/* DEBTOR DATA */}
          {/* =========================== */}
          <article className="debtor-data-container">
            <h2>Schuldner:</h2>
            <form>
              <article className="personal-data">
                {/* debtor firstname */}
                <div className="firstname">
                  <label htmlFor="firstname">Vorname:</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder=""
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    // required
                  />
                </div>

                {/* debtor lastname */}
                <div className="lastname">
                  <label htmlFor="lastname">Nachname:</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder=""
                    // required
                  />
                </div>

                {/* debtor birthday */}
                <div className="birthday">
                  <label htmlFor="birthday">Geburtstag:</label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    placeholder=""
                    // required
                  />
                </div>

                {/* debtor marital status */}
                <div className="marital-status">
                  <label htmlFor="maritalStatus">Familienstand:</label>
                  <div className="custom-select">
                    <select name="maritalStatus" id="maritalStatus">
                      <option value="">bitte wählen</option>
                      <option value="ledig">ledig</option>
                      <option value="verheiratet">verheiratet</option>
                      <option value="geschieden">geschieden</option>
                      <option value="verwitwet">verwitwet</option>
                    </select>
                  </div>
                </div>

                {/* debtor children */}
                <div className="children">
                  <p>Kinder:</p>
                  <div className="children-checkbox-container">
                    <label htmlFor="hasChildren">ja</label>
                    <input
                      type="checkbox"
                      name="hasChildren"
                      id="hasChildren"
                    />
                    <label htmlFor="noChildren">nein</label>
                    <input type="checkbox" name="noChildren" id="noChildren" />
                  </div>
                </div>
              </article>
              <h4>Anschrift:</h4>
              <article className="address">
                {/* debtor street */}
                <div className="street">
                  <label htmlFor="street">Straß + Hausnummer:</label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="z.B. Am Friedhof 3"
                    // required
                  />
                </div>

                {/* debtor city */}
                <div className="city">
                  <label htmlFor="city">Stadt:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder=""
                    // required
                  />
                </div>
                {/* debtor zip */}
                <div className="zip">
                  <label htmlFor="zip">PLZ:</label>
                  <input
                    type="number"
                    name="zip"
                    id="zip"
                    placeholder=""
                    // required
                  />
                </div>

                {/* debtor country */}
                <div className="country">
                  <label htmlFor="country">Land:</label>
                  <select name="country" id="country">
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
                {/* debtor phone */}
                <div className="phone">
                  <label htmlFor="phone">Telefonnr.:</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="inkl. Vorwahl"
                    // required
                  />
                </div>

                {/* debtor email */}
                <div className="email">
                  <label htmlFor="email">E-Mail:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder=""
                    // required
                  />
                </div>
              </article>
              <h4>Arbeitgeber:</h4>
              <article className="work">
                {/* debtor employer */}
                <div className="employer">
                  <label htmlFor="employer">Unternehmen:</label>
                  <input
                    type="text"
                    name="employer"
                    id="employer"
                    placeholder=""
                    // required
                  />
                </div>

                {/* debtor salary */}
                <div className="salary">
                  <label htmlFor="salary">Gehalt (monatlich netto):</label>
                  <input
                    type="text"
                    name="salary"
                    id="salary"
                    placeholder=""
                    // required
                  />
                  <p>€</p>
                </div>
              </article>
            </form>
          </article>

          <button className="btn submit" onClick={addLoan}>
            anlegen
          </button>
        </section>
      </section>
    </>
  );
};

export default AddNewLoan;
