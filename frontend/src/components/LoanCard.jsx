const LoanCard = ({ amount, paidOff, term, installment, debtor }) => {
  return (
    <>
      <article className="loan-card">
        <p className="loan-amount">{amount} €</p>
        <p className="loan-debtor-name">
          {debtor.firstname} {debtor.lastname}
        </p>
        <div className="paidOff-container">
          <p
            className={
              paidOff
                ? "loan-paid-status paid-green"
                : "loan-paid-status not-paid-red"
            }
          >
            Kredit {paidOff ? "abbezahlt" : "nicht abbezahlt"}
          </p>

          <p className="loan-unpaid-installments">
            Offene Raten:{" "}
            <span>
              {term}x {installment} €
            </span>
          </p>
        </div>
      </article>
    </>
  );
};

export default LoanCard;
