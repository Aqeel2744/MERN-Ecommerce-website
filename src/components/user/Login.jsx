import { useState, useContext } from 'react';
import Appcontext from '../../context/AppContext';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { login } = useContext(Appcontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const resultLogin = await login(email, password);
    if (resultLogin.success) {
      navigate("/");
    }
    setFormData({ email: "", password: "" });
  };


  return (
    <>

      <div className="container-fluid d-flex  align-items-center justify-content-center min-vh-100">
        <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "90%" }}>
          <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>

          <form onSubmit={handleSubmit}>


            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg rounded-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg rounded-3"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm">
              Login
            </button>
          </form>
        </div>
      </div>



    </>
  )
}

export default Login