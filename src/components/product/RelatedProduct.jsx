import { useContext, useEffect, useState } from 'react'
import Appcontext from '../../context/AppContext';
import { Link } from "react-router-dom";

const RelatedProduct = ({ cat }) => {
  const { products, addToCart } = useContext(Appcontext);

  const [relatedProducts, setrelatedProducts] = useState([])

  useEffect(() => {

    setrelatedProducts(
      products.filter(
        (data) => data?.cat?.toLowerCase() == cat?.toLowerCase()
      )
    )

  }, [cat, products])

  return (
    <>

      <div className="container my-5" >
        <h1 className='text-center my-5'>Related Products</h1>
        <div className="row g-4">
          {relatedProducts.map((product) => (
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
                  <button
                    onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgsrc)}
                    className="btn btn-primary w-100"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default RelatedProduct