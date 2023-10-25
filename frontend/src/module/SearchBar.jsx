import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartArrowDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import { useEffect, useState } from 'react';
import { CartInfo } from './CartInfo';
import { getCartData } from './dataaccess/CartDataAccess';

//*******************************
// SearchBar include
//  1. Menu icon
//  2. Logo
//  3. Search icon
//  4. Input form
//  5. Cart icon
//*******************************
export default function SearchBar({
    setIsSearched, 
    searchKey, 
    setSearchKey, 
    showCart, setShowCart,
    cartData,
    cartItem, 
    cartIsChanged, setCartIsChanged,
    isPaid, setIsPaid}) {

    return(
        <div className="search-main">
            <div className="search-container">
                <div className="search-inner">
                    <MenuIcon/>
                    <Logo/>
                    <InputForm  searchKey={searchKey} setSearchKey={setSearchKey}
                                setIsSearched={setIsSearched}/>
                    <CartIcon   showCart={showCart} setShowCart={setShowCart}
                                cartData={cartData}
                                cartItem={cartItem} 
                                cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                                isPaid={isPaid} setIsPaid={setIsPaid}/>
                </div>
            </div>
        </div>
    )
}

function MenuIcon() {
    return(
        <div className="search-action-section">
            <div className="search-action-sub">
                <button className='search-action-button'>
                    <span className='search-action-button-span'>
                        <FontAwesomeIcon icon={faBars} style={{ color: '#383737' }} />
                    </span>
                </button>
            </div>
        </div>
    );
}
function Logo() {
    return(
        <div className="search-logo-section">
            <div className="search-logo-sub">
                <a href="/"><h1>EightON</h1></a>
            </div>
        </div>
    );
}

function SearchIcon() {
    return(
        <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#383737' }} />
        </div>
    );
}

function InputForm({searchKey, setSearchKey, setIsSearched}) {
    const [inputValue, setInputValue] = useState('');

    // input change event
    const handleInputChange = (e) => {
        // by using construction to get to values(name and value) from element <input>
        // const {name, value} = e.target;
        // setInputValue({...inputValue, [name]: value});
        setInputValue(e.target.value);
    };
    
    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setSearchKey({...searchKey, title: inputValue});
        setIsSearched(true);

        console.log('[SearchBar]-[InputForm] searchKey =', searchKey);
    }

    return(
        <div className="search-section">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="search-bar">
                    <SearchIcon/>
                    <input className='search-input' 
                           placeholder='Vad letar du efter?' 
                           title='Sök i hela sortimentet' 
                           name='title'
                           onChange={handleInputChange}/>
                </div>
            </form>
        </div>
    );
}

function CartIcon({
    showCart, setShowCart, 
    cartData,
    cartItem, 
    cartIsChanged, setCartIsChanged,
    isPaid, setIsPaid}) {
    
    function handleCartIconClick(){
        setShowCart(!showCart);
    }

    return(
        // cart button zon
        <div className="search-action-section is-right">
            {showCart && <Cart showCart={showCart} setShowCart={setShowCart}
                               cartData={cartData}
                               cartItem={cartItem} 
                               cartIsChanged={cartIsChanged} setCartIsChanged={setCartIsChanged}
                               isPaid={isPaid} setIsPaid={setIsPaid}/>}
            <button className='search-action-button' onClick={handleCartIconClick} >
                <FontAwesomeIcon icon={faCartArrowDown} style={{ color: '#383737' }} />
                {cartItem.quantity !=0 && <span className="cart-item-count">{cartItem.quantity}</span>}
            </button>
        </div>
    );
}