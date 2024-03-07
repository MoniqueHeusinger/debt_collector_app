import { useState } from "react";
import pen from "../assets/img/icons/pen-primary-pale.png";
import penDark from "../assets/img/icons/pen-primary.png";
import trash from "../assets/img/icons/trash-primary-pale.png";
import trashDark from "../assets/img/icons/trash-primary.png";
import { Link } from "react-router-dom";

const LoanCard = ({ _id, amount, debtor, className }) => {
  const [editIconSrc, setEditIconSrc] = useState(pen);
  const [deleteIconSrc, setDeleteIconSrc] = useState(trash);

  const handleEditMouseOver = () => {
    setEditIconSrc(penDark);
  };

  const handleEditMouseOut = () => {
    setEditIconSrc(pen);
  };

  const handleDeleteMouseOver = () => {
    setDeleteIconSrc(trashDark);
  };

  const handleDeleteMouseOut = () => {
    setDeleteIconSrc(trash);
  };

  return (
    <>
      <Link to={`/loans/${_id}`}>
        <article className={"loan-card " + className}>
          <p className="loan-amount">{amount} €</p>
          <p className="loan-debtor-name">
            {debtor.firstname} {debtor.lastname}
          </p>

          {/* <p className="loan-next-installment-text">nächste Rate am:</p>
          <p className="loan-next-installment-date">15.03.2024</p>

          <p className="loan-last-installment-text">letzte Rate am:</p>
          <p className="loan-last-installment-date">15.05.2024</p> */}

          <img
            src={editIconSrc}
            alt="bearbeiten"
            id="editIcon"
            onMouseOver={handleEditMouseOver}
            onMouseOut={handleEditMouseOut}
          />
          {/* </div> */}

          <img
            src={deleteIconSrc}
            alt="löschen"
            id="deleteIcon"
            onMouseOver={handleDeleteMouseOver}
            onMouseOut={handleDeleteMouseOut}
          />
        </article>
      </Link>
    </>
  );
};

export default LoanCard;
