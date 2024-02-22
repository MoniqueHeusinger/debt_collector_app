const LoanCard = (props) => {
  return (
    <>
      <article className="loan-card">
        <p>{props.amount} €</p>
        <p>
          Raten: {props.term}x {props.installment} €
        </p>
        <p>Kredit {props.paidOff ? "abbezahlt" : "nicht abbezahlt"}</p>
      </article>
    </>
  );
};

export default LoanCard;
