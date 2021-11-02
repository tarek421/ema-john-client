import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from './../../fakeData/index';

const ProductDetail = () => {
   const {productKey} = useParams();
   const product = fakeData.find(product => product.key === productKey);
   // console.log(product)
   // console.log(productKey)
   return (
      <div>
         <Product productAddToCart={false} product={product}></Product>
      </div>
   );
};

export default ProductDetail;