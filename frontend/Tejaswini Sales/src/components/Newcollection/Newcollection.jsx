import React, { useEffect, useState } from 'react'
import './Newcollection.css'
import new_collection from '../Assests/new_collections'
import Item from '../item/Item'
const Newcollection = () => {

  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {

    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, [])

  return (
    <div className='Newcollections'>
      <h1>NEW COLLCETIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} category={item.category} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Newcollection