import React, { useContext, useEffect, useState } from "react";
import Appcontext from "../../context/AppContext";
import { MdAddCircle, MdRemoveCircle, MdDelete } from "react-icons/md";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(Appcontext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
    <div className="table-responsive">
      <table className="table table-bordered border-primary bg-dark text-center align-middle">
        <thead>
          <tr>
            <th className="bg-dark text-light">Product Img</th>
            <th className="bg-dark text-light">Title</th>
            <th className="bg-dark text-light">Price</th>
            <th className="bg-dark text-light">Qty</th>
            <th className="bg-dark text-light">Qty++</th>
            <th className="bg-dark text-light">Qty--</th>
            <th className="bg-dark text-light">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <td className="bg-dark text-light">
                <img
                  src={product.imgsrc}
                  alt={product.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>

              <td className="bg-dark text-light">
                <MdAddCircle
                  size={25}
                  color="limegreen"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgsrc
                    )
                  }
                />
              </td>

              <td className="bg-dark text-light">
                <MdRemoveCircle
                  size={25}
                  color="orange"
                  style={{ cursor: "pointer" }}
                  onClick={() => decreaseQty(product?.productId, 1)}
                />
              </td>

              <td className="bg-dark text-light">
                <MdDelete
                  size={25}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to remove this item?")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light">
              <button className="btn btn-primary fw-bold">Total</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-warning fw-bold">{price}</button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info fw-bold">{qty}</button>
            </td>
            <td className="bg-dark text-light" colSpan="3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
