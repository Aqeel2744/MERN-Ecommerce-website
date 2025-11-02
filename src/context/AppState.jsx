import axios from 'axios';
import Appcontext from './AppContext';
import { useEffect, useState } from 'react';
import { toast, Bounce } from "react-toastify";

const AppState = (props) => {
    const [products, setproducts] = useState([]);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [filtered, setfiltered] = useState([]);
    const [User, setUser] = useState();
    const [cart, setcart] = useState([]);
    const [reload, setreload] = useState(false)
    const [userAddress, setUserAddress] = useState('');

    const url = "http://localhost:3000/api";
    // const url = "https://ecommerce-backend-chi-opal.vercel.app/api";




    // Fetch all products 
    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/product/all`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            setproducts(api.data.products);
            setfiltered(api.data.products);
        };
        fetchProduct();
        userCart();
        getAddress();
    }, [token, reload]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    // Fetch profile only when token changes
    useEffect(() => {
        if (token) userProfile();
    }, [token]);

    // register
    const register = async (name, email, password) => {
        const api = await axios.post(`${url}/user/register`,
            { name, email, password },
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        toast.success(api.data.message, { position: "top-right", autoClose: 1500, theme: "dark", transition: Bounce });
        return api.data;
    };

    // login
    const login = async (email, password) => {
        const api = await axios.post(`${url}/user/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        toast.success(api.data.message, { position: "top-right", autoClose: 1500, theme: "dark", transition: Bounce });
        setToken(api.data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", api.data.token);
        return api.data;
    };

    const logout = () => {
        setToken('');
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        toast.success("Logout successfully", { position: "top-right", autoClose: 1500, theme: "dark", transition: Bounce });
        setUser(null);
    };

    //  user profile
    const userProfile = async () => {
        const api = await axios.get(`${url}/user/profile`, {
            headers: {
                "Content-Type": "application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        setUser(api.data);

    };


    const addToCart = async (productId, title, price, qty, imgsrc) => {
        const api = await axios.post(
            `${url}/cart/add`,
            { productId, title, price, qty, imgsrc },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    }

    const userCart = async () => {
        const api = await axios.get(`${url}/cart/user`, {
            headers: { "Content-Type": "application/json", Auth: token },
            withCredentials: true,
        });
        // console.log(api.data.cart)
        setcart(api.data.cart);

    }

    //  --qty
    const decreaseQty = async (productId, qty) => {
        const api = await axios.post(
            `${url}/cart/--qty`,
            { productId, qty },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        // console.log("decrease cart items ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };

    const removeFromCart = async (productId) => {
        const api = await axios.delete(
            `${url}/cart/remove/${productId}`,

            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        // console.log(api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    };

    const clearCart = async () => {
        const api = await axios.delete(
            `${url}/cart/remove`,

            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        // console.log(api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    };

    //  Add Shipping Address
    const shippingAddress = async (
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    ) => {
        const api = await axios.post(
            `${url}/address/add`,
            { fullName, address, city, state, country, pincode, phoneNumber },
            {
                headers: {
                    "Content-Type": "Application/json",
                    Auth: token,
                },
                withCredentials: true,
            }
        );
        setreload(!reload);
        // console.log("remove item from cart ",api);
        toast.success(api.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return api.data;
        //  setCart(api.data.cart);
        //  setUser("user cart ",api);
    };

    // get User latest address
    const getAddress = async () => {
        const api = await axios.get(`${url}/address/get`, {
            headers: {
                "Content-Type": "Application/json",
                Auth: token,
            },
            withCredentials: true,
        });
        //  console.log("user address ", api.data.userAddress);
        setUserAddress(api.data.userAddress);
    };




    return (
        <Appcontext.Provider value={{
            products, register, login, logout, url,
            token,
            setIsAuthenticated,
            isAuthenticated,
            setfiltered,
            filtered,
            User,
            addToCart,
            cart,
            decreaseQty,
            removeFromCart,
            clearCart,
            shippingAddress,
            getAddress,
            userAddress


        }}>
            {props.children}
        </Appcontext.Provider>
    );
};

export default AppState;
