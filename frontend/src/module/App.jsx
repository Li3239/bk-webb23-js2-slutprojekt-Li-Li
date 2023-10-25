import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Home from "./Home";
import { createContext, useEffect, useState } from "react";
import { getProductData } from "./dataaccess/ProductDataAccess";
import { getCartData } from "./dataaccess/CartDataAccess";
import { CartInfo } from "./CartInfo";

export default function App() {
    const [cartItem, setCartItem] = useState({
        totalPrice: 0,
        quantity: 0
    });
    // save product.json
    const [products, setProducts] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    // items for researching product data
    const [searchKey, setSearchKey] = useState({
        title: '',     // inputed product title in searchbar
        category: '',  // selected category in sale.jsx
        orderby: true  // order by 
    });
    // data in shopping cart
    const [cartData, setCartData] = useState([]);
    // show or close shopping cart
    const [showCart, setShowCart] = useState(false);
    // count up/down, clear shopping cart or after payment
    const [cartIsChanged, setCartIsChanged] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        // console.log('[App] searchObj =', searchKey);
        getProductData(searchKey).then((data) => {
            setProducts(data);
        });
    }, [searchKey, isPaid]);

    useEffect(() => {
        getCartData().then((data) => {
            setCartData(data);
        })
    }, [showCart, cartIsChanged]);

    // when cartData is changed, recaculate the total price
    useEffect(() => {
        // total price
        const item = CartInfo(cartData);
        setCartItem(item);
    }, [cartData]);

    return(
        <Router>
            <Routes>
                <Route path='/' element={
                    <Home 
                        isSearched={isSearched} setIsSearched={setIsSearched}
                        searchKey={searchKey} setSearchKey={setSearchKey}
                        products={products}
                        showCart={showCart} setShowCart={setShowCart}
                        cartData={cartData} setCartData={setCartData}
                        cartItem={cartItem} 
                        cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                        isPaid={isPaid} setIsPaid={setIsPaid} />} />
                <Route path='/products' element={
                    <Products 
                        isSearched={isSearched} setIsSearched={setIsSearched}
                        searchKey={searchKey} setSearchKey={setSearchKey}
                        products={products}
                        showCart={showCart} setShowCart={setShowCart}
                        cartData={cartData} setCartData={setCartData}
                        cartItem={cartItem} 
                        cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                        isPaid={isPaid} setIsPaid={setIsPaid}/>} />
            </Routes>
        </Router>
    );
}