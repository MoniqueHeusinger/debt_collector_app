import Dashboard from "../components/Dashboard";
import Nav from "../components/Nav";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <section className="main-grid-structure">
        <Nav />
        <Dashboard />
      </section>
    </>
  );
};

export default Home;
