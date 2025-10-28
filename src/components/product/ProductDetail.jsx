import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import Appcontext from "../../context/AppContext";


const ProductDetail = () => {
  const {addToCart} = useContext(Appcontext);
  const [product, setProduct ] = useState(null);
  const { id } = useParams();
  const url = "http://localhost:3000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container my-5">
        <div className="row align-items-center justify-content-center">
          {/* Left side (Image) */}
          <div className="col-md-5 col-sm-10 text-center mb-4 mb-md-0">
            <img
              src={product?.imgsrc}
              alt={product?.title}
              className="img-fluid rounded shadow"
              style={{
                maxHeight: "350px",
                objectFit: "cover",
                border: "3px solid #ffc107",
              }}
            />
          </div>

          {/* Right side (Details) */}
          <div className="col-md-5 col-sm-10 text-center text-md-start">
            <h2 className="fw-bold mb-3">{product?.title}</h2>
            <p className="mb-4 text-white-50">{product?.desc}</p>
            <h3 className="fw-bold mb-4 text-success">₹{product?.price}</h3>

            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              
              <button  onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgsrc)} className="btn btn-warning btn-lg fw-bold px-4">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct  cat={product?.cat}/>

    </>
  );
};

export default ProductDetail;
