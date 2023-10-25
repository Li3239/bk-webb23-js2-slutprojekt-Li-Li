import { useState, useEffect, useContext } from "react";
import {getCartData, patchCartData, postCartData} from './dataaccess/CartDataAccess.js'
import { CartInfo } from "./CartInfo.jsx";
import { useSearchParams } from "react-router-dom";


export default function ProductList({ searchKey, setSearchKey, products, setCartData}) {
    // navigate from sales.jsx with '/products?category=${category}'
    // construction : category = parameter from url ${category}
    const [searchParams] = useSearchParams();
    let paramCategory = searchParams.get('category');

    useEffect(() => {
        const obj = {category: paramCategory};
        setSearchKey({...searchKey, category: obj.category});
    }, [paramCategory])

    return(
        <div className="card-container">
            {Array.isArray(products) && 
             products.map((product) => {
                return(
                    <div key={product.id} className="card">
                        <a href="#">
                            <img src={product.imgUrl1} alt="" />
                        </a>
                        <div className="card-content-container">
                            <h4>{product.title}</h4>
                            <h3>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ':-'}</h3>
                            <p>Lager: {product.inventory}</p>
                            <div className="button-div">
                                <Button 
                                    currentProduct={product}
                                    setCartData={setCartData}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// [Köp] button component
function Button({currentProduct, setCartData}) {

    function handleClick(product) {
        // get cart.json file by using paramenter ?id=XXX
        getCartData(product.id).then((data) => {
            if(data.length == 0){
                // POST a new data in cart.json
                postCartData(product).then((postData) => {
                    // console.log('postCartData return ', postData);
                    setCartData(postData);
                });
            } else {
                // Count up [amount] in cart.json file when data (id=XXX) exists
                patchCartData(product.id, data[0].amount, true).then((patchData) => {
                    // console.log('patchCartData return ', patchData);
                    setCartData(patchData);
                })
            }
        });
    }

    return(
        <>
            {/* call handleClick only when button is clicked */}
            <button disabled={ parseInt(currentProduct.inventory) == 0} 
                    onClick={() => handleClick(currentProduct)}>Köp</button>
        </>
    )
}