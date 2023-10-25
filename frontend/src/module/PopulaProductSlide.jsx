import React, { useState } from 'react';
import Slide from './Slide';

// export default function ProductSlide({ products }) {
// slide list one by one
export default function PopulaProductSlide({products, itmeInOneLine}) {
    return (
        <Slide products={products} itmeInOneLine={itmeInOneLine}/>
    );
}