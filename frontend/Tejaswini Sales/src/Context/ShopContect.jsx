import React, { createContext, useEffect, useState } from "react";
export const Shopcontext = createContext(null);
const getDafaultCart = () => {
    let cart = {};

    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;

    }
    return cart;
}


const ShopcontextProvider = (props) => {


    const [all_product , setAll_product] = useState([]);
    const [cartItems, setcartItems] = useState(getDafaultCart());

    useEffect(()=>{

        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart' , {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setcartItems(data))
        }
    },[])


    const addToCart = (ItemId) => {
        setcartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({"itemId":ItemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error)); // Catching any errors
        }
    }
    
    const removefromcart = (ItemId) => {
        setcartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({"itemId":ItemId})
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error)); // Catching any errors
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0)
            {
                let itemInfo = all_product.find((product) => product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
                
            }
            
            
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const contextvalue = { getTotalCartItems,getTotalCartAmount, all_product, cartItems, addToCart, removefromcart }

    return (
        <Shopcontext.Provider value={contextvalue}>
            {props.children}
        </Shopcontext.Provider>
    )
    }

export default ShopcontextProvider;