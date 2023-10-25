import HeaderZon from "./HeaderZon";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import Sales from "./Sales";
import PopulaProductSlide from "./PopulaProductSlide";
import ProductList from "./ProductList";

export default function Home({
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
            <SearchBar  setIsSearched={setIsSearched} 
                        searchKey={searchKey} setSearchKey={setSearchKey}
                        showCart={showCart} setShowCart={setShowCart}
                        cartData={cartData}
                        cartItem={cartItem} 
                        cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                        isPaid={isPaid} setIsPaid={setIsPaid}/>
            <Menu activeId={1} searchKey={searchKey} setSearchKey={setSearchKey} />
            {isSearched && <h2>Sökning på "{searchKey.title}"</h2>}
            {!isSearched && <Sales />}
            {!isSearched && <PopulaProductSlide 
                                products={products} 
                                itmeInOneLine={5}/>}
            {isSearched && <ProductList 
                                searchKey={searchKey} setSearchKey={setSearchKey}
                                products={products}
                                setCartData={setCartData}/>}
        </>
    )
}