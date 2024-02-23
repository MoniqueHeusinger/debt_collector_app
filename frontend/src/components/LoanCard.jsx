const LoanCard = (props) => {
  // console.log("props: ", props);

  return (
    <>
      <article className="loan-card">
        <p className="loan-amount">{props.amount} €</p>
        <p className="loan-debtor-name">
          {props.debtor.firstname} {props.debtor.lastname}
        </p>
        {/* <p className="loan-date">ausgeszahlt am: {props.payoutDate}</p> */}
        <div className="paidOff-container">
          {/* <p className="loan-paid-status">
            Kredit {props.paidOff ? "abbezahlt" : "nicht abbezahlt"}
          </p> */}

          <p
            className={
              props.paidOff
                ? "loan-paid-status paid-green"
                : "loan-paid-status not-paid-red"
            }
          >
            Kredit {props.paidOff ? "abbezahlt" : "nicht abbezahlt"}
          </p>

          <p className="loan-unpaid-installments">
            Offene Raten:{" "}
            <span>
              {props.term}x {props.installment} €
            </span>
          </p>
        </div>
      </article>
    </>
  );
};

export default LoanCard;
