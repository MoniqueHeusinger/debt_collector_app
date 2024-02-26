import { NavLink } from "react-router-dom";
import "./Nav.scss";
import houseMoney from "../assets/img/icons/house-money.png";
import handMoney from "../assets/img/icons/hand-money.png";
import plusLoan from "../assets/img/icons/plus.png";
import users from "../assets/img/icons/users.png";
import login from "../assets/img/icons/login.png";

const Nav = () => {
  return (
    <>
      <nav className="nav-grid">
        <NavLink to="/">
          <img src={houseMoney} alt="Dashboard" />
        </NavLink>
        <NavLink to="/loans">
          <img src={handMoney} alt="Kredite" />
        </NavLink>
        <NavLink to="/add-new-loan">
          <img src={plusLoan} alt="neuer Kredit" />
        </NavLink>
        <NavLink to="/">
          <img src={users} alt="Schuldner" />
        </NavLink>
        <NavLink to="/">
          <img src={login} alt="Login" />
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
