import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <>
      <nav className="nav-grid">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/loans">Kredite</NavLink>
        <NavLink to="/">Neuer Kredit</NavLink>
        <NavLink to="/">Schuldner</NavLink>
        <NavLink to="/">Login</NavLink>
      </nav>
    </>
  );
};

export default Nav;
