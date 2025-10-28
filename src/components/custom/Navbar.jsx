import { useState, useContext } from "react";
import { FaUser, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Appcontext from "../../context/AppContext";

const Navbar = () => {
  const { products, setfiltered, logout, isAuthenticated, cart } = useContext(Appcontext);
  const [searchTerm, setsearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submithandler = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) navigate("/");
    else navigate(`/product/search/${trimmedTerm}`);
    setsearchTerm("");
  };

  const filterByCategory = (cat) => {
    if (!cat) setfiltered(products);
    else {
      const filteredProducts = products.filter(
        (p) => p.cat.toLowerCase() === cat.toLowerCase()
      );
      setfiltered(filteredProducts);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-dark navbar-expand-lg shadow-sm px-3 py-3"
        style={{
          background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold fs-4 text-light"
            to="/"
          >
            AQ.Ecommerce
          </Link>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            {/* Search Bar */}
            <form
              className="d-flex mx-auto my-3 my-lg-0"
              style={{ width: "100%", maxWidth: "500px" }}
              onSubmit={submithandler}
            >
              <input
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                className="form-control me-2 bg-dark text-light border-0"
                type="search"
                placeholder="Search Product..."
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>

            {/* Right Side Buttons */}
            <div className="d-flex align-items-center gap-2 ms-lg-auto flex-wrap justify-content-center">
              {isAuthenticated ? (
                <>
                  <Link
                    to={"/cart"}
                    type="button"
                    className="btn btn-primary position-relative"
                  >
                    <FiShoppingCart />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length || 0}
                    </span>
                  </Link>

                  <Link
                    to={"/profile"}
                    className="btn btn-outline-light d-flex align-items-center gap-1"
                  >
                    <FaUserCircle /> Profile
                  </Link>

                  <Link
                    onClick={() => logout()}
                    to="/"
                    className="btn btn-outline-light d-flex align-items-center gap-1"
                  >
                    <FaUserPlus /> Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="btn btn-outline-light d-flex align-items-center gap-1"
                  >
                    <FaUser /> Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="btn btn-outline-light d-flex align-items-center gap-1"
                  >
                    <FaUserPlus /> Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Category Bar (only on homepage) */}
      {location.pathname === "/" && (
        <div className="sub-navbar bg-light border-top border-bottom py-2 shadow-sm">
          <div className="container d-flex justify-content-center flex-wrap gap-3 px-2">
            <button
              onClick={() => filterByCategory("")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              All
            </button>
            <button
              onClick={() => filterByCategory("laptops")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Laptops
            </button>
            <button
              onClick={() => filterByCategory("mobiles")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Mobiles
            </button>
            <button
              onClick={() => filterByCategory("clothes")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Clothes
            </button>
            <button
              onClick={() => filterByCategory("shoes")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Shoes
            </button>
            <button
              onClick={() => filterByCategory("watches")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Watches
            </button>
            <button
              onClick={() => filterByCategory("accessories")}
              className="btn btn-outline-secondary fw-semibold px-4 py-2 rounded-pill"
            >
              Accessories
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
