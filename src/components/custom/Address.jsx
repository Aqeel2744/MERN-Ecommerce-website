import React, { useContext, useState } from "react";
import Appcontext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";


const Address = () => {
  const { shippingAddress, userAddress } = useContext(Appcontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address added ", result);

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #000000 0%, #1c1c1c 50%, #3a3a3a 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 w-100 p-4"
        style={{
          maxWidth: "800px",
          borderRadius: "20px",
          backgroundColor: "rgba(33, 37, 41, 0.95)",
          color: "white",
          transition: "all 0.4s ease",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: "#ffc107",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Shipping Address
        </h2>

        <form onSubmit={submitHandler}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="Country name"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="Enter state"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangerHandler}
                type="text"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="City"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="Postal code"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangerHandler}
                type="number"
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                placeholder="Phone number"
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">
                Address / Nearby Landmark
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangerHandler}
                className="form-control bg-dark text-light border-secondary rounded-3 shadow-sm"
                rows="3"
                placeholder="Street name, area, building..."
                required
              ></textarea>
            </div>
          </div>

          <div className="d-grid col-md-6 mx-auto mt-4">
            <button
              type="submit"
              className="btn btn-warning fw-bold py-2 shadow"
              style={{
                borderRadius: "50px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1.0)")}
            >
              Submit
            </button>
          </div>

          {userAddress && (
            <div className="d-grid col-md-6 mx-auto mt-3">
              <button
                className="btn btn-outline-light fw-bold py-2 shadow-sm"
                onClick={() => navigate("/checkout")}
                style={{
                  borderRadius: "50px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1.0)")}
              >
                Use Old Address
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Address;
