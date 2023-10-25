import React, { useState } from 'react';
import '../css/ProductSlide.css'; 
import _, { map } from 'underscore';

// export default function ProductSlide({ products }) {
// slide list one by one
export default function Slide({products, itmeInOneLine}) {
    //与 ProductSlide.css中的product 设定保持一致
    // const itmeInOneLine = 5;
    const [startIndex, setStartIndex] = useState(0);

    const reverseList = getPopularList(products);
    // get items from slide list
    const visibleItems = Array.isArray(reverseList) ? 
                            reverseList.slice(startIndex, startIndex + itmeInOneLine) : '';
    
    // Next arrow click event
    const handleNextSlide = () => {
        if (startIndex + itmeInOneLine < reverseList.length) {
            setStartIndex(startIndex + itmeInOneLine);
        }
    };

    // Previous arrow click event
    const handlePrevSlide = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - itmeInOneLine);
        }
    };

    return (
        <div className="product-list-container">
            {startIndex > 0  && <button onClick={handlePrevSlide} className="arrow">←</button>}
            <div className="product-list">
                {Array.isArray(visibleItems) ? 
                    visibleItems.map((product, index) => {
                        return(
                            <div key={product.id} className="product">
                                <a href='/'>
                                    <img src={product.imgUrl1} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                            </div>
                        );
                   }) : ''}
            </div>
            {startIndex + itmeInOneLine < reverseList?.length && <button onClick={handleNextSlide} className="arrow">→</button>}
        </div>
    );
}

function getPopularList(data) {
    // sort by soldQuantity by reverse order -> popular product first
    let reverse = _.sortBy(data, (element) => {
        return -element.soldQuantity;
    });

    // total 10 items will be shown in the popular list
    const dataLength = data.length;
    reverse = (dataLength > 10) ? 
                reverse.slice(0, 10) :
                reverse.slice(0, dataLength);
    return reverse;
}