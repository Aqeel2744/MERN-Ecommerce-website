
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Appcontext from "../../context/AppContext";

const ShowProduct = () => {
  const { products, filtered, addToCart } = useContext(Appcontext);
  const [displayProducts, setdisplayProducts] = useState([]);


  useEffect(() => {
    // ✅ Show filtered if available, otherwise all products
    if (filtered && filtered.length > 0) {
      setdisplayProducts(filtered);
    } else {
      setdisplayProducts(products);
    }
  }, [filtered, products]);

  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          {displayProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card shadow-sm h-100" style={{ borderRadius: "12px" }}>
                <Link to={`/product/${product._id}`}>
                  <div className="ratio ratio-1x1">
                    <img
                      src={product.imgsrc}
                      alt={product.title}
                      className="card-img-top img-fluid"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Link>

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-center fw-bold">
                      {product.title}
                    </h5>
                    <p className="card-text text-center text-muted mb-3">
                      ${product.price}
                    </p>
                  </div>
                  <button onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgsrc)} className="btn btn-primary w-100" >Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProduct;
