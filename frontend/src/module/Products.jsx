import HeaderZon from "./HeaderZon";
import Menu from "./Menu";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import { useState } from 'react';

export default function Products({
    isSearched, setIsSearched, 
    searchKey, setSearchKey, 
    products, 
    showCart, setShowCart,
    cartData, setCartData,
    cartItem, 
    cartIsChanged, setCartIsChanged,
    isPaid, setIsPaid}) {

    return(
        <>
            <HeaderZon/>
            <SearchBar 
                setIsSearched={setIsSearched} 
                searchKey={searchKey} setSearchKey={setSearchKey}
                showCart={showCart} setShowCart={setShowCart}
                cartData={cartData}
                cartItem={cartItem} 
                cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                isPaid={isPaid} setIsPaid={setIsPaid}/>
            <Menu 
                activeId={2}
                searchKey={searchKey} setSearchKey={setSearchKey} />
            {isSearched && <h2>Sökning på "{searchKey.title}"</h2>}
            <ProductList 
                searchKey={searchKey} setSearchKey={setSearchKey}
                products={products}
                setCartData={setCartData}/>
        </>
    )
}