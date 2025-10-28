import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Appcontext from "../../context/AppContext";

const Cart = () => {
  const { cart, decreaseQty, addToCart , clearCart, removeFromCart } = useContext(Appcontext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <div className="container my-5">
      {cart?.items?.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-secondary mb-4">Your cart is empty 😕</h3>
          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="text-center mb-5">
            <button className="btn btn-info mx-2 fw-bold mb-2">
              Total Qty: {qty}
            </button>
            <button className="btn btn-warning mx-2 fw-bold mb-2">
              Total Price: ${Number(price || 0).toFixed(2)}
            </button>
          </div>

          {/* Cart Items */}
          <div className="row gy-4">
            {cart?.items?.map((product) => (
              <div key={product._id} className="col-lg-6 col-md-12">
                <div className="card bg-dark text-light shadow-lg border-0 h-100">
                  <div className="row g-0 align-items-center p-3">
                    <div className="col-4 text-center">
                      <img
                        src={product.imgsrc}
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body text-start">
                        <h5 className="card-title fw-bold mb-2">
                          {product.title}
                        </h5>
                        <p className="mb-1">Price: ${product.price}</p>
                        <p className="mb-2">Qty: {product.qty}</p>

                        <div className="d-flex flex-wrap gap-2 mt-3">
                          <button className="btn btn-sm btn-outline-warning fw-bold"
                            onClick={() => decreaseQty(product?.productId, 1)}
                          >
                            qty−
                          </button>

                          <button className="btn btn-sm btn-outline-info fw-bold" onClick={() => addToCart(product?.productId, product.title, product.price / product.qty, 1, product.imgsrc)}>
                            qty+
                          </button>

                          <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => {
                            if (confirm("Are you sure, want remove from cart")) {
                              removeFromCart(product?.productId);
                            }
                          }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="text-center mt-5">
            <Link to={'/shipping'} className="btn btn-success px-4 py-2 fw-bold mx-2">
              Proceed to Checkout
            </Link>
            <button className="btn btn-danger px-4 py-2 fw-bold mx-2" onClick={() => {
              if (confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
