import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { patchProductData } from './dataaccess/ProductDataAccess';
import { deleteCartData, patchCartData } from './dataaccess/CartDataAccess';

export default function Cart({showCart, setShowCart, cartData, 
                              cartItem, cartIsChanged, setCartIsChanged, 
                              isPaid, setIsPaid}) {

    const [cartClassName, setCartClassName] = useState('cart');

    useEffect(() => {
        setIsPaid(false);
    },[]);

    // when cart component open to get cart.json data
    useEffect(() => {
        // set css class "show" for "cart" div -> to show cart ease-in-out
        if(showCart) setCartClassName('cart show');
        else setCartClassName('cart');
    }, [showCart]); 

    function handleClose() {
        // set css class "hide" for "cart" div -> to hide cart ease-in-out
        setShowCart(false);
    }

    return(
        <div className={cartClassName}>
            <div className="cart-header">
                <h2>Varukorg</h2>
                <button className="close-button" onClick={handleClose}>❌</button>
            </div>
            {(cartItem.totalPrice >  0) ? 
                (<ProductInCart 
                    cartData={cartData}
                    totalPrice={cartItem.totalPrice} 
                    isPaid={isPaid} setIsPaid={setIsPaid} 
                    cartIsChanged={cartIsChanged} 
                    setCartIsChanged={setCartIsChanged}/>)
                :
                (<EmptyCart isPaid={isPaid}/>)}
        </div>
    )
}

// The cart is empty
function EmptyCart({isPaid}) {
    return(
        <div className='cart-content-container'>
            <div className="cart-content">
                <div className="cart-title">
                    {console.log('isPaid is ? ', typeof isPaid, isPaid)}
                    {isPaid ?
                        (<div className="item-title">Tack för ditt köp!</div>)
                        :
                        (<div className="item-title">Din kundvagn är tom.</div>)}
                </div>
            </div>
        </div>
    )
}

// The cart is not empty
function ProductInCart({cartData, totalPrice, isPaid, setIsPaid, cartIsChanged, setCartIsChanged}) {

    console.log('[ProductInCart]-start isPaid = ', isPaid);

    // decrease/increase button click -> update cart.json
    function handleCoutUpDownClick(e) {
        // decrease: action=false/ increase: action=true
        const action = (e.target.className == 'decrease-button')? false: true;

        // attribute
        const currentId = e.target.getAttribute('currentid');
        const currentAmount = e.target.getAttribute('currentAmount');

        if(!action && currentAmount == 1) {
            // amount=1 && descrease -> delete this record from the cart
            deleteCartData(currentId).then((data) => {
                setCartIsChanged(!cartIsChanged);
            }).catch((ex) => {
                console.log('Error in [deleteCartData].', ex);
            })
        } else {
            // otherwise update
            patchCartData(currentId, currentAmount, action).then((data) => {
                setCartIsChanged(!cartIsChanged);
            }).catch((ex) => {
                console.log('Error in [patchCartData].', ex);
            });
        }
    }

    // [Töm Varukorg] icon click -> empty cart
    function handleEmptyCart() {
        deleteCartData().then((data) => {
            setCartIsChanged(!cartIsChanged);
        }).catch((ex) => {
            console.log('Error in [deleteCartData].', ex);
        })
    }

    // [betala] button click -> update Product.json, clear Cart.json
    function handlePayment() {
        // update inventory in product.json
        for(let cart of cartData){
            // update Products.json
            patchProductData(cart.id, cart.amount).then((data) => {
                // console.log(data);
            }).catch((ex) => {
                console.log('Error in [patchProductData].', ex);
            })
        }
        // delete all Cart.json data
        deleteCartData().then((data) => {
            
        }).catch((ex) => {
            console.log('Error in [deleteCartData].', ex);
        })

        // status for get product data
        setIsPaid(true); 
        setCartIsChanged(!cartIsChanged);

        console.log('[ProductInCart]-[handlePayment] isPaid = ', isPaid);
    }

    return(
        <>
        <div className='cart-content-container'>
            <div className="cart-content">
                <div className="cart-title">
                    <div className="item-title">Product</div>
                    <div className="item-1">Antal</div>
                    <div className="item-1">À-pris</div>
                    <div className="item-1">Summa</div>
                </div>

                {/* data detail got from cart.json */}
                {/* {console.log('in cart loop , cartData= ', cartData)} */}
                {Array.isArray(cartData) && 
                    cartData.map((cart, index) => {
                    return(
                        <div key={cart.id} className="cart-item">
                            {/* cart title & image */}
                            <div className="item-title">
                                {cart.title}
                                <img src={cart.imgUrl1} alt={cart.title} />    
                            </div>
                            {/* quantity & +/- */}
                            <div className="quantity-selector">
                                <button className="decrease-button" 
                                        currentid={cart.id} currentamount={cart.amount} 
                                        onClick={handleCoutUpDownClick}>
                                            -
                                </button>
                                <span className="quantity-display">{cart.amount}</span>
                                <button className="increase-button" 
                                        disabled={cart.inventory <= cart.amount}
                                        currentid={cart.id} currentamount={cart.amount} 
                                        onClick={handleCoutUpDownClick}>
                                            +
                                </button>
                            </div>
                            {/* unit price */}
                            <div className="item-1">
                                {cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':-'}
                            </div>
                            {/* sub total price */}
                            <div className="item-1">{(cart.price * cart.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':-'}</div>
                        </div>
                    )
                })}
            </div>
        </div>
        {/* empty cart  */}
        <div className="clear-cart">
            <button className="clear-button" onClick={handleEmptyCart}>
                Töm Varukorg
                <FontAwesomeIcon icon={faTrash} style={{ color: '#383737' }} />
            </button>
        </div>
        {/* total price */}
        <div className="cart-total">
            <span>Att Betala: </span>
            <span className="total-amount">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':-'}</span>
        </div>
        {/* pay */}
        <div className="payment-button">
            <button onClick={handlePayment}>Betala</button>
        </div>
        </>
    )
}