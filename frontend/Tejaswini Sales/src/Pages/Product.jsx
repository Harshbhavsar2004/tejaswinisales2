import React, { useContext } from 'react'
import { Shopcontext } from '../Context/ShopContect'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import Productdisplay from '../components/ProductDisplay/Productdisplay';
import DescriptionBox from '../components/Description/DescriptionBox';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';

const Product = () => {
  const { all_product } = useContext(Shopcontext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId) )
  return (
    <div className='Product'>
<Breadcrum  product={product}/>
<Productdisplay product={product}/>
<DescriptionBox/>
<RelatedProduct/>
    </div>
  )
}

export default Product