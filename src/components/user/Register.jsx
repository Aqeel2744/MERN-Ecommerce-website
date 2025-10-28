import { useState, useContext } from 'react';
import Appcontext from '../../context/AppContext';

const Register = () => {
  const { register } = useContext(Appcontext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    await register(name, email, password);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="container-fluid d-flex  align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "90%" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0 small text-muted">
          Already have an account? <a href="/login" className="text-decoration-none text-primary fw-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
