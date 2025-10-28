import { useEffect, useState } from "react";

const ShowOrderProduct = ({ cart }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;

    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        totalQty += cart.items[i].qty;
        totalPrice += cart.items[i].price;
      }
    }

    setQty(totalQty);
    setPrice(totalPrice);
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
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowOrderProduct;
