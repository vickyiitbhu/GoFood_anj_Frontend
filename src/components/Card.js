import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
import './card.css';
import { Checkmark } from 'react-checkmark'
export default function Card(props) {
    let dispatch= useDispatchCart();
    let data=useCart()
    const priceRef=useRef();
    let foodItem = props.foodItem;
    let options=props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const handleAddToCart=async()=>{
        setShowPopup(true);
        setTimeout(() => {
        setShowPopup(false);
        }, 1700); // Hide the popup after 3 seconds
        let food =[]
        for(const item of data){
            console.log(item);
            console.log(foodItem);
            if(item.id===foodItem._id){
                food = item;
                break;
            }
        }
        console.log("food");
        console.log(food);
        if(food!=[]){
            if(food.size===size){
                console.log("foodItem.img");
                console.log(foodItem.img);
                await dispatch({type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty})
                return
            }
            else if(food.size !== size){
                console.log("foodItem.img");
                console.log(foodItem.img);
                await dispatch({type:"ADD",id:foodItem._id, name: foodItem.name, img: foodItem.img, price: finalPrice, qty: qty, size: size})
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
            
        }
            await dispatch({type:"ADD",id:foodItem._id,name: foodItem.name, img: foodItem.img, price: finalPrice, qty: qty, size: size})
 }
    let finalPrice = qty * parseInt(options[size]);

    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])
   
    return (
        <div>
            <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "430px" }}>
                <img src={props.foodItem.img} className='card-img-top' alt="..." style={{height:"140px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref ={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                                return <option key = {data} valuse = {data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            r{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                    {showPopup && (
                        <div className="popup">
                        <Checkmark size='30px' color='green' />
                        {/* <p>Item added to cart!</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
