import { NavLink } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <section className="header-grid">
        <h1>Dashboard</h1>
      </section>

      <section className="main-content-grid">
        <h2>Willkommen auf deinem Dashboard, Justus!</h2>
        <section className="dashboard-overview-grid-wrapper">
          <article className="dashboard-overview-container">
            <div className="dashboard-overview-nav-container">
              <NavLink>Überblick</NavLink>
              <NavLink>Kredite</NavLink>
              <NavLink>Schuldner</NavLink>
              <NavLink>Vermögen</NavLink>
            </div>
            <div className="dashboard-overview-btn-container">
              <button className="btn">Login</button>
            </div>
          </article>
          <article className="dashboard-overview-content-container">
            <div className="overview-content-card">
              <h3>Familienvermögen</h3>
              <p>2.145.760,54 €</p>
              <p>
                {" "}
                <span className="percentage-grow">+ 2.1%</span> seit letztem
                Monat
              </p>
            </div>
            <div className="overview-content-card">
              <h3>Aktuell vergebene Kredite</h3>
              <p>12</p>
              <p>(500 € - 22.400 €)</p>
            </div>
            <div className="overview-content-card">
              <h3>Aktuelle Schuldner</h3>
              <p>12</p>
              <p>
                <span className="percentage-shrink">- 4.5%</span> seit letztem
                Monat
              </p>
            </div>
          </article>

          <article className="dues-and-new-loan-container">
            <article className="dues-container">
              <h2>Fälligkeiten - TOP 3</h2>
              <div className="dues-content">
                <div className="dues-card">
                  <h3>Jenny Block</h3>
                  <p>fällig: in 3 Tagen</p>
                  <p>Rate: 500 €</p>
                </div>

                <div className="dues-card">
                  <h3>Ronny Meyer</h3>
                  <p>fällig: in 3 Tagen</p>
                  <p>Rate: 50 €</p>
                </div>

                <div className="dues-card">
                  <h3>Ulf Rakowski</h3>
                  <p>fällig: in 3 Tagen</p>
                  <p>Rate: 200 €</p>
                </div>
              </div>
            </article>

            {/* new loan link */}
            <a href="#" className="new-loan-container">
              + neuer Kredit
            </a>
          </article>
        </section>
      </section>
      {/* </section>
          <article className="dashboard-grid-first-top p-1">
            <h3>Familienvermögen:</h3>
            <p>2.145.760,54 €</p>
          </article>

          <article className="dashboard-grid-second-top p-1">
            <h3>Verliehenes Kapital (aktuell):</h3>
            <p>203.000,00 €</p>
          </article>

          <article className="dashboard-grid-third-left p-1">
            <h3>Aktuell vergebene Kredite:</h3>
            <p>12 Kredite</p>
          </article>

          <article className="dashboard-grid-third-right p-1">
            <div>
              <h3>Aktuelle Schuldner:</h3>
              <p>12</p>
            </div>
            <div>
              <h2>Schuldner im Rückstand:</h2>
              <p>Clausi Mausi</p>
              <p>Babsi Schubidu</p>
            </div>
          </article>

          <article className="dashboard-grid-fourth-bottom p-1">
            <h3>+ Neuen Kredit hinzufügen</h3>
          </article>
        </section> */}
    </>
  );
};

export default Dashboard;
