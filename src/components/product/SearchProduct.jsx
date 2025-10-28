import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from "react-router-dom";
import Appcontext from "../../context/AppContext";

const SearchProduct = () => {
  const { products } = useContext(Appcontext);
  const [searchProducts, setsearchProducts] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    const filtered = products.filter((data) =>
      data?.title?.toLowerCase().includes(term.toLowerCase()) ||
      data?.cat?.toLowerCase().includes(term.toLowerCase())
    );

    setsearchProducts(filtered);
  }, [term, products]);

  return (
    <div className="container my-5">
      <div className="row g-4">
        {searchProducts.length > 0 ? (
          searchProducts.map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card shadow-sm h-100" style={{ borderRadius: "12px" }}>
                <Link to={`/product/${product._id}`}>
                  <div className="ratio ratio-1x1">
                    <img
                      src={product.imgsrc}
                      alt={product.title}
                      className="card-img-top img-fluid"
                      style={{ objectFit: "cover" }}
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
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5 fs-5 text-muted">
            No results found for "<strong>{term}</strong>"
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
