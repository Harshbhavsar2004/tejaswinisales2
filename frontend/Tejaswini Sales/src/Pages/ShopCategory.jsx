import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import all_product from '../components/Assests/all_product'
import { Shopcontext } from '../Context/ShopContect'
import dropdown_icon from '../components/Assests/dropdown_icon.png'
import Item from '../components/item/Item'
const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);
  return (
    <div className='ShopCategory'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1 -12 </span> out of 36 products
        </p>
      
      <div className="shopcategory-sort">
        sort by <img src={dropdown_icon} alt="" />
      </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(props.category!==item.category){
            return <Item key={i} id={item.id} name={item.name} category={item.category} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore more
      </div>
    </div>
  )
}

export default ShopCategory