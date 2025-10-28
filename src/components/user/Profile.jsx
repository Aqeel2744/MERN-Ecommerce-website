import { useContext } from "react";
import Appcontext from "../../context/AppContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { User, cart } = useContext(Appcontext);
  const items = Array.isArray(cart) ? cart : cart?.items || [];

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        {User ? (
          <>
            <h2 className="fw-bold mb-2 text-primary">Welcome, {User.name}</h2>
            <p className="text-muted mb-0">{User.email}</p>
          </>
        ) : (
          <p>Loading your profile...</p>
        )}
      </div>

      <h3 className="text-center mb-4 fw-bold text-warning">Your Cart Items</h3>

      {items.length > 0 ? (
        <div className="row g-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch"
            >
              <div className="card shadow-sm border-0 w-100" style={{ borderRadius: "12px" }}>
                <Link to={`/product/${item.productId}`} className="text-decoration-none">
                  <div className="ratio ratio-1x1">
                    <img
                      src={item.imgsrc}
                      alt={item.title}
                      className="card-img-top img-fluid rounded-top"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>

                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-dark mb-2">{item.title}</h5>
                    <p className="text-muted mb-1">₹{item.price}</p>
                    <p className="text-secondary small">Qty: {item.qty}</p>
                  </div>
                  <Link
                    to={`/product/${item.productId}`}
                    className="btn btn-outline-primary mt-2 fw-semibold"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">Your cart is empty.</p>
          <Link to="/" className="btn btn-warning mt-3 fw-bold px-4">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
