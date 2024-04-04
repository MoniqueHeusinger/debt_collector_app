import { useEffect, useState } from "react";
import pen from "../assets/img/icons/pen-primary-pale.png";
import penDark from "../assets/img/icons/pen-primary.png";
import trash from "../assets/img/icons/trash-primary-pale.png";
import trashDark from "../assets/img/icons/trash-primary.png";
import doneIcon from "../assets/img/icons/done.svg";
import { Link } from "react-router-dom";
import { backendURL } from "../api";

const LoanCard = ({ _id, amount, debtor, className }) => {
  const [editIconSrc, setEditIconSrc] = useState(pen);
  const [deleteIconSrc, setDeleteIconSrc] = useState(trash);
  const [deleteMessage, setDeleteMessage] = useState("");

  // CHECK LOCAL STORAGE FOR MESSAGES
  useEffect(() => {
    const storedMessage = localStorage.getItem("deleteMessage");
    if (storedMessage) {
      setDeleteMessage(storedMessage);
      // remove stored message from local storage
      localStorage.removeItem("deleteMessage");
    }
  }, []);

  // CHANGE COLOR OF EDIT AND DELETE ICON
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

  // FETCH DELETE LOAN
  const deleteLoan = () => {
    fetch(`${backendURL}/api/v1/loans/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (success) {
          // set delete message in local storage
          localStorage.setItem("deleteMessage", "Kredit erfolgreich gelöscht");
          // update page to display the delete message
          window.location.reload();
        } else {
          console.error("Fehler beim Löschen des Kredits");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {deleteMessage && (
        <article className="delete-message-container">
          <img src={doneIcon} alt="" />
          <p className="deleteMessage" id="deleteMessage">
            {deleteMessage}
          </p>
        </article>
      )}

      <article className={"loan-card " + className}>
        <Link to={`/loans/${_id}`} id="loanLink">
          <p className="loan-amount">{amount} €</p>
          <p className="loan-debtor-name">
            {debtor.firstname} {debtor.lastname}
          </p>
        </Link>

        <Link to={`/add-new-loan/${_id}`} id="editLink">
          <img
            src={editIconSrc}
            alt="bearbeiten"
            id="editIcon"
            onMouseOver={handleEditMouseOver}
            onMouseOut={handleEditMouseOut}
          />
        </Link>

        <img
          src={deleteIconSrc}
          alt="löschen"
          id="deleteIcon"
          onMouseOver={handleDeleteMouseOver}
          onMouseOut={handleDeleteMouseOut}
          onClick={deleteLoan}
        />
      </article>
    </>
  );
};

export default LoanCard;
