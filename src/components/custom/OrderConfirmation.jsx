import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Appcontext from "../../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
  const { cart, userAddress } = useContext(Appcontext);

  return (
    <div className="container my-4">
      <h1 className="text-center text-success fw-bold mb-4">
        ✅ Your Order Has Been Confirmed!
      </h1>
      <p className="text-center fs-5">
        Thank you for shopping with us. Your order will be delivered soon.
      </p>

      {/* Order Details */}
      <div className="row g-3 mt-4">
        {/* Ordered Products */}
        <div className="col-lg-8 col-md-12">
          <h3 className="text-center mb-3">Ordered Items</h3>
          <ShowOrderProduct cart={cart} />
        </div>

        {/* Shipping Address */}
        <div className="col-lg-4 col-md-12">
          <h3 className="text-center mb-3">Shipping Address</h3>
          <div className="table-responsive">
            <table className="table table-bordered border-primary bg-dark text-center">
              <thead>
                <tr>
                  <th className="bg-dark text-light">Address Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-dark text-light text-start">
                    <ul style={{ fontWeight: "bold", listStyle: "none", padding: 0 }}>
                      <li>Name: {userAddress?.fullName}</li>
                      <li>Phone: {userAddress?.phoneNumber}</li>
                      <li>Country: {userAddress?.country}</li>
                      <li>State: {userAddress?.state}</li>
                      <li>PinCode: {userAddress?.pincode}</li>
                      <li>Near By: {userAddress?.address}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="container text-center my-5">
        <Link to={"/"} className="btn btn-secondary btn-lg fw-bold">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
