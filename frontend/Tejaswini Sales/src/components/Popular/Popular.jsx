import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../item/Item';
const Popular = () => {

  const [popularproducts , setpopularproducts] = useState([]);

  useEffect(()=>{

    fetch('http://localhost:4000/popularinwomen')
    .then((response)=>response.json())
    .then((data)=>setpopularproducts(data));
  },[])
  return (
    <div className='Popular'>
        <h1>POPULAR IN AUDIANCE</h1>
        <hr />
        
        <div className="popular-items">
            {popularproducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} category={item.category} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular