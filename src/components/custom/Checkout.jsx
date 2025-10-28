import { useContext, useEffect, useState } from "react";
import TableProduct from "./TableProduct";
import { useNavigate, Link } from "react-router-dom";
import Appcontext from "../../context/AppContext";

const Checkout = () => {
  const { cart, userAddress} = useContext(Appcontext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>

        {/* ✅ Responsive Layout */}
        <div className="row g-3 mt-3">
          {/* Product Table */}
          <div className="col-lg-8 col-md-12">
            <TableProduct cart={cart} />
          </div>

          {/* Shipping Address */}
          <div className="col-lg-4 col-md-12">
            <div className="table-responsive">
              <table className="table table-bordered border-primary bg-dark text-center">
                <thead>
                  <tr>
                    <th className="bg-dark text-light">Shipping Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-dark text-light text-start">
                      <ul style={{ fontWeight: "bold", listStyle: "none", padding: 0 }}>
                        <li>Name : {userAddress?.fullName}</li>
                        <li>Phone : {userAddress?.phoneNumber}</li>
                        <li>Country : {userAddress?.country}</li>
                        <li>State : {userAddress?.state}</li>
                        <li>PinCode : {userAddress?.pincode}</li>
                        <li>Near By : {userAddress?.address}</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="container text-center my-5">
        <Link to={'/confirm'} className="btn btn-secondary btn-lg fw-bold">Confirm Order</Link>
        <Link
          to={"/"}
          className="btn btn-secondary btn-lg fw-bold ms-3"
          style={{ margin: "1rem" }}
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default Checkout;
