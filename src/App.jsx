import ShowProduct from './components/product/ShowProduct';
import ProductDetail from './components/product/ProductDetail';
import SearchProduct from './components/product/SearchProduct';
import Navbar from './components/custom/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Register from './components/user/Register';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Cart from './components/custom/Cart';
import Address from './components/custom/Address';
import Checkout from './components/custom/Checkout';
import OrderConfirmation from './components/custom/OrderConfirmation';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirm" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
