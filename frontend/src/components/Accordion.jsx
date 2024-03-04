import { useState } from "react";
// import accordionData from "../data/accordionData.js";
import "./Accordion.scss";

const Accordion = ({ data }) => {
  const [selected, setSelected] = useState(null);
  // const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  // const [multiple, setMultiple] = useState([]);
  const [isOpen, setIsOpen] = useState([]);

  function handleSingleSelection(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
    setIsOpen((prevState) => ({
      ...prevState,
      [getCurrentId]: !prevState[getCurrentId],
    }));
  }

  // function handleMultiSeletion(getCurrentId) {
  //   let copyMulti = [...multiple];
  //   const findIndexOfCurrentId = copyMulti.indexOf(getCurrentId);
  //   console.log("findIndexOfCurrentId: ", findIndexOfCurrentId);

  //   if (findIndexOfCurrentId === -1) copyMulti.push(getCurrentId);
  //   else copyMulti.splice(findIndexOfCurrentId, 1);

  //   setMultiple(copyMulti);
  //   setIsOpen((prevState) => ({
  //     ...prevState,
  //     [getCurrentId]: !prevState[getCurrentId],
  //   }));
  // }

  // console.log(selected, multiple);
  return (
    <div className="accordionwrapper">
      {/* <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Multiauswahl aktivieren
      </button> */}

      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              key={dataItem.id}
              onClick={() => handleSingleSelection(dataItem.id)}
              className="item"
            >
              <div className="title">
                {/* <h3>{dataItem.title}</h3> */}
                <h3>Tilgungsplan</h3>
                <span
                  className={`${isOpen[dataItem.id] ? "close" : "open"}`}
                ></span>
              </div>
              {selected === dataItem.id && (
                <div className="content">
                  {/* Grid!!! */}
                  <p>Raten:</p>
                  <p>6 x {dataItem.installment} €</p>
                  <p>Fällig am:</p>
                  <p>1. des Monats</p>
                  <p>Letzte Rate:</p>
                  <p>datum</p>
                  <p>Zinsbetrag gesamt:</p> <p>ausrechnen!</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Keine daten vorhanden</p>
        )}
      </div>
    </div>
  );
};

export default Accordion;
